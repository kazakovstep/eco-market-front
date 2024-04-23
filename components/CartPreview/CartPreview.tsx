'use client'
import {actions as CartActions} from "@/store/slices/cart.slice"
import {actions as ProductActions} from "@/store/slices/products.slice"
import {RootState} from '@/store/store'
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Button} from "../Button/Button"
import {H} from "../Htag/Htag"
import styles from "./CartPreview.module.css"
import {CardRowProps} from "./CartPreviewProps.props"

export const CartPreview = ({
                                index,
                                product
                            }: CardRowProps) => {

    const [file, setFile] = useState();
    useEffect(() => {
            try {
                fetch(`http://localhost:8080/image/${product.id}`, {
                    method: "POST",
                }).then(response => response.blob())
                    .then(data => {
                        const file = new File([data], 'image.jpg', {type: 'image/jpeg'});
                        // @ts-ignore
                        setFile(URL.createObjectURL(file));
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error)
            }
        }, [product]
    )

    const arr = useSelector((state: RootState) => state.cart?.quantities)

    const dispatch = useDispatch();

    const handleMinus = () => {
        if (arr[index] != 1) {
            dispatch(CartActions.removeFromCartSum(product.price));
            dispatch(CartActions.updateQuantity({index, amount: arr[index] - 1}));
        }
        if (arr[index] == 1) {
            dispatch(CartActions.removeFromCart(product.price));
            dispatch(ProductActions.toggleCart(product));
            dispatch(CartActions.deleteQuantity(index));
        }
    }

    const handlePlus = () => {
        dispatch(CartActions.addToCartSum(product.price));
        dispatch(CartActions.updateQuantity({index, amount: arr[index] + 1}));
    }

    const handleDelete = () => {
        dispatch(CartActions.removeFromCart(product.price * arr[index]));
        dispatch(ProductActions.toggleCart(product));
        dispatch(CartActions.deleteQuantity(index));
    }


    return (
        <tr key={product.id} className={styles.underline}>
            <th>
                <div className={styles.productInfo}>
                    <img className={styles.img} src={file} alt={product.title}/>
                    <H type="body" size="medium">{product.title}</H>
                </div>
            </th>
            <th><H type="body" size="medium">{product.price} руб.</H></th>
            <th>
                <div className={styles.amount}>
                    <Button type={"fill"} className={styles.amountButton} onClick={handleMinus}>-</Button>
                    <H type="body" size="medium">{arr[index]}</H>
                    <Button type={"fill"} className={styles.amountButton} onClick={handlePlus}>+</Button>
                </div>
            </th>
            <th><H type="body" size="medium">{product.price * arr[index]} руб.</H></th>
            <th><Button type={"border"} className={styles.amountButton} onClick={handleDelete}>x</Button></th>
        </tr>
    );
}
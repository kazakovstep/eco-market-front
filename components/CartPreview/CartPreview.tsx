'use client'
import styles from "./CartPreview.module.css"
import {CardRowProps} from "./CartPreviewProps.props";
import {H} from "../Htag/Htag";
import {useEffect, useState} from "react";
import {Button} from "../Button/Button";
import {actions as CartActions} from "@/store/slices/cart.slice";
import {useDispatch, useSelector} from "react-redux";
import {actions as ProductActions} from "@/store/slices/products.slice"
export const CartPreview = ({
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

    const [amount, setAmount] = useState(1);

    const dispatch = useDispatch();

    const handleMinus = () => {
        if(amount != 1){
            setAmount(prev => prev - 1)
        }
        dispatch(CartActions.removeFromCartSum(product.price));
    }

    const handlePlus = () => {
        setAmount(prev => prev + 1)
        dispatch(CartActions.addToCartSum(product.price));
    }

    const handleDelete = () => {
        dispatch(CartActions.removeFromCart(product.price * amount));
        dispatch(ProductActions.toggleCart(product));
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
                    <H type="body" size="medium">{amount}</H>
                    <Button type={"fill"} className={styles.amountButton} onClick={handlePlus}>+</Button>
                </div>
            </th>
            <th><H type="body" size="medium">{product.price * amount} руб.</H></th>
            <th><Button type={"border"} className={styles.amountButton} onClick={handleDelete}>x</Button></th>
        </tr>
    );
}
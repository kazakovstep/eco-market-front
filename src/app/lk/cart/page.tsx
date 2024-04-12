'use client'
import styles from "../../../styles/cart.module.css"
import {H} from "../../../../components/Htag/Htag";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {CartPreview} from "../../../../components/CartPreview/CartPreview";
import {Button} from "../../../../components/Button/Button";
import cn from "classnames";
import Link from "next/link";

export default function Page() {

    const products = useSelector((state: RootState) => state.products);

    const totalPrice = useSelector((state: RootState) => state.cart?.totalCost)
    const totalAmount = useSelector((state: RootState) => state.cart?.totalItems)

    return <div className={styles.page}>
        <H type={"h5"} weight={400}>Моя корзина</H>
        <div className={cn(styles.content, {
            [styles.empty]: !totalAmount
        })}>
            {totalAmount ?
                <>
                    <table className={styles.table}>
                        <tbody>
                        <tr className={styles.tableHeader}>
                            <th><H type={"body"} size={"small"}>ПРОДУКТЫ</H></th>
                            <th><H type={"body"} size={"small"}>ЦЕНА</H></th>
                            <th><H type={"body"} size={"small"}>КОЛИЧЕСТВО</H></th>
                            <th><H type={"body"} size={"small"}>ИТОГО</H></th>
                        </tr>
                        {products?.map((product) => (
                            <CartPreview product={product} key={product.id}/>
                        ))}
                        </tbody>
                    </table>
                    <table className={styles.payment}>
                        <tbody>
                        <tr>
                            <th><H type={"body"} size={"xl"} weight={500}>Корзина</H></th>
                        </tr>
                        <tr>
                            <th><H type={"body"} size={"small"}>Стоимость:</H></th>
                            <th><H type={"body"} size={"small"} weight={500}>{totalPrice} руб.</H></th>
                        </tr>
                        <tr>
                            <th><H type={"body"} size={"small"}>Доставка:</H></th>
                            <th><H type={"body"} size={"small"} weight={500}>free</H></th>
                        </tr>
                        <tr>
                            <th><H type={"body"} size={"medium"}>Итого:</H></th>
                            <th><H type={"body"} size={"small"} weight={500}>{totalPrice} руб.</H></th>
                        </tr>
                        <tr>
                            <th><Button type={"fill"} className={styles.doOrder}>Оформить заказ</Button></th>
                        </tr>
                        </tbody>
                    </table>
                </> :
                <>
                    <H type={"h3"} weight={900}>Ваша корзина пуста</H>
                    <Link href={"/"}><Button type={"fill"} size={"large"}>В каталог</Button></Link>
                </>
            }
        </div>
    </div>
}
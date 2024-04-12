'use client'
import styles from "./CardRow.module.css"
import {Product, useGetProductsQuery} from "@/store/api/api";
import {Card} from "../Card/Card";
import {CardProps} from "../Card/Card.props";
import {CardRowProps} from "./CardRowProps.props";
import {useEffect} from "react";

export const CardRow = ({
                            type,
                            ...props
                        }: CardRowProps) => {
    const {data, isLoading, error} = useGetProductsQuery();

    useEffect(() => {
        console.log(data);
    }, [data]);


    return (
        <div className={styles.cardRow}>
            {data?.filter(product => product.category === type).map((product) => (
                <Card key={product.id} data={product}/>
            ))}
        </div>
    );
}
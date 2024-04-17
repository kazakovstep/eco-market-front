'use client'
import styles from "./CardRow.module.css"
import {Card} from "../Card/Card";
import {CardRowProps} from "./CardRowProps.props";

export const CardRow = ({
                            data,
                            type,
                            ...props
                        }: CardRowProps) => {

    return (
        <div className={styles.cardRow}>
            {data?.filter(product => product.category === type).map((product) => (
                <Card key={product.id} data={product}/>
            ))}
        </div>
    );
}
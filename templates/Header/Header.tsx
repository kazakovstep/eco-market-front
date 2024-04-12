'use client'
import {HeaderProps} from "./Header.props";
import cn from "classnames";
import styles from "./Header.module.css";
import {Logo} from "../../components/Logo/Logo";
import Phone from "../../public/phone.svg"
import {H} from "../../components/Htag/Htag";
import {useRouter} from "next/router";
import {Button} from "../../components/Button/Button";
import {useState} from "react";
import Link from "next/link";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {Input} from "../../components/Input/Input";

export const Header = ({
                           className,
                           ...props
                       }: HeaderProps): JSX.Element => {

    const [isActive, setActive] = useState(false);

    const handleActive = () => {
        setActive(!isActive);
    }

    const amountCart = useSelector((state: RootState) => state.cart?.totalItems);
    const amountFavs = useSelector((state:RootState) => state.favourites?.amount)

    const [isSearch, setIsSearch] = useState(false);

    const handleSearch = () => {
        setIsSearch(!isSearch);
    }

    const [search, setSearch] = useState("");
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };


    return (
        <header className={cn(styles.header, className)}>
            <div className={styles.leftSide}>
                <Button type={"header"} onClick={handleActive}>Категории</Button>
                {isActive ?
                    <div className={cn(styles.dropdown)}>
                        <Button type={"text"}>Фрукты</Button>
                        <Button type={"text"}>Овощи</Button>
                        <Button type={"text"}>Мясо</Button>
                        <Button type={"text"}>Молочные продукты</Button>
                        <Button type={"text"}>Хлебные изделия</Button>
                    </div> : null}
                <Button type={"text"}>О нас</Button>
            </div>
            <div className={styles.centerSide}>
                {isSearch ? <Input state={"default"}
                                   value={search}
                                   onChange={handleSearchChange}
                                   placeholder={"Продукт..."}/> : <Logo/>}
            </div>
            <div className={styles.rightSide}>
                <div className={styles.phone}>
                    <img src={"../phone.svg"} alt={"phone"}/>
                    <H type={"body"} size={"small"}>(219) 555-0114</H>
                </div>
                <img src={"../find.svg"} alt={"find"} onClick={handleSearch} className={styles.search}/>
                <Link href={"/lk/favourites"} className={styles.cart}>
                    <img src={"../fav.svg"} alt={"fav"}/>
                    <div className={styles.amount}>{amountFavs}</div>
                </Link>
                <Link href={"/lk/cart"} className={styles.cart}>
                    <img src={"../buy.svg"} alt={"buy"}/>
                    <div className={styles.amount}>{amountCart}</div>
                </Link>
                <img src={"../person.svg"} alt={"person"}/>
            </div>
        </header>
    );
};

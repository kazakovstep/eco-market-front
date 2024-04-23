'use client'
import {HeaderProps} from "./Header.props";
import cn from "classnames";
import styles from "./Header.module.css";
import {Logo} from "../../components/Logo/Logo";
import {H} from "../../components/Htag/Htag";
import {Button} from "../../components/Button/Button";
import {useEffect, useState} from "react";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {Input} from "../../components/Input/Input";
import {useGetProductsByCategoryQuery, useGetProductsByTitleQuery} from "@/store/api/product.api";
import {actions as SearchActions} from "@/store/slices/search.slice"
import {CardRow} from "../../components/CardRow/CardRow";

const Products = [
    {category: "Фрукты", type: "fruit"},
    {category: "Овощи", type: "vegetable"},
    {category: "Мясо", type: "meat"},
    {category: "Молочные продукты", type: "milk"},
    {category: "Хлебные изделия", type: "bread"},
];

export const Header = ({
                           className,
                           ...props
                       }: HeaderProps): JSX.Element => {

    const [isActive, setActive] = useState(false);

    const handleActive = () => {
        setActive(!isActive);
    }

    const amountCart = useSelector((state: RootState) => state.cart?.totalItems);
    const amountFavs = useSelector((state: RootState) => state.favourites?.amount)

    const [isSearch, setIsSearch] = useState(false);

    const handleSearch = () => {
        setIsSearch(!isSearch);
    }

    const [search, setSearch] = useState("");
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const {data: productsByTitle, isLoading, error} = useGetProductsByTitleQuery(search);

    const [searchMenu, setSearchMenu] = useState(false);

    useEffect(() => {
        if (search) {
            setSearchMenu(true)
        } else {
            setSearchMenu(false)
        }
    }, [search]);

    const [isCategory, setIsCategory] = useState(false);
    const [category, setCategory] = useState("")

    const handleCategory = (category: string) => {
        setIsCategory(!isCategory);
        setCategory(category);
    }

    const {data: productsByCategory} = useGetProductsByCategoryQuery(category);


    return (
        <header className={cn(styles.header, className)}>
            <div className={styles.leftSide}>
                <Button type={"header"} onClick={handleActive}>Категории</Button>
                {isActive ?
                    <div className={cn(styles.dropdown)}>
                        <Button type={"text"} onClick={() => handleCategory("fruit")}>Фрукты</Button>
                        <Button type={"text"} onClick={() => handleCategory("vegetable")}>Овощи</Button>
                        <Button type={"text"} onClick={() => handleCategory("meat")}>Мясо</Button>
                        <Button type={"text"} onClick={() => handleCategory("milk")}>Молочные продукты</Button>
                        <Button type={"text"} onClick={() => handleCategory("bread")}>Хлебные изделия</Button>
                    </div> : null}
                <Button type={"text"}>О нас</Button>
                {isCategory ?
                    <div className={styles.categoryMenu}>
                        {Products.map((product) => {
                            const filteredData = productsByCategory?.filter((item) => item.category === product.type);
                            if (filteredData && filteredData.length > 0) {
                                return (
                                    <div key={product.category} className={styles.catalogCategory}>
                                        <H type="body" size="large">{product.category}</H>
                                        <CardRow type={product.type}
                                                 data={filteredData} className={styles.categoryRow}/>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div> : null}
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
                <Link href={localStorage.getItem("token") ? "/lk/orders" : "/login"} className={styles.cart}>
                    <img src={"../person.svg"} alt={"person"}/>
                </Link>
            </div>
            {searchMenu ?
                <div className={styles.searchMenu}>
                    {search ?
                        <>
                            <H type={"body"} size={"xl"}>Поиск по слову `{search}`</H>
                            {Products.map((product) => {
                                const filteredData = productsByTitle?.filter((item) => item.category === product.type);
                                if (filteredData && filteredData.length > 0) {
                                    return (
                                        <div key={product.category} className={styles.catalogCategory}>
                                            <H type="body" size="large">{product.category}</H>
                                            <CardRow type={product.type}
                                                     data={filteredData}/>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </> : <H type={"body"} size={"xl"}>Поиск по слову `{search}`</H>}
                </div> : null}
        </header>
    );
};

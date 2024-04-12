import styles from "../../styles/login.module.css"
import {Input} from "../../../components/Input/Input";
import {H} from "../../../components/Htag/Htag";
import {Button} from "../../../components/Button/Button";
import Link from "next/link";

export default function Login() {
    return (
        <div className={styles.login}>
            <H type={"h5"} weight={400}>Авторизация</H>
            <Input placeholder={"E-mail"}/>
            <Input type={"password"} placeholder={"Пароль"}/>
            <Button type={"fill"}>Авторизоваться</Button>
            <Link href={"/register"}>
                <Button type={"text"}>Нет аккаунта?</Button>
            </Link>
        </div>
    );
}
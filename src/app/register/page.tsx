'use client'
import styles from "../../styles/login.module.css"
import {Input} from "../../../components/Input/Input";
import {H} from "../../../components/Htag/Htag";
import {Button} from "../../../components/Button/Button";
import {useEffect, useState} from "react";
import Link from "next/link";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailState, setEmailState] = useState("default");
    const [passwordState, setPasswordState] = useState("default");
    const [isEmailValid, setEmailValid] = useState(true);
    const [isPasswordValid, setPasswordValid] = useState(true);

    useEffect(() => {
        if (emailRegex.test(email)) {
            setEmailState("default");
            setEmailValid(true);
        } else {
            setEmailState("error");
            setEmailValid(false);
        }

        if (passwordRegex.test(password)) {
            setPasswordState("default");
            setPasswordValid(true);
        } else {
            setPasswordState("error");
            setPasswordValid(false);
        }
    }, [email, password])

    const handleCreateAccount = () => {

        if (emailRegex.test(email) && passwordRegex.test(password)) {
            try {
                fetch(`https://sideprojects.ru/api/auth/registered?email=${email}`, {
                    method: "GET"
                }).then(response => {
                    if (!response.ok) {
                        setEmailState("error")
                        throw new Error("Произошла ошибка");
                    }
                    setEmailState("default")
                });

            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    return (
        <div className={styles.login}>
            <H type={"h5"} weight={400}>Регистрация</H>
            <Input placeholder={"E-mail"} value={email}
                   state={emailState}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
            <Input state={passwordState} type={"password"} placeholder={"Пароль"}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
            <Button type={"fill"} onClick={handleCreateAccount}>Зарегистрироваться</Button>
            <Link href={"/login"}>
                <Button type={"text"}>Уже есть аккаунт?</Button>
            </Link>
        </div>
    );
}
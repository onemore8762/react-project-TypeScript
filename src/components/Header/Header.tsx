import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

type PropsType = {
    isAuth: boolean
    login: string
}

export const Header = (props: any) => {
    return (
        <header className={s.header}>
            <img src="https://shapka-youtube.ru/wp-content/uploads/2021/02/prikolnaya-avatarka-dlya-patsanov.jpg"/>
            <div className={s.loginBlock}>
                {props.isAuth? props.login
                    :<NavLink to={'/login'}>login</NavLink>}
            </div>
        </header>

    );
}


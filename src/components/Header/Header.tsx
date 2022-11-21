import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

type PropsType = {
    isAuth: boolean
    login: string
    logout: () => void
}

export const Header = (props: PropsType) => {
    return (
        <header className={s.header}>
            <img src="https://shapka-youtube.ru/wp-content/uploads/2021/02/prikolnaya-avatarka-dlya-patsanov.jpg" alt={'photoSite'}/>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>logout</button> </div>
                    :<NavLink to={'/login'}>login</NavLink>}
            </div>
        </header>

    );
}


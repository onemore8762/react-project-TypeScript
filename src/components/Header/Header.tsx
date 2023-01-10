import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {logout} from "../../redux/auth-reducer";


export const Header = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const login = useAppSelector(state => state.auth.login)

    const dispatch = useAppDispatch()
    const logoutCallBack = () => {
        dispatch(logout())
    }
    return (
        <header className={s.header}>
            <img src="https://shapka-youtube.ru/wp-content/uploads/2021/02/prikolnaya-avatarka-dlya-patsanov.jpg" alt={'photoSite'}/>
            <div className={s.loginBlock}>
                {isAuth
                    ? <div>{login} - <button onClick={logoutCallBack}>logout</button> </div>
                    :<NavLink to={'/login'}>login</NavLink>}
            </div>
        </header>

    );
}


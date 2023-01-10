import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {logout} from "../../redux/auth-reducer";
import {Layout} from "antd";

const { Header} = Layout;

export const AppHeader = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const login = useAppSelector(state => state.auth.login)

    const dispatch = useAppDispatch()
    const logoutCallBack = () => {
        dispatch(logout())
    }
    return (
        <Header style={{ position: 'fixed', top: 0, zIndex: 1, width: '100%', color: 'white'}}>
            <img src="https://shapka-youtube.ru/wp-content/uploads/2021/02/prikolnaya-avatarka-dlya-patsanov.jpg" alt={'photoSite'}/>
            <div className={s.loginBlock}>
                {isAuth
                    ? <div>{login} - <button onClick={logoutCallBack}>logout</button> </div>
                    :<NavLink to={'/login'}>login</NavLink>}
            </div>
        </Header>

    );
}


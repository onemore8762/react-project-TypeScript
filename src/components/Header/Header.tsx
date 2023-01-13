import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {logout} from "../../redux/auth-reducer";
import type {MenuProps} from 'antd';
import {Avatar, Dropdown, Layout} from "antd";

const {Header} = Layout;

export const AppHeader = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const photo = useAppSelector(state => state.profilePage.myPhoto)
    const dispatch = useAppDispatch()
    const logoutCallBack = () => {
        dispatch(logout())
    }
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <>
                    {isAuth
                        ? <div onClick={logoutCallBack}>logout</div>
                        : <NavLink to={'/login'}>login</NavLink>}
                </>
            ),
        },

    ];
    return (
        <Header style={{position: 'fixed', top: 0, zIndex: 1, width: '100%', color: 'white'}}>
                    <div className={s.loginBlock}>
                        <Dropdown menu={{items}}>
                            <Avatar size={'large'} src={photo} />
                        </Dropdown>

                    </div>

        </Header>

    );
}


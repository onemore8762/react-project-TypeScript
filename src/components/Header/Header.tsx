import React from 'react';
import {NavLink} from "react-router-dom";
import {logout} from "../../redux/auth-reducer";
import type {MenuProps} from 'antd';
import {Avatar, Dropdown, Layout} from "antd";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import s from './Header.module.css'
import {selectAuth, selectProfile} from "../../common/selectors/selectors";
import {PATH} from "../../common/path/path";
const {Header} = Layout;

export const AppHeader = () => {
    const isAuth = useAppSelector(selectAuth.AuthIsAuth)
    const photo = useAppSelector(selectProfile.Photo)
    const dispatch = useAppDispatch()

    const logoutCallBack = () => {
        dispatch(logout())
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label:
                (
                    isAuth ? <div onClick={logoutCallBack}>Logout</div> : <NavLink to={PATH.LOGIN}>login</NavLink>
                ),
        },

    ];
    return (
        <Header className={s.header}>
            <div className={s.loginBlock}>
                <Dropdown menu={{items}}>
                    <Avatar size={'large'} src={photo}/>
                </Dropdown>
            </div>
        </Header>

    );
}


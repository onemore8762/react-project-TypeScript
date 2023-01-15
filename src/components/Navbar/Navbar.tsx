import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {Layout, Menu, MenuProps, Switch} from "antd";
import {setIsOn} from "../../redux/chat-reducer";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {PATH} from "../../common/path/path";
import {
    MessageOutlined,
    RedditOutlined,
    SettingOutlined,
    TeamOutlined,
    TwitterOutlined,
    UserOutlined
} from "@ant-design/icons";
import s from './Navbar.module.css'

const {Sider} = Layout;

export const Navbar = () => {
    const dispatch = useAppDispatch()
    const path = useLocation()
    let location: string
    if(path.pathname.slice(0,8) === '/profile'){
        location = path.pathname.slice(0,8)
    }else{
        location = path.pathname
    }

    const items: MenuProps['items'] = [
        {
            key: PATH.PROFILE.PROFILE,
            label:(<Link to={PATH.PROFILE.PROFILE}>Profile</Link>),
            icon:(<UserOutlined/>)
        },
        {
            key: PATH.USERS,
            label:(<Link to={PATH.USERS}>Users</Link>),
            icon:(<TeamOutlined/>)
        },
        {
            key: PATH.DIALOGS,
            label:(<Link to={PATH.DIALOGS}>Dialogs</Link>),
            icon:(<MessageOutlined/>)
        },
        {
            key: PATH.NEWS,
            label:(<Link to={PATH.NEWS}>News</Link>),
            icon:(<TwitterOutlined/>)
        },
        {
            key: PATH.MUSIC,
            label:(<Link to={PATH.MUSIC}>Music</Link>),
            icon:(<RedditOutlined/>)
        },
        {
            key: PATH.SETTINGS,
            label:(<Link to={PATH.SETTINGS}>Settings</Link>),
            icon:(<SettingOutlined/>)
        },
    ];

    return (
        <Sider
            theme='dark'
            className={s.sidebar}
        >
            <Menu theme="dark" mode="inline" selectedKeys={[location]} items={items}>
            </Menu>
            <div className={s.switch}>
                Chat on: <Switch onChange={(checked) => dispatch(setIsOn(checked))}/>
            </div>
        </Sider>

    );
}
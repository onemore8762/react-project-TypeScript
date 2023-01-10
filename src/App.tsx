import React, {lazy, useEffect} from 'react';
import './App.css';
import {Link, Route, Switch} from "react-router-dom";
import {Preloader} from "./components/common/Preloader/Preloader";
import {initializedApp} from "./redux/app-reducer";
import {AppHeader} from "./components/Header/Header";
import {
    MessageOutlined,
    RedditOutlined,
    SettingOutlined,
    TeamOutlined,
    TwitterOutlined,
    UserOutlined
} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {Layout, Menu, theme} from 'antd';
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {UsersPage} from "./components/Users/UsersPage";
import {Login} from "./Login/Login";

const {Content, Footer, Sider} = Layout;

const DialogsContainer = lazy(() => import("./components/Dialogs/Dialogs"))
const ProfileContainer = lazy(() => import("./components/Profile/Profile"))


export const App = () => {
    const initialized = useAppSelector(state => state.app.initialized)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(initializedApp())
    }, [])

    const {
        token: {colorBgContainer},
    } = theme.useToken();
    if (!initialized) return <Preloader/>
    return (
        <Layout style={{backgroundColor: '#ececec'}}>

            <AppHeader/>

            <Layout className="site-layout" style={{marginLeft: 200}}>
                <Sider
                    theme='dark'
                    style={{
                        overflow: 'auto',
                        height: '80vh',
                        position: 'fixed',
                        left: 10,
                        top: 100,
                        bottom: 0,
                        borderRadius: 10
                    }}
                >
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        <Menu.Item key={1} icon={<UserOutlined/>}> <Link to='/profile'>Profile</Link></Menu.Item>
                        <Menu.Item key={2} icon={<TeamOutlined/>}> <Link to='/users'>Users</Link></Menu.Item>
                        <Menu.Item key={3} icon={<MessageOutlined/>}> <Link to='/dialogs'>Messages</Link></Menu.Item>
                        <Menu.Item key={4} icon={<TwitterOutlined/>}> <Link to='/news'>News</Link></Menu.Item>
                        <Menu.Item key={5} icon={<RedditOutlined/>}> <Link to='/music'>Music</Link></Menu.Item>
                        <Menu.Item key={6} icon={<SettingOutlined/>}> <Link to='/settings'>Settings</Link></Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{backgroundColor: '#ececec'}}>
                    <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                        <div style={{padding: '75px 25px'}}>
                            <React.Suspense fallback={<Preloader/>}>
                                <Switch>
                                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                                    <Route path='/news' render={News}/>
                                    <Route path='/music' render={Music}/>
                                    <Route path='/settings' render={Settings}/>
                                    <Route path='/users' render={() => <UsersPage/>}/>
                                    <Route path='/login' render={() => <Login/>}/>
                                </Switch>
                            </React.Suspense>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Reaj ©2023 Created by Denis Churkin</Footer>
                </Layout>

            </Layout>
        </Layout>
    );
}
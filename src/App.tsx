import React, {lazy, useEffect} from 'react';
import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import {Preloader} from "./components/common/Preloader/Preloader";
import {initializedApp} from "./redux/app-reducer";
import {AppHeader} from "./components/Header/Header";
import {
    LoadingOutlined,
    MessageOutlined,
    RedditOutlined,
    SettingOutlined,
    TeamOutlined,
    TwitterOutlined,
    UserOutlined
} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {Layout, Menu} from 'antd';
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {UsersPage} from "./components/Users/UsersPage";
import {Login} from "./Login/Login";
import logo from "./assets/images/logo4.png";

const {Content, Footer, Sider} = Layout;

const DialogsContainer = lazy(() => import("./components/Dialogs/Dialogs"))
const ProfileContainer = lazy(() => import("./components/Profile/Profile"))


export const App = () => {
    const initialized = useAppSelector(state => state.app.initialized)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(initializedApp())
    }, [])

    // const {
    //     token: {colorBgContainer},
    // } = theme.useToken();

    if (!initialized) return <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <LoadingOutlined style={{ fontSize: 120 }} spin />
    </div>
    return (
        <Layout style={{backgroundColor: '#ececec'}}>
            <AppHeader/>
            <Layout style={{margin: '0 auto', width: '70vw', background: '#ececec'}}>
                <div style={{position: 'fixed', top: 5, zIndex: 10, display: "flex"}}>
                    <img src={logo} alt={'photoSite'} style={{width: '50px', marginRight: '10px'}}/>
                    <div style={{color: 'rgba(252,119,11,0.96)', fontSize: '36px', fontStyle: 'italic'}}>HashTag</div>
                </div>
                <Sider
                    theme='dark'
                    style={{
                        overflow: 'auto',
                        height: '500px',
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
                    <Content style={{margin: '65px 16px 0', overflow: 'initial', minHeight: '91vh'}}>
                        <div style={{padding: '15px 25px'}}>
                            <React.Suspense fallback={<Preloader/>}>
                                <Routes>
                                    <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
                                    <Route path='/dialogs' element={<DialogsContainer/>}/>
                                    <Route path='/news' element={<News/>}/>
                                    <Route path='/music' element={<Music/>}/>
                                    <Route path='/settings' element={<Settings/>}/>
                                    <Route path='/users' element={<UsersPage/>}/>
                                    <Route path='/login' element={<Login/>}/>
                                </Routes>
                            </React.Suspense>
                        </div>
                    </Content>
                </Layout>

            </Layout>
            <Footer
                style={{textAlign: 'center', width: '100%', margin: '0 auto', background: '#001529', color: 'white'}}>Reaj
                ©2023 Created by Denis Churkin</Footer>
        </Layout>
    );
}
import React, {lazy, useEffect} from 'react';
import './App.css';
import {Link, Navigate, Route, Routes, useLocation} from "react-router-dom";
import {PreloaderCustom} from "./components/common/Preloader/PreloaderCustom";
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
import {Login} from "./Login/Login";
import logo from "./assets/images/logo4.png";
import {Users} from "./components/Users/Users";


const {Content, Sider} = Layout;

const DialogsContainer = lazy(() => import("./components/Dialogs/Dialogs"))
const ProfileContainer = lazy(() => import("./components/Profile/Profile"))
const ChatPage = lazy(() => import("./pages/Chat/ChatPage"))


export const App = () => {
    const initialized = useAppSelector(state => state.app.initialized)
    const dispatch = useAppDispatch()

    const path = useLocation()
    let location = ''

    useEffect(() => {
        dispatch(initializedApp())
    }, [])

    if(path.pathname.slice(0,8) === '/profile'){
        location = path.pathname.slice(0,8)
    }else{
        location = path.pathname
    }



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
                    <Menu theme="dark" mode="inline" selectedKeys={[location]}>
                        <Menu.Item key={'/profile'} icon={<UserOutlined/>}> <Link to='/profile'>Profile</Link></Menu.Item>
                        <Menu.Item key={'/users'} icon={<TeamOutlined/>}> <Link to='/users'>Users</Link></Menu.Item>
                        <Menu.Item key={'/dialogs'} icon={<MessageOutlined/>}> <Link to='/dialogs'>Messages</Link></Menu.Item>
                        <Menu.Item key={'/news'} icon={<TwitterOutlined/>}> <Link to='/news'>News</Link></Menu.Item>
                        <Menu.Item key={'/music'} icon={<RedditOutlined/>}> <Link to='/music'>Music</Link></Menu.Item>
                        <Menu.Item key={'/settings'} icon={<SettingOutlined/>}> <Link to='/settings'>Settings</Link></Menu.Item>
                        <Menu.Item key={'/chat'} icon={<SettingOutlined/>}> <Link to='/chat'>Chat</Link></Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{position:'relative',backgroundColor: '#001529', margin: 50, marginTop: 100, color: '#ffffff', borderRadius: 15, minHeight: "85vh"}}>
                    <Content >
                            <React.Suspense fallback={<PreloaderCustom/>}>
                                <Routes>
                                    <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
                                    <Route path='/dialogs' element={<DialogsContainer/>}/>
                                    <Route path='/news' element={<News/>}/>
                                    <Route path='/music' element={<Music/>}/>
                                    <Route path='/settings' element={<Settings/>}/>
                                    <Route path='/users' element={<Users/>}/>
                                    <Route path='/login' element={<Login/>}/>
                                    <Route path='/chat' element={<ChatPage/>}/>
                                    <Route path='/*' element={<Navigate to={'/profile'}/>}/>
                                </Routes>
                            </React.Suspense>
                    </Content>
                </Layout>
                {/*<Footer*/}
                {/*    style={{textAlign: 'center', width: '100%', background: '#001529', color: 'white', position: 'absolute', bottom: 0}}>*/}
                {/*    Reaj ©2023 Created by Denis Churkin*/}
                {/*</Footer>*/}
            </Layout>
        </Layout>
    );
}



import React, {lazy, useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {PreloaderCustom} from "../common/PreloaderCustom/PreloaderCustom";
import {initializedApp} from "../redux/app-reducer";
import {AppHeader} from "../components/Header/Header";
import {LoadingOutlined} from '@ant-design/icons';
import {Layout} from 'antd';
import {News} from "../components/News/News";
import {Music} from "../components/Music/Music";
import {Settings} from "../components/Settings/Settings";
import {Login} from "../Login/Login";
import logo from "../assets/images/logo4.png";
import {Users} from "../components/Users/Users";
import {PrivateRoutes} from "../common/PrivateRoutes/PrivateRoutes";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import {Navbar} from "../components/Navbar/Navbar";
import {PATH} from "../common/path/path";


const {Content} = Layout;

const DialogsContainer = lazy(() => import("../components/Dialogs/Dialogs"))
const ProfileContainer = lazy(() => import("../components/Profile/Profile"))
const ChatPage = lazy(() => import("../pages/Chat/ChatPage"))


export const App = () => {
    const initialized = useAppSelector(state => state.app.initialized)
    const dispatch = useAppDispatch()
    const isOnChat = useAppSelector(state => state.chat.isOn)

    useEffect(() => {
        dispatch(initializedApp())
    }, [dispatch])

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
                <Navbar/>
                <Layout style={{position:'relative',backgroundColor: '#001529', margin: 50, marginTop: 100, color: '#ffffff', borderRadius: 15, minHeight: "85vh"}}>
                    <Content >
                            <React.Suspense fallback={<PreloaderCustom/>}>
                                <Routes>
                                    <Route element={<PrivateRoutes/>}>
                                        <Route path={PATH.PROFILE.PROFILEID} element={<ProfileContainer/>}/>
                                        <Route path={PATH.DIALOGS} element={<DialogsContainer/>}/>
                                        <Route path={PATH.NEWS} element={<News/>}/>
                                        <Route path={PATH.MUSIC} element={<Music/>}/>
                                        <Route path={PATH.SETTINGS} element={<Settings/>}/>
                                        <Route path={PATH.USERS} element={<Users/>}/>
                                    </Route>
                                    <Route path={PATH.LOGIN} element={<Login/>}/>
                                    <Route path='/*' element={<Navigate to={PATH.PROFILE.PROFILE}/>}/>
                                </Routes>
                                {isOnChat && <ChatPage/>}
                            </React.Suspense>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}



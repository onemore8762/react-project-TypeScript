import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Profile} from "./components/Profile/Profile";
import {Navbar} from "./components/Navbar/Navbar";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";


export type PropsType = {
    message: Array<messageType>
    dialogs: Array<dialogsType>
    posts: Array<postsType>
}
export type dialogsType = {
    id: number
    name: string
}
export type messageType = {
    id: number
    message: string
}
export type postsType ={
    id: number
    message: string
    likesCount: number
}

const App = (props: PropsType) => {
    const {message, dialogs, posts} = props
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>

                <div className="app-wrapper-content">
                    <Route path='/profile' render={() => <Profile posts={posts}/>}/>
                    <Route path='/dialogs' render={() => <Dialogs message={message} dialogs={dialogs}/>}/>
                    <Route path='/news' render={News}/>
                    <Route path='/music' render={Music}/>
                    <Route path='/settings' render={Settings}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

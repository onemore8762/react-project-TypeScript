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
import {ActionTypes, RootStateType} from "./redux/store";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";

type PropsType = {
    appState: RootStateType
    dispatch: (action: ActionTypes) => void
    store: any
}

const App = (props:PropsType) => {
    const {appState} = props
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>

                <div className="app-wrapper-content">
                    <Route path='/profile'
                           render={() => <Profile store={props.store}/>}/>
                    <Route path='/dialogs'
                           render={() => <DialogsContainer store={props.store}/>
                    }/>
                    <Route path='/news' render={News}/>
                    <Route path='/music' render={Music}/>
                    <Route path='/settings' render={Settings}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

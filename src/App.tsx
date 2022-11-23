import React from 'react';
import './App.css';
import ProfileContainer from "./components/Profile/ProfileContainer";
import {Navbar} from "./components/Navbar/Navbar";
import {Route} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./Login/Login";
import {connect} from "react-redux";
import {AppStateType} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";
import {initializedApp} from "./redux/app-reducer";


class App extends React.Component<mapDispatchToPropsType & mapStateToPropsType> {
    componentDidMount() {
        this.props.initializedApp()
    }

    render() {
        if (!this.props.initialized) return <Preloader/>
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>

                <div className="app-wrapper-content">
                    <Route path='/profile/:userId?'
                           render={() => <ProfileContainer/>}/>
                    <Route path='/dialogs'
                           render={() => <DialogsContainer/>
                           }/>
                    <Route path='/news' render={News}/>
                    <Route path='/music' render={Music}/>
                    <Route path='/settings' render={Settings}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                </div>
            </div>
        );
    }
}

type mapStateToPropsType = {
    initialized: boolean
}

type mapDispatchToPropsType = {
    initializedApp: () => void
}

const mapStateToProps = (state: AppStateType) : mapStateToPropsType  => ({
    initialized: state.app.initialized
})


export default connect(mapStateToProps, {initializedApp})(App);

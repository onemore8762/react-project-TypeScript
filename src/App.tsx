import React, {lazy} from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {Route, Switch} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {Login} from "./Login/Login";
import {connect} from "react-redux";
import {AppStateType} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";
import {initializedApp} from "./redux/app-reducer";
import {UsersPage} from "./components/Users/UsersPage";
import {Header} from "./components/Header/Header";

const DialogsContainer = lazy(() => import("./components/Dialogs/Dialogs"))
const ProfileContainer = lazy(() => import("./components/Profile/ProfileContainer"))

class App extends React.Component<mapDispatchToPropsType & mapStateToPropsType> {
    componentDidMount() {
        this.props.initializedApp()
    }

    render() {
        if (!this.props.initialized) return <Preloader/>
        return (
            <div className="app-wrapper">
                <Header/>
                <Navbar/>

                <div className="app-wrapper-content">
                    <React.Suspense fallback={<Preloader/>}>
                        <Switch>
                            <Route path='/profile/:userId?'
                                   render={() => <ProfileContainer/>}/>
                            <Route path='/dialogs'
                                   render={() => <DialogsContainer/>}/>
                            <Route path='/news' render={News}/>
                            <Route path='/music' render={Music}/>
                            <Route path='/settings' render={Settings}/>
                            <Route path='/users' render={() => <UsersPage/>}/>
                            <Route path='/login' render={() => <Login/>}/>
                        </Switch>
                    </React.Suspense>
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

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    initialized: state.app.initialized
})


export default connect(mapStateToProps, {initializedApp})(App);

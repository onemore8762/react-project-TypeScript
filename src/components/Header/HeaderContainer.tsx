import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {getAuthUserData, setAuthUserDataAC} from "../../redux/auth-reducer";
import axios from "axios";
import {AppStateType} from "../../redux/redux-store";
import {authApi} from "../../api/api";


class HeaderContainer extends React.Component<any>{

    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login}/>
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {
    getAuthUserData
})(HeaderContainer)
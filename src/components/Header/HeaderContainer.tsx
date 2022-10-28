import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {setAuthUserDataAC} from "../../redux/auth-reducer";
import axios from "axios";
import {AppStateType} from "../../redux/redux-store";


class HeaderContainer extends React.Component<any>{

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
            withCredentials: true
        })
            .then((response) => {
                if( response.data.resultCode === 0){
                    let {id, login, email} = response.data.data
                    this.props.setAuthUserDataAC(id, login, email)
                }
            })
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
    setAuthUserDataAC
})(HeaderContainer)
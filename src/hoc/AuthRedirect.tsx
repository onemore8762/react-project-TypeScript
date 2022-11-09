import React, {Component, ComponentType} from 'react';
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

type mapStateToPropsType = {
    isAuth: boolean
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect<T>(Component: ComponentType<T>) {
    function RedirectComponent(props: mapStateToPropsType) {
        let {isAuth, ...restProps} = props
        if (!props.isAuth) return <Redirect to={'/login'}/>

        return <Component {...restProps as T}/>
    }

    return connect(mapStateToProps)(RedirectComponent)
}
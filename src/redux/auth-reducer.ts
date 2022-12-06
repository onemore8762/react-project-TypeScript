import {AllActionType} from "./redux-store";
import {Dispatch} from "redux";
import {authApi} from "../api/api";
import {stopSubmit} from "redux-form";


export const SET_USER_DATA = 'react-samurai-TS/auth/SET_USER_DATA'


let initialState = {
    userId: null as null,
    login: null,
    email: null,
    isAuth: false
}

export type initialStateProfileType = {
    userId: null | number
    login: null | string
    email: null | string
    isAuth: boolean
}

export const authReducer = (state: initialStateProfileType = initialState, action: AllActionType): initialStateProfileType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload}
        default:
            return state
    }
}

export type authActionType = setUserDataACType
export type setUserDataACType = ReturnType<typeof setAuthUserDataAC>


export const setAuthUserDataAC = (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => {
    return {
        type: SET_USER_DATA,
        payload: {
            userId,
            login,
            email,
            isAuth
        }
    } as const
}


export const getAuthUserData = () => async (dispatch: Dispatch) => {
    const response = await authApi.me()

    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data
        dispatch(setAuthUserDataAC(id, login, email, true))
    }
}


export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    const response = await authApi.login(email, password, rememberMe)

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}


export const logout = () => async (dispatch: any) => {
    const response = await authApi.logout()

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false))
    }
}


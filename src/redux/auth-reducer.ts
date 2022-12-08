import {AllActionType} from "./redux-store";
import {Dispatch} from "redux";
import {authApi} from "../api/api";
import {stopSubmit} from "redux-form";


export const SET_USER_DATA = 'react-samurai-TS/auth/SET_USER_DATA'
export const SET_CAPTCHA_URL = 'react-samurai-TS/auth/CAPTCHA_URL'


let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null
}

export type initialStateAuthType = {
    userId: null | number
    login: null | string
    email: null | string
    isAuth: boolean
    captchaUrl: null | string
}

export const authReducer = (state: initialStateAuthType = initialState, action: AllActionType): initialStateAuthType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload}
        case SET_CAPTCHA_URL:
            debugger
            return {...state, ...action.payload}
        default:
            return state
    }
}

export type authActionType = setUserDataACType | setCaptchaACType
export type setUserDataACType = ReturnType<typeof setAuthUserDataAC>
export type setCaptchaACType = ReturnType<typeof setCaptchaAC>


export const setAuthUserDataAC = (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => {
    return {type: SET_USER_DATA, payload: {userId, login, email, isAuth}} as const
}
export const setCaptchaAC = (captchaUrl: string) => {
    return {type: SET_CAPTCHA_URL, payload: {captchaUrl}} as const
}


export const getAuthUserData = () => async (dispatch: Dispatch) => {
    const response = await authApi.me()

    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data
        dispatch(setAuthUserDataAC(id, login, email, true))
    }
}


export const login = (email: string, password: string, rememberMe: boolean, captcha?: string) => async (dispatch: any) => {
    const response = await authApi.login(email, password, rememberMe, captcha)

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptcha())
        }
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

export const getCaptcha = () => async (dispatch: any) => {
    const response = await authApi.captcha()
    console.log(response.data)
    dispatch(setCaptchaAC(response.data.url))
}



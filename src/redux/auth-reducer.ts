import {AllActionType, AppThunk} from "./redux-store";
import {stopSubmit} from "redux-form";
import {authApi} from "../api/auth-api";
import {getUserProfile} from "./profile-reducer";


let initialState = {
    userId: null as null | string,
    login: null as null | string,
    email: null as null | string,
    isAuth: false,
    captchaUrl: null as null | string
}

export type initialStateAuthType = typeof initialState

export const authReducer = (state = initialState, action: AllActionType): initialStateAuthType => {
    switch (action.type) {
        case 'react-samurai-TS/auth/SET_USER_DATA':
            return {...state, ...action.payload}
        case 'react-samurai-TS/auth/CAPTCHA_URL':
            debugger
            return {...state, ...action.payload}
        default:
            return state
    }
}

export type authActionType = ReturnType<typeof setAuthUserDataAC> | ReturnType<typeof setCaptchaAC>


export const setAuthUserDataAC = (userId: string | null, login: string | null, email: string | null, isAuth: boolean) => {
    return {type: 'react-samurai-TS/auth/SET_USER_DATA', payload: {userId, login, email, isAuth}} as const
}
export const setCaptchaAC = (captchaUrl: string) => {
    return {type: 'react-samurai-TS/auth/CAPTCHA_URL', payload: {captchaUrl}} as const
}

export const getAuthUserData = (): AppThunk => async (dispatch) => {
    const response = await authApi.me()

    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data
        dispatch(setAuthUserDataAC(id, login, email, true))
        dispatch(getUserProfile(id))
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


export const logout = (): AppThunk => async (dispatch) => {
    const response = await authApi.logout()

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false))
    }
}

export const getCaptcha = (): AppThunk => async (dispatch) => {
    const response = await authApi.captcha()
    dispatch(setCaptchaAC(response.data.url))
}



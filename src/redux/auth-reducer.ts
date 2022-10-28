import React from 'react';
import {AllActionType} from "./redux-store";


export const SET_USER_DATA = 'SET_USER_DATA'


let initialState  = {
    userId: null,
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
        case 'SET_USER_DATA':
            return {...state, ...action.data, isAuth: true}
        default:
            return state
    }
}

export type authActionType = setUserDataACType
export type setUserDataACType = ReturnType<typeof setAuthUserDataAC>


export const setAuthUserDataAC = (userId: number, login: string, email: string) => {
    return {
        type: SET_USER_DATA,
        data: {
            userId,
            login,
            email
        }
    } as const
}

import React from "react";
import {AllActionType} from "./redux-store";


const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT'

const initialState: initialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1
}
export type initialStateType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
}
export type UserType = {
    id: number
    name: string
    uniqueUrlName: any
    photos: {
        small: any
        large: any
    }
    followed: boolean
    status: string
}


export const usersReducer = (state: initialStateType = initialState, action: AllActionType): initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(el => el.id === action.userID ? {...el, followed: true} : el)}
        case UNFOLLOW:
            return {...state, users: state.users.map(el => el.id === action.userID ? {...el, followed: false} : el)}
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_COUNT:
            return {...state, totalUsersCount: action.totalCount}
        default:
            return state
    }

}

export type UsersActionsType = FollowACType
    | UnFollowACType
    | SetUsersACType
    | SetCurrentPageACType
    | SetTotalUsersCountACType

type FollowACType = ReturnType<typeof FollowAC>
type UnFollowACType = ReturnType<typeof UnFollowAC>
type SetUsersACType = ReturnType<typeof SetUsersAC>
type SetCurrentPageACType = ReturnType<typeof SetCurrentPageAC>
type SetTotalUsersCountACType = ReturnType<typeof SetTotalUsersCountAC>

export const FollowAC = (userID: number) => ({type: FOLLOW, userID} as const)
export const UnFollowAC = (userID: number) => ({type: UNFOLLOW, userID} as const)
export const SetUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users} as const)
export const SetCurrentPageAC = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)
export const SetTotalUsersCountAC = (totalCount: number) => ({type: SET_TOTAL_COUNT, totalCount} as const)

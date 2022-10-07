import React from "react";
import {AllActionType} from "./redux-store";
import users from "../components/Users/Users";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

const initialState: initialStateType = {
    users: []
}
export type initialStateType = {
    users: UserType[]
}

export type UserType = {
    id: number
    avatarUrl: string
    followed: boolean
    fullName: string
    status: string
    location: UsersLocation
}

type UsersLocation = {
    city: string
    country: string
}


export const usersReducer = (state: initialStateType = initialState, action: AllActionType): initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(el => el.id === action.userID ? {...el, followed: true} : el)}
        case UNFOLLOW:
            return {...state, users: state.users.map(el => el.id === action.userID ? {...el, followed: false} : el)}
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state
    }

}

export type UsersActionsType = FollowACType | UnFollowACType | SetUsersACType

type FollowACType = ReturnType<typeof FollowAC>
type UnFollowACType = ReturnType<typeof UnFollowAC>
type SetUsersACType = ReturnType<typeof SetUsersAC>


export const FollowAC = (userID: number) => ({type: FOLLOW, userID} as const)
export const UnFollowAC = (userID: number) => ({type: UNFOLLOW, userID} as const)
export const SetUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users} as const)

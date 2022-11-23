
import {AllActionType} from "./redux-store";
import {Dispatch} from "redux";
import {profileAPI} from "../api/api";
import {v1} from "uuid";


export const ADD_POST = 'ADD_POST'
export const SET_USER_PROFILE = 'SET_USER_PROFILE'
export const SET_STATUS = 'SET_STATUS'

export type postType = {
    id: string
    message: string
    likesCount: number
}

let initialState = {
    posts: [
        {id: v1(), message: 'Hi, how are you?', likesCount: 12},
        {id: v1(), message: 'Yo', likesCount: 2},
        {id: v1(), message: 'What you doing?', likesCount: 15},
    ] as Array<postType>,
    profile: null,
    status: ""
}

export type initialStateProfileType = typeof initialState

export const profileReducer = (state: initialStateProfileType = initialState, action: AllActionType) : initialStateProfileType=> {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: v1(),
                message: action.newPostText,
                likesCount: 12
            }
            return {...state, posts: [...state.posts, newPost]}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}

        case SET_STATUS:
            return {...state, status: action.status}
        default:
            return state
    }
}

export type ProfileActionType = AddPostActionType
    | SetUserProfileACType
    | setStatusACType
export type AddPostActionType = ReturnType<typeof AddPostAC>
export type SetUserProfileACType = ReturnType<typeof SetUserProfileAC>
export type setStatusACType = ReturnType<typeof setStatus>


export const AddPostAC = (newPostText: string) => ({type: ADD_POST, newPostText} as const)
export const SetUserProfileAC = (profile: any) => ({type: SET_USER_PROFILE, profile: profile} as const)
export const setStatus = (status: string) => ({type: SET_STATUS, status: status} as const )

export const getUserProfile = (userId: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.getProfile(userId)
            .then(response => {
                dispatch(SetUserProfileAC(response.data))
            })
    }
}

export const getStatus = (userId: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatus(response.data))
            })
    }
}

export const updateStatus = (status: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if(response.data.resultCode === 0){
                    dispatch(setStatus(status))
                }
            })
    }
}
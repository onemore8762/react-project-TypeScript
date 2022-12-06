import {AllActionType} from "./redux-store";
import {Dispatch} from "redux";
import {profileAPI} from "../api/api";
import {v1} from "uuid";


export const ADD_POST = 'react-samurai-TS/profile/ADD_POST'
export const DELETE_POST = 'react-samurai-TS/profile/DELETE_POST'
export const SET_USER_PROFILE = 'react-samurai-TS/profile/SET_USER_PROFILE'
export const SET_STATUS = 'react-samurai-TS/profile/SET_STATUS'

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

export const profileReducer = (state: initialStateProfileType = initialState, action: AllActionType): initialStateProfileType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: v1(),
                message: action.newPostText,
                likesCount: 12
            }
            return {...state, posts: [...state.posts, newPost]}
        case DELETE_POST:
            return {...state, posts: state.posts.filter(el => el.id !== action.postId)}
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
    | SetStatusACType
    | DeletePostACType
export type AddPostActionType = ReturnType<typeof AddPostAC>
export type SetUserProfileACType = ReturnType<typeof SetUserProfileAC>
export type SetStatusACType = ReturnType<typeof setStatus>
export type DeletePostACType = ReturnType<typeof deletePostAC>


export const AddPostAC = (newPostText: string) => ({type: ADD_POST, newPostText} as const)
export const SetUserProfileAC = (profile: any) => ({type: SET_USER_PROFILE, profile: profile} as const)
export const setStatus = (status: string) => ({type: SET_STATUS, status: status} as const)
export const deletePostAC = (postId: string) => ({type: DELETE_POST, postId: postId} as const)

export const getUserProfile = (userId: string) => async (dispatch: Dispatch) => {
    const response = await profileAPI.getProfile(userId)

    dispatch(SetUserProfileAC(response.data))
}


export const getStatus = (userId: string) => async (dispatch: Dispatch) => {
    const response = await profileAPI.getStatus(userId)

    dispatch(setStatus(response.data))
}


export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    const response = await profileAPI.updateStatus(status)

    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
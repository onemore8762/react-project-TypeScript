import {AllActionType} from "./redux-store";
import {Dispatch} from "redux";
import {profileAPI} from "../api/api";
import {v1} from "uuid";


export const ADD_POST = 'react-samurai-TS/profile/ADD_POST'
export const DELETE_POST = 'react-samurai-TS/profile/DELETE_POST'
export const SET_USER_PROFILE = 'react-samurai-TS/profile/SET_USER_PROFILE'
export const SET_STATUS = 'react-samurai-TS/profile/SET_STATUS'
export const SAVE_PHOTO_SUCCESS = 'react-samurai-TS/profile/SAVE_PHOTO_SUCCESS'

export type postType = {
    id: string
    message: string
    likesCount: number
}
export type ContactsType ={
    facebook: string ,
    "website": string,
    vk: string,
    twitter: string,
    instagram: string ,
    youtube: string ,
    github: string ,
    mainLink: string
}
export type ProfileType = {
    aboutMe: string,
    contacts: ContactsType,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: string,
    "photos": PhotosType
}
type PhotosType = {
    "small": string ,
    "large": string
}
let initialState : InitialStateProfileType = {
    posts: [
        {id: v1(), message: 'Hi, how are you?', likesCount: 12},
        {id: v1(), message: 'Yo', likesCount: 2},
        {id: v1(), message: 'What you doing?', likesCount: 15},
    ] as Array<postType>,
    profile: {
        aboutMe: '',
        contacts: {
            facebook: '' ,
            website: '',
            vk: '',
            twitter: '',
            instagram: '' ,
            youtube: '' ,
            github: '' ,
            mainLink: ''
        },
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: '',
        userId: '',
        photos: {
            large: '',
            small: ''
        }
    } as ProfileType,
    status: ""
}
export type InitialStateProfileType = {
    posts: Array<postType>,
    profile: ProfileType ,
    status: string
}


export const profileReducer = (state = initialState, action: AllActionType): InitialStateProfileType => {
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
        case SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos}}
        default:
            return state
    }
}

export type ProfileActionType = AddPostActionType
    | SetUserProfileACType
    | SetStatusACType
    | DeletePostACType
    | SavePhotoSuccessACType
export type AddPostActionType = ReturnType<typeof AddPostAC>
export type SetUserProfileACType = ReturnType<typeof SetUserProfileAC>
export type SetStatusACType = ReturnType<typeof setStatus>
export type DeletePostACType = ReturnType<typeof deletePostAC>
export type SavePhotoSuccessACType = ReturnType<typeof savePhotoSuccess>


export const AddPostAC = (newPostText: string) => ({type: ADD_POST, newPostText} as const)
export const SetUserProfileAC = (profile: any) => ({type: SET_USER_PROFILE, profile: profile} as const)
export const setStatus = (status: string) => ({type: SET_STATUS, status: status} as const)
export const deletePostAC = (postId: string) => ({type: DELETE_POST, postId: postId} as const)
export const savePhotoSuccess = (photos: PhotosType) => ({type: SAVE_PHOTO_SUCCESS, photos: photos} as const)

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

export const savePhoto = (photoFile: any) => async (dispatch: Dispatch) => {
    const response = await profileAPI.savePhoto(photoFile)

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (userId:string, FormData: any) => async (dispatch: any) => {
    console.log(FormData)
    const response = await profileAPI.saveProfile(FormData)

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    }else{
        return Promise.reject(response.data.messages[0])
    }
}
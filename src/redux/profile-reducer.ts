import {AllActionType, AppThunk} from "./redux-store";
import {v1} from "uuid";
import {PhotosType, postType, profileAPI, ProfileType} from "../api/profile-api";


const initialState = {
    posts: [
        {id: v1(), message: 'Hi, how are you?', likesCount: 12},
        {id: v1(), message: 'Yo', likesCount: 2},
        {id: v1(), message: 'What you doing?', likesCount: 15},
    ] as Array<postType>,
    profile: {
        aboutMe: '',
        contacts: {
            facebook: '',
            website: '',
            vk: '',
            twitter: '',
            instagram: '',
            youtube: '',
            github: '',
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
    status: "",
    myPhoto: '',
    isLoading: false
}

export type InitialStateProfileType = typeof initialState


export const profileReducer = (state = initialState, action: AllActionType): InitialStateProfileType => {
    switch (action.type) {
        case 'react-samurai-TS/profile/ADD_POST':
            let newPost = {
                id: v1(),
                message: action.newPostText,
                likesCount: 12
            }
            return {...state, posts: [...state.posts, newPost]}
        case 'react-samurai-TS/profile/DELETE_POST':
            return {...state, posts: state.posts.filter(el => el.id !== action.postId)}
        case 'react-samurai-TS/profile/SET_USER_PROFILE':
            return {...state, profile: action.profile}

        case 'react-samurai-TS/profile/SET_STATUS':
            return {...state, status: action.status}
        case 'react-samurai-TS/profile/SAVE_PHOTO_SUCCESS':
            return {...state, profile: {...state.profile, photos: action.photos}}
        case 'react-samurai-TS/profile/SET_MY_PHOTO':
            return {...state, myPhoto: action.photo}
        case 'react-samurai-TS/profile/SET-LOADING':
            return {...state, isLoading: action.isLoading}
        default:
            return state
    }
}

export type ProfileActionType = ReturnType<typeof addPostAC>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof deletePostAC>
    | ReturnType<typeof savePhotoSuccess>
    | ReturnType<typeof setMyPhoto>
    | ReturnType<typeof setLoading>

export const addPostAC = (newPostText: string) => ({type: 'react-samurai-TS/profile/ADD_POST', newPostText} as const)
export const setLoading = (isLoading: boolean) => ({type: 'react-samurai-TS/profile/SET-LOADING', isLoading} as const)
export const setUserProfileAC = (profile: ProfileType) => ({
    type: 'react-samurai-TS/profile/SET_USER_PROFILE',
    profile: profile
} as const)
export const setStatus = (status: string) => ({type: 'react-samurai-TS/profile/SET_STATUS', status: status} as const)
export const deletePostAC = (postId: string) => ({
    type: 'react-samurai-TS/profile/DELETE_POST',
    postId: postId
} as const)
export const savePhotoSuccess = (photos: PhotosType) => ({
    type: 'react-samurai-TS/profile/SAVE_PHOTO_SUCCESS',
    photos: photos
} as const)
export const setMyPhoto = (photo: string) => ({
    type: 'react-samurai-TS/profile/SET_MY_PHOTO',
    photo
} as const)

export const getUserProfile = (userId: string): AppThunk => async (dispatch, getState) => {
    dispatch(setLoading(true))
    const data = await profileAPI.getProfile(userId)
    const myPhoto = getState().profilePage.myPhoto
    if(!myPhoto) {
        const userIdAuth = getState().auth.userId
        if(userIdAuth === data.userId){
            dispatch(setMyPhoto(data.photos.large))
        }
    }
    dispatch(setLoading(false))
    dispatch(setUserProfileAC(data))
}


export const getStatus = (userId: string): AppThunk => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)

    dispatch(setStatus(data))
}


export const updateStatus = (status: string): AppThunk => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)

    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (photoFile: any): AppThunk => async (dispatch) => {
    const response = await profileAPI.savePhoto(photoFile)

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (userId: string, FormData: any) => async (dispatch: any) => {
    const response = await profileAPI.saveProfile(FormData)

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        return Promise.reject(response.data.messages[0])
    }
}
import React from 'react';
import {AllActionType} from "./redux-store";




export const ADD_POST = 'ADD-POST'
export const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT-POST'

export type postType = {
    id: number
    message: string
    likesCount: number
}

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'Yo', likesCount: 2},
        {id: 2, message: 'What you doing?', likesCount: 15},
    ] as Array<postType>,
    newPostText: ""
}

export type initialStateProfileType = typeof initialState

export const profileReducer = (state: initialStateProfileType = initialState, action: AllActionType) : initialStateProfileType=> {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 12
            }
            state.newPostText = ''
            return {...state, posts: [...state.posts, newPost]}
        case UPDATE_NEW_POST_TEXT:
            return {...state, newPostText: action.newText }
        default:
            return state
    }
}

export type ProfileActionType = AddPostActionType | CreateNewTextActionType
export type AddPostActionType = ReturnType<typeof AddPostAC>
export type CreateNewTextActionType = ReturnType<typeof CreateNewTextAC>

export const AddPostAC = () => ({type: ADD_POST} as const)
export const CreateNewTextAC = (newText: string) => ({type: UPDATE_NEW_POST_TEXT, newText: newText} as const)
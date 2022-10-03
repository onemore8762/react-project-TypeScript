import React from 'react';
import {ActionTypes, ProfilePage} from "./store";


export const ADD_POST = 'ADD-POST'
export const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT-POST'

let initialState = {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 12},
            {id: 2, message: 'Yo', likesCount: 2},
            {id: 2, message: 'What you doing?', likesCount: 15},
        ],
        newPostText: ""
    }

export const profileReducer = (state: ProfilePage = initialState, action: ActionTypes) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 12
            }
            state.posts.push(newPost)
            state.newPostText = ''
            return state
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText
            return state
        default:
            return state
    }
}

export type ProfileActionType = AddPostActionType | CreateNewTextActionType
export type AddPostActionType = ReturnType<typeof AddPostAC>
export type CreateNewTextActionType = ReturnType<typeof CreateNewTextAC>

export const AddPostAC = () => ({type: ADD_POST} as const)
export const CreateNewTextAC = (newText: string) => ({type: UPDATE_NEW_POST_TEXT, newText: newText} as const)
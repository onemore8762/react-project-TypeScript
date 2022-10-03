import React from 'react';
import {ActionTypes, MessagePageType} from "./store";


export const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
export const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Denis'},
        {id: 7, name: 'Valera'},
    ],
    message: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Yo'},
        {id: 3, message: 'How is your it-kamasutra?'},
        {id: 4, message: 'uoy'},
        {id: 5, message: 'Yo'},
        {id: 6, message: 'Hello'},
        {id: 7, message: 'KIss'},
    ],
    newMessageBody: 'd'
}

export const dialogsReducer = (state: MessagePageType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body
            return state
        case SEND_MESSAGE:
            let body = state.newMessageBody
            state.newMessageBody = ''
            state.message.push({id: 6, message: body})
            return state
        default:
            return state
    }
}

export type DialogsActionType = UpdateNewMessageBodyActionType | SendMessageActionType
export type UpdateNewMessageBodyActionType = ReturnType<typeof UpdateNewMessageBodyAC>
export type SendMessageActionType = ReturnType<typeof SendMessageAC>


export const UpdateNewMessageBodyAC = (newText: string) => ({type: UPDATE_NEW_MESSAGE_BODY, body: newText} as const)
export const SendMessageAC = () => ({type: SEND_MESSAGE} as const)
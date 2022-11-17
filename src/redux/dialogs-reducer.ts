import {AllActionType} from "./redux-store";
import {v1} from "uuid";

type messageType = {
    id: string
    message: string
}
type dialogType = {
    id: string
    name: string
}

export const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
    dialogs: [
        {id: v1(), name: 'Dimych'},
        {id: v1(), name: 'Andrey'},
        {id: v1(), name: 'Sveta'},
        {id: v1(), name: 'Sasha'},
        {id: v1(), name: 'Viktor'},
        {id: v1(), name: 'Denis'},
        {id: v1(), name: 'Valera'},
    ] as Array<dialogType>,
    message: [
        {id: v1(), message: 'Hi'},
        {id: v1(), message: 'Yo'},
        {id: v1(), message: 'How is your it-kamasutra?'},
        {id: v1(), message: 'uoy'},
        {id: v1(), message: 'Yo'},
        {id: v1(), message: 'Hello'},
        {id: v1(), message: 'KIss'},
    ] as Array<messageType>,
}

export type initialStateMessageType = typeof initialState

export const dialogsReducer = (state: initialStateMessageType = initialState, action: AllActionType) : initialStateMessageType => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {...state,message: [...state.message, {id: v1(), message: action.newMessageBody}]}
        default:
            return state
    }
}

export type DialogsActionType =  SendMessageActionType
export type SendMessageActionType = ReturnType<typeof SendMessageAC>


export const SendMessageAC = (newMessageBody: string) => ({type: SEND_MESSAGE, newMessageBody} as const)
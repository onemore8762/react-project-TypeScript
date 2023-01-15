import {AllActionType, AppDispatch, AppThunk} from "./redux-store";
import {chatApi, ChatMessageType, StatusType} from "../common/api/chat-api";

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType,
    isOn: false,
}

export type initialStateAuthType = typeof initialState

export const chatReducer = (state = initialState, action: AllActionType): initialStateAuthType => {
    switch (action.type) {
        case 'react-samurai-TS/chat/SET-MESSAGES':
            return {...state, messages: [...state.messages, ...action.payload.messages]}
       case 'react-samurai-TS/chat/STATUS-CHANGED':
            return {...state, status: action.payload.status }
        case 'react-samurai-TS/chat/CLEAR-MESSAGE':
            return {...state, messages: []}
        case 'react-samurai-TS/chat/SET-IS-ON':
            return {...state, isOn: action.payload.isOn}
        default:
            return state
    }
}

export type chatActionType =
    | ReturnType<typeof messagesReceived>
    | ReturnType<typeof statusChanged>
    | ReturnType<typeof clearMessage>
    | ReturnType<typeof setIsOn>

export const messagesReceived = (messages: ChatMessageType[]) => {
    return {type: 'react-samurai-TS/chat/SET-MESSAGES', payload: {messages}} as const
}
export const statusChanged = (status: StatusType) => {
    return {type: 'react-samurai-TS/chat/STATUS-CHANGED', payload: {status}} as const
}
export const setIsOn = (isOn: boolean) => {
    return {type: 'react-samurai-TS/chat/SET-IS-ON', payload: {isOn}} as const
}
export const clearMessage = () => {
    return {type: 'react-samurai-TS/chat/CLEAR-MESSAGE'} as const
}


let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: AppDispatch) =>{
    if(_newMessageHandler === null){
        _newMessageHandler = (messages) => {
            dispatch(messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((messages: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: AppDispatch) =>{
    if(_statusChangedHandler === null){
        _statusChangedHandler = (status) => {
            dispatch(statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): AppThunk => async (dispatch) => {
    chatApi.start()
    chatApi.subscribe( 'messages-received',newMessageHandlerCreator(dispatch))
    chatApi.subscribe( 'status-changed',statusChangedHandlerCreator(dispatch))
}


export const stopMessagesListening = (): AppThunk => async (dispatch) => {
    chatApi.unsubscribe('messages-received',newMessageHandlerCreator(dispatch))
    chatApi.unsubscribe('status-changed',statusChangedHandlerCreator(dispatch))
    chatApi.stop()
    dispatch(clearMessage())
}

export const sendMessage = (message: string): AppThunk => async () => {
    chatApi.send(message)
}

import {AllActionType, AppDispatch, AppThunk} from "./redux-store";
import {chatApi, ChatMessageType, StatusType} from "../api/chat-api";

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

export type initialStateAuthType = typeof initialState

export const chatReducer = (state = initialState, action: AllActionType): initialStateAuthType => {
    switch (action.type) {
        case 'react-samurai-TS/chat/SET-MESSAGES':
            return {...state, messages: [...state.messages, ...action.payload.messages]}
       case 'react-samurai-TS/chat/STATUS-CHANGED':
            return {...state, status: action.payload.status }
        default:
            return state
    }
}

export type chatActionType = ReturnType<typeof messagesReceived> |ReturnType<typeof statusChanged>

export const messagesReceived = (messages: ChatMessageType[]) => {
    return {type: 'react-samurai-TS/chat/SET-MESSAGES', payload: {messages}} as const
}
export const statusChanged = (status: StatusType) => {
    return {type: 'react-samurai-TS/chat/STATUS-CHANGED', payload: {status}} as const
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
}

export const sendMessage = (message: string): AppThunk => async (dispatch) => {
    chatApi.send(message)
}

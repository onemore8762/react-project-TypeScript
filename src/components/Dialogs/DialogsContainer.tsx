import React, {ChangeEvent} from 'react'
import s from './Dialogs.module.css'
import {DialogItems} from "./DialogItems/DialogItems";
import {Message} from "./Message/Message";
import {SendMessageAC, UpdateNewMessageBodyAC} from "../../redux/dialogs-reducer";
import {ActionTypes, dialogType, messageType} from "../../redux/store";
import {Dialogs} from "./Dialogs";

type DialogsPropsType = {
    store: any
}


export const DialogsContainer: React.FC<DialogsPropsType>= ({store}) => {

    let state = store.getState()

    const onSendMessageClick = () => {
        store.dispatch(SendMessageAC())
    }

    const onNewMessageChange = (newText: string) => {
        store.dispatch(UpdateNewMessageBodyAC(newText))
    }


    return <Dialogs updateNewMessage={onNewMessageChange}
                    sendMessage={onSendMessageClick}
                    dialogs={state.dialogsPage.dialogs}
                    message={state.dialogsPage.message}
                    newMessageBody={state.dialogsPage.newMessageBody}

    />
}
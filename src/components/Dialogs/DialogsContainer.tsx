import React from 'react'
import {SendMessageAC, UpdateNewMessageBodyAC} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {RootStoreTypeRedux} from "../../redux/redux-store";
import { StoreContext } from '../../StoreContext';

/*type DialogsPropsType = {
    store: RootStoreTypeRedux
}*/


export const DialogsContainer = () => {

    return (
        <StoreContext.Consumer>
            {
                store => {
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
            }
        </StoreContext.Consumer>
    )
}
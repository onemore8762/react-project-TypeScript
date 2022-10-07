import React from 'react'
import {initialStateMessageType, SendMessageAC, UpdateNewMessageBodyAC} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {connect} from "react-redux";

type mapStateToPropsType = {
    dialogsPage: initialStateMessageType
}

type mapDispatchToPropsType = {
    updateNewMessage: (newText: string) => void
    sendMessage: () => void
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        updateNewMessage: (newText: string) => {
            dispatch(UpdateNewMessageBodyAC(newText))
        },
        sendMessage: () => {
            dispatch(SendMessageAC())
        },
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
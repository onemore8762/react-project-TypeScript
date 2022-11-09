import React from 'react'
import {initialStateMessageType, SendMessageAC, UpdateNewMessageBodyAC} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {AppStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/AuthRedirect";

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


export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)
import React, {ChangeEvent} from 'react'
import s from './Dialogs.module.css'
import {DialogItems} from "./DialogItems/DialogItems";
import {Message} from "./Message/Message";
import {initialStateMessageType} from "../../redux/dialogs-reducer";


type DialogsPropsType = {
    updateNewMessage: (text: string) => void
    sendMessage: () => void
    dialogsPage: initialStateMessageType
}


export const Dialogs: React.FC<DialogsPropsType> = (
    {
        sendMessage,
        updateNewMessage,
        dialogsPage,
        ...arg
    }
) => {

    const onClickHandler = () => {
        sendMessage()
    }

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        updateNewMessage(e.currentTarget.value)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsPage.dialogs.map(el => {
                    return <DialogItems key={el.id} name={el.name} id={el.id}/>
                })}


            </div>
            <div className={s.messages}>
                {dialogsPage.message.map(el => {
                    return <Message key={el.id} message={el.message} id={el.id}/>
                })}
                <div><textarea value={dialogsPage.newMessageBody} onChange={onChangeHandler}></textarea></div>
                <div>
                    <button onClick={onClickHandler}>Add</button>
                </div>
            </div>

        </div>
    )
}
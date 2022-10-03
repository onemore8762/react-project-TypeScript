import React, {ChangeEvent} from 'react'
import s from './Dialogs.module.css'
import {DialogItems} from "./DialogItems/DialogItems";
import {Message} from "./Message/Message";
import {dialogType, messageType} from "../../redux/store";

type DialogsPropsType = {
    updateNewMessage: (text: string) => void
    sendMessage: () => void
    dialogs: Array<dialogType>
    message: Array<messageType>
    newMessageBody: string
}


export const Dialogs: React.FC<DialogsPropsType> = (
    {
        sendMessage,
        updateNewMessage,
        dialogs,
        message,
        newMessageBody
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
                {dialogs.map(el => {
                    return <DialogItems key={el.id} name={el.name} id={el.id}/>
                })}


            </div>
            <div className={s.messages}>
                {message.map(el => {
                    return <Message key={el.id} message={el.message} id={el.id}/>
                })}
                <div><textarea value={newMessageBody} onChange={onChangeHandler}></textarea></div>
                <div>
                    <button onClick={onClickHandler}>Add</button>
                </div>
            </div>

        </div>
    )
}
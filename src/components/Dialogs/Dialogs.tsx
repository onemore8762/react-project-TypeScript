import React from 'react'
import s from './Dialogs.module.css'
import {DialogItems} from "./DialogItems/DialogItems";
import {Message} from "./Message/Message";
import {dialogsType, messageType} from "../../App";


type DialogsPropsType ={
    dialogs: Array<dialogsType>
    message: Array<messageType>
}

export const Dialogs = (props: DialogsPropsType) => {
    const {dialogs, message} = props

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogs.map(el => {
                    return <DialogItems key={el.id} name={el.name} id={el.id}/>
                })}


            </div>
            <div className={s.messages}>
                {message.map(el =>{
                    return <Message key={el.id} message={el.message} id={el.id}/>
                })}
            </div>
        </div>
    )
}
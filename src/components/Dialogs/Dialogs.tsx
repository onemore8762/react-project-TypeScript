import React from 'react'
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

type DialogsItemsProps = {
    name: string
    id: number
}

type MessageType = {
    message: string
}

const DialogItems = (props: DialogsItemsProps) => {
    const {name, id} = props

    const path = '/dialogs/' + id
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={path}>{name}</NavLink>
        </div>
    )

}

const Message = (props: MessageType) => {
    const {message} = props
    return <div className={s.message}>{message}</div>

}

export const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItems name={'Dimych'} id={1}/>
                <DialogItems name={'Andrey'} id={2}/>
                <DialogItems name={'Sveta'} id={3}/>
                <DialogItems name={'Sasha'} id={4}/>
                <DialogItems name={'Viktor'} id={5}/>
                <DialogItems name={'Denis'} id={6}/>
                <DialogItems name={'Dimych'} id={7}/>

            </div>
            <div className={s.messages}>
                <Message message={'Hi'}/>
                <Message message={'How is your it-kamasutra?'}/>
                <Message message={'uoy'}/>
            </div>
        </div>
    )
}
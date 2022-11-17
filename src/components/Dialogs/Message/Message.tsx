import React from 'react'
import s from './../Dialogs.module.css'


type MessageType = {
    message: string
    id: string
}

export const Message = (props: MessageType) => {
    const {message} = props
    return <div className={s.message}>{message}</div>

}

import React from 'react'
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

type DialogsItemsProps = {
    name: string
    id: number
}

export const DialogItems = (props: DialogsItemsProps) => {
    const {name, id} = props

    const path = '/dialogs/' + id
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={path}>{name}</NavLink>
        </div>
    )

}

import React from 'react'
import s from './Dialogs.module.css'
import {DialogItems} from "./DialogItems/DialogItems";
import {Message} from "./Message/Message";
import {initialStateMessageType} from "../../redux/dialogs-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";


type DialogsPropsType = {
    sendMessage: (newMessageBody: string) => void
    dialogsPage: initialStateMessageType
}


export const Dialogs: React.FC<DialogsPropsType> = (
    {
        sendMessage,
        dialogsPage
    }
) => {

    const onSubmit = (FormData: DataFormType) => {
        sendMessage(FormData.newMessageBody)
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
                <AddMessageReduxForm onSubmit={onSubmit}/>
            </div>

        </div>
    )
}

type DataFormType = {
    newMessageBody: string
}

const AddMessageForm : React.FC<InjectedFormProps<DataFormType>> = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newMessageBody'} placeholder={'Введите текст'} component={'textarea'}></Field>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageReduxForm = reduxForm<DataFormType>({form: 'dialogAddMessageForm'})(AddMessageForm)
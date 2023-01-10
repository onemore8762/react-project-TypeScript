import React from 'react'
import s from './Dialogs.module.css'
import {DialogItems} from "./DialogItems/DialogItems";
import {Message} from "./Message/Message";
import {SendMessageAC} from "../../redux/dialogs-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLength, required} from "../../utils/validators/validators";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";


let maxLength50 = maxLength(50)

const Dialogs: React.FC = () => {
    const dialogsPage = useAppSelector(state => state.dialogsPage)

    const dispatch = useAppDispatch()

    const onSubmit = (FormData: DataFormType) => {
        dispatch(SendMessageAC(FormData.newMessageBody))
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
                <Field name={'newMessageBody'} placeholder={'Введите текст'} component={Textarea}
                        validate={[required, maxLength50]}></Field>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageReduxForm = reduxForm<DataFormType>({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs
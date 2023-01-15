import React from 'react'
import s from './Dialogs.module.css'
import {DialogItems} from "./DialogItems/DialogItems";
import {Message} from "./Message/Message";
import {SendMessageAC} from "../../redux/dialogs-reducer";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {selectDialogPage} from "../../common/selectors/selectors";
import {Form, Formik, FormikErrors} from "formik";
import {Button, Input} from "antd";


const Dialogs: React.FC = () => {
    const dialogs = useAppSelector(selectDialogPage.Dialogs)
    const message = useAppSelector(selectDialogPage.Message)
    const dispatch = useAppDispatch()

    const onSubmit = ({newMessage}: { newMessage: string }) => {
        dispatch(SendMessageAC(newMessage))
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
                <AddMessageForm onSubmitCallBack={onSubmit}/>
            </div>

        </div>
    )
}

type AddMessageFormType = {
    onSubmitCallBack: ({newMessage}: { newMessage: string }) => void
}

const AddMessageForm: React.FC<AddMessageFormType> = ({onSubmitCallBack}) => {
    return (
        <div>
            <Formik
                initialValues={{newMessage: ''}}
                validate={(values) => {
                    const errors: FormikErrors<{ newMessage: string }> = {}
                    if (values.newMessage.length > 50) {
                        errors.newMessage = `Max length is ${50} symbols`
                    }
                    return errors
                }}
                onSubmit={(values, formikHelpers) => {
                    onSubmitCallBack(values)
                    formikHelpers.setFieldValue('newMessage', '')
                }}
            >
                {({submitForm, setFieldValue, getFieldProps, errors, touched}) => (
                    <Form style={{display: 'flex', flexDirection: 'column'}}>
                        <div>
                            <Input value={getFieldProps('newMessage').value}
                                  onChange={(e) => setFieldValue('newMessage', e.currentTarget.value)}
                                  style={{width: 200, marginRight: 10}}
                                  placeholder={'Enter user'}
                        />
                            <Button onClick={submitForm}>
                                Find
                            </Button>
                        </div>
                        {errors.newMessage && touched.newMessage && <span style={{color:'red'}}> {errors.newMessage}</span>}
                    </Form>
                )}
            </Formik>
        </div>
    )
}


export default Dialogs
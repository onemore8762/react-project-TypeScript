import React from 'react';
import {login} from "../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import {Form, Formik} from "formik";
import {Button, Input} from "antd";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {useAppDispatch} from "../common/hooks/useAppDispatch";


export const Login = () => {
    const captchaUrl = useAppSelector(state => state.auth.captchaUrl)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch()
    if (isAuth) return <Navigate to={'/profile'}/>
    return (

        <Formik
            initialValues={{email: '', password: '', rememberMe: false, captcha: '', error: ''}}
            onSubmit={async (values, formikHelpers) => {
                const res = await dispatch(login(values.email, values.password, values.rememberMe, values.captcha))
                formikHelpers.setErrors({error: res})
            }}
        >
            {({submitForm, setFieldValue, getFieldProps, errors}) => (
                <Form style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 10
                }}>
                    <h1>Login</h1>
                    <Input value={getFieldProps('email').value}
                           placeholder={'Email'}
                           onChange={(e) => setFieldValue('email', e.currentTarget.value)}
                           style={{width: 200}}/>
                    <Input type={'password'}
                           value={getFieldProps('password').value}
                           placeholder={'Password'}
                           onChange={(e) => setFieldValue('password', e.currentTarget.value)}
                           style={{width: 200}}/>
                    <div>
                        Remember me
                        <Input type={'checkbox'}
                               value={getFieldProps('checkbox').value}
                               onChange={(e) => setFieldValue('checkbox', e.currentTarget.value)}
                               style={{width: 50}}/>
                    </div>
                    {errors.error && <div>{errors.error}</div>}

                    {captchaUrl && <>
                        <img src={captchaUrl} alt={'captcha'}/>
                        <Input value={getFieldProps('captcha').value}
                               placeholder={'captcha'}
                               onChange={(e) => setFieldValue('captcha', e.currentTarget.value)}
                               style={{width: 200}}
                        />
                    </>}
                    <Button onClick={submitForm} style={{width: 200}}>
                        Login
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

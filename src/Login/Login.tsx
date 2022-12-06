import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../components/common/FormsControls/FormsControls";
import {required} from "../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../redux/auth-reducer";
import {AppStateType} from "../redux/redux-store";
import {Redirect} from "react-router-dom";
import s from '../components/common/FormsControls/FormsControls.module.css'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={"Email"} name={'email'} component={Input}
                       validate={[required]}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={'password'} type={'password'} component={Input}
                       validate={[required]}/>
            </div>
            <div>
                <Field type={"checkbox"} name={'rememberMe'} component={'input'}/> remember me
            </div>
            {error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const Login = (props: any) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if(props.isAuth) return <Redirect to={'/profile'}/>
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

type mapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType) : mapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)
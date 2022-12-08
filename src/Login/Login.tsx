import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../components/common/FormsControls/FormsControls";
import {required} from "../utils/validators/validators";
import {connect} from "react-redux";
import {getCaptcha, login} from "../redux/auth-reducer";
import {AppStateType} from "../redux/redux-store";
import {Redirect} from "react-router-dom";
import s from '../components/common/FormsControls/FormsControls.module.css'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type PropsType = {
    captchaUrl: string
    getCaptcha: () => void
}


const LoginForm: React.FC<InjectedFormProps<FormDataType & PropsType> & PropsType> = ({handleSubmit, error, captchaUrl}) => {
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
            {error && <div className={s.formSummaryError}>{error}</div>}
            {captchaUrl && <>
                <img src={captchaUrl} alt={'captcha'}/>
                <div></div>
                <Field type={"text"} name={'captcha'} component={'input'}/>
            </>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType,any>({form: 'login'})(LoginForm)

const Login = (props: any) => {

    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if(props.isAuth) return <Redirect to={'/profile'}/>
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} getCaptcha={props.getCaptcha} />
        </div>
    );
};

type mapStateToPropsType = {
    isAuth: boolean,
    captchaUrl: string | null
}

const mapStateToProps = (state: AppStateType) : mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login, getCaptcha})(Login)
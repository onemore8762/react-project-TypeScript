import React, {useState} from "react";
import {Field, Form, Formik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {saveProfile} from "../../../redux/profile-reducer";
import {Contact} from "./ProfileInfo";


export const ProfileFormik = ({setEditMode}: any) => {
    const [error, setError] = useState('')
    const dispatch = useAppDispatch()
    const profile = useAppSelector(state => state.profilePage.profile)
    return <Formik
        initialValues={profile}
        onSubmit={(values, actions) => {
            actions.setSubmitting(true)
            dispatch(saveProfile(profile.userId, values))
                .then(() => {
                    setEditMode()
                })
                .catch((error) => {
                    setError(error)
                })
                .finally(() => {
                    actions.setSubmitting(false)
                })

        }}
    >{
        ({isSubmitting}) => {
            return <Form>
                <span style={{color: '#ff0000', backgroundColor: '#fff'}}>
                    {error && error}
                </span> <br/>
                <button type="submit" disabled={isSubmitting}>save</button>
                <div>
                    <b>Full name</b>:
                    <div>
                        <Field id="fullName" name="fullName" placeholder="Full name" /> {/*component={InputForm}*/}
                    </div>
                </div>
                <div>
                    <b>Looking for a job</b> :
                    <div>
                        <Field id="lookingForAJob" name="lookingForAJob" type={'checkbox'}/>
                    </div>
                </div>
                <div>
                    <b>My professional skills</b>:
                    <div>
                        <Field id="lookingForAJobDescription" name="lookingForAJobDescription" placeholder=""/>
                    </div>
                </div>
                <div>
                    <b>About me</b>:
                    <div>
                        <Field id="aboutMe" name="aboutMe" placeholder="About Me"/>
                    </div>
                </div>
                <div>
                    <b>Contacts</b>: {Object.keys(profile.contacts).map((key: string) => {
                    return <div key={key}>
                        <Contact key={key} contactTitle={key}></Contact>
                        <Field placeholder={key} id={key} name={'contacts.' + key}/>
                    </div>
                })}
                </div>
            </Form>
        }

    }

    </Formik>
}

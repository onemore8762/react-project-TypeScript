import React, {useState} from "react";
import {Form, Formik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {saveProfile} from "../../../redux/profile-reducer";
import {Button, Descriptions, Input} from "antd";


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
        ({isSubmitting, getFieldProps,setFieldValue, submitForm}) => {
            return <Form>
                <span style={{color: '#ff0000', backgroundColor: '#fff'}}>
                    {error && error}
                </span> <br/>
                <Button onClick={submitForm} disabled={isSubmitting}>save</Button>
                <Descriptions style={{backgroundColor: '#001529'}}
                              labelStyle={{color:'#ffffff', fontSize:'20px'}}
                              contentStyle={{color:'#ffffff', fontSize:'20px'}}>
                    <Descriptions.Item label="Full name" span={3} style={{color: '#ffffff'}}>
                        <Input id="fullName"
                               name="fullName"
                               placeholder="Full name"
                               value={getFieldProps('fullName').value}
                               onChange={(value) =>setFieldValue("fullName", value.target.value)}
                               style={{width: '300px'}}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="Looking for a job" span={3} style={{color: '#ffffff'}}>
                        <Input id="lookingForAJob"
                               name="lookingForAJob"
                               type={'checkbox'}
                               value={getFieldProps('lookingForAJob').value}
                               onChange={(value) =>setFieldValue("lookingForAJob", value.target.value)}
                               style={{width: '300px'}}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="My professional skills" span={3} style={{color: '#ffffff'}}>
                        <Input id="lookingForAJobDescription"
                               name="lookingForAJobDescription"
                               placeholder="Skills"
                               value={getFieldProps('lookingForAJobDescription').value}
                               onChange={(value) =>setFieldValue("lookingForAJobDescription", value.target.value)}
                               style={{width: '300px'}}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="About me" span={3} style={{color: '#ffffff'}}>
                        <Input id="aboutMe"
                               name="aboutMe"
                               placeholder="About Me"
                               value={getFieldProps('aboutMe').value}
                               onChange={(value) =>setFieldValue("aboutMe", value.target.value)}
                               style={{width: '300px'}}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item span={3} style={{color: '#ffffff'}}>
                        facebook:
                        <Input id="facebook"
                               name="facebook"
                               placeholder="Facebook"
                               value={getFieldProps('contacts.facebook').value}
                               onChange={(value) =>setFieldValue("contacts.facebook", value.target.value)}
                               style={{width: '300px'}}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item span={3} style={{color: '#ffffff'}}>
                        github:
                        <Input id="github "
                               name="github "
                               placeholder="github"
                               value={getFieldProps('contacts.github').value}
                               onChange={(value) =>setFieldValue("contacts.github ", value.target.value)}
                               style={{width: '300px'}}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item span={3} style={{color: '#ffffff'}}>
                        vk:
                        <Input id="vk"
                               name="vk"
                               placeholder="Vk"
                               value={getFieldProps('contacts.vk').value}
                               onChange={(value) =>setFieldValue("contacts.vk", value.target.value)}
                               style={{width: '300px'}}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item span={3} style={{color: '#ffffff'}}>
                        twitter:
                        <Input id="twitter "
                               name="twitter "
                               placeholder="Twitter"
                               value={getFieldProps('contacts.twitter').value}
                               onChange={(value) =>setFieldValue("contacts.twitter", value.target.value)}
                               style={{width: '300px'}}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item span={3} style={{color: '#ffffff'}}>
                        instagram:
                        <Input id="instagram"
                               name="instagram"
                               placeholder="Instagram "
                               value={getFieldProps('contacts.instagram').value}
                               onChange={(value) =>setFieldValue("contacts.instagram", value.target.value)}
                               style={{width: '300px'}}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item span={3} style={{color: '#ffffff'}}>
                        website:
                        <Input id="website"
                               name="website"
                               placeholder="Website "
                               value={getFieldProps('contacts.website').value}
                               onChange={(value) =>setFieldValue("contacts.website", value.target.value)}
                               style={{width: '300px'}}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item span={3} style={{color: '#ffffff'}}>
                        youtube:
                        <Input id="youtube"
                               name="youtube"
                               placeholder="Youtube"
                               value={getFieldProps('contacts.youtube').value}
                               onChange={(value) =>setFieldValue("contacts.youtube", value.target.value)}
                               style={{width: '300px'}}
                        />
                    </Descriptions.Item>
                </Descriptions>
            </Form>
        }

    }

    </Formik>
}

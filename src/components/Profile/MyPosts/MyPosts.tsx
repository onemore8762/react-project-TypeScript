import React from 'react';
import s from './MyPosts.module.css';
import {Posts} from "./Posts/Posts";

import TextArea from "antd/es/input/TextArea";
import {addPostAC} from "../../../redux/profile-reducer";
import {Form, Formik} from "formik";
import {Button} from "antd";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {selectProfile} from "../../../common/selectors/selectors";


type FormDataType = {
    newPostText: string,
}


export const MyPosts: React.FC<{ isOwner: boolean }> = React.memo(({isOwner}) => {
        const posts = useAppSelector(selectProfile.Posts)
        const dispatch = useAppDispatch()
        const profile = useAppSelector(selectProfile.Profile)


        const onSubmit = (FormData: FormDataType) => {
            dispatch(addPostAC(FormData.newPostText))
        }


        return (
            <div className={s.postsBlock}>
                <h2>{isOwner ? 'MyPosts' : `${profile.fullName} posts`}</h2>
                {isOwner && <Formik
                    initialValues={{newPostText: ''}}
                    onSubmit={(values, formikHelpers) => {
                        onSubmit(values)
                        formikHelpers.setFieldValue('newPostText', '')
                    }}
                >
                    {({setFieldValue, getFieldProps, submitForm}) => (
                        <Form>
                            <TextArea
                                value={getFieldProps('newPostText').value}
                                onChange={(e) => setFieldValue('newPostText', e.target.value)}
                                placeholder="Controlled autosize"
                                autoSize={{minRows: 3, maxRows: 5}}
                            />
                            <Button onClick={submitForm} style={{marginTop: 15}}>
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>

                }
                <div className={s.posts}>
                    {posts.map(el => {
                        return <Posts key={el.id} message={el.message} like={el.likesCount}/>
                    })}

                </div>
            </div>

        );
    }
)



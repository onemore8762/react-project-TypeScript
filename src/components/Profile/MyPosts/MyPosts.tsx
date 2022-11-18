import React from 'react';
import s from './MyPosts.module.css';
import {Posts} from "./Posts/Posts";
import {postType} from "../../../redux/profile-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLength, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";


type MyPostsType = {
    addPost: (post: string) => void
    posts: Array<postType>
}

type FormDataType = {
    newPostText: string
}

const maxLength10 = maxLength(10)

export const MyPosts: React.FC<MyPostsType> =
    ({
         addPost,
         posts
     }) => {

        const onSubmit = (FormData: FormDataType) => {
            addPost(FormData.newPostText)
        }
        return (
            <div className={s.postsBlock}>
                MyPosts
                <AddNewPostReduxForm onSubmit={onSubmit}/>
                <div className={s.posts}>
                    {posts.map(el => {
                        return <Posts key={el.id} message={el.message} like={el.likesCount}/>
                    })}

                </div>
            </div>

        );
    }



const AddNewPostForm : React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={'Введите пост'} name={'newPostText'} component={Textarea}
            validate={[required, maxLength10]}></Field>
        </div>
        <div>
            <button>Add</button>
        </div>
    </form>
}

const AddNewPostReduxForm = reduxForm<FormDataType>({form: 'Posts'})(AddNewPostForm)
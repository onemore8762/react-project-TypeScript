import React, {ChangeEvent, MouseEvent} from 'react';
import s from './MyPosts.module.css';
import {Posts} from "./Posts/Posts";
import {AddPostAC, CreateNewTextAC} from "../../../redux/profile-reducer";
import {ActionTypes, postType} from "../../../redux/store";
import {MyPosts} from "./MyPosts";

type MyPostsType = {
    store: any
}

export const MyPostsContainer : React.FC<MyPostsType> = ({store}) => {
    const state = store.getState()

    const addPostHandler = () => {
        store.dispatch(AddPostAC())
    }
    const onPostHandler = (value: string) => {
        store.dispatch(CreateNewTextAC(value))
    }

    return <MyPosts addPost={addPostHandler}
                    onChangeText={onPostHandler}
                    newPostText={state.profilePage.newText}
                    posts={state.profilePage.posts}/>

}
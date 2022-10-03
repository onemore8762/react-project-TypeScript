import React, {ChangeEvent, MouseEvent} from 'react';
import s from './MyPosts.module.css';
import {Posts} from "./Posts/Posts";
import {AddPostAC, CreateNewTextAC} from "../../../redux/profile-reducer";
import {ActionTypes, postType} from "../../../redux/store";

type MyPostsType = {
    addPost: () => void
    onChangeText: (value: string) => void
    posts: Array<postType>
    newPostText: string
}

export const MyPosts: React.FC<MyPostsType> =
    ({
         addPost,
         onChangeText,
         posts,
         newPostText
    }) => {

        const addPostHandler = () => {
            addPost()
        }
        const onPostHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
            onChangeText(e.currentTarget.value)
        }

        return (
            <div className={s.postsBlock}>
                MyPosts
                <div>
                    <div>
                        <textarea onChange={onPostHandler} value={newPostText}></textarea>
                    </div>

                    <div>
                        <button onClick={addPostHandler}>Add</button>
                    </div>
                </div>
                <div className={s.posts}>
                    {posts.map(el => {
                        return <Posts key={el.id} id={el.id} message={el.message} like={el.likesCount}/>
                    })}

                </div>
            </div>

        );
    }
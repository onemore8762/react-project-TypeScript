import React from 'react';
import s from './MyPosts.module.css';
import {Posts} from "./Posts/Posts";
import {MyPostsPropsType} from "../Profile";


export const MyPosts = (props: MyPostsPropsType) => {
    const {posts} = props
    return (
        <div className={s.postsBlock}>
            MyPosts
            <div>
                <div>
                    <textarea></textarea>
                </div>

                <div>
                    <button>Add</button>
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
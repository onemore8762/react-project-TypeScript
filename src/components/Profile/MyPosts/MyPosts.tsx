import React from 'react';
import s from './MyPosts.module.css';
import {Posts} from "./Posts/Posts";

export const MyPosts = () => {
    return(
        <div className={s.content}>
                MyPosts
            <div>
                <textarea></textarea>
                <button>Add</button>
            </div>
            <div className={s.posts}>
                <Posts message={"Hi, where are you?"} like={35}/>
                <Posts message={"I'am good"} like={25}/>
            </div>
        </div>

    );
}
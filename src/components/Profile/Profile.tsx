import React from 'react';
import s from './Profile.module.css';
import {MyPosts} from "./MyPosts/MyPosts";

export const Profile = () => {
    return(
        <div className={s.content}>
            <div>
                <img src="https://interier-foto.ru/wp-content/uploads/dlinnye-foto-4.jpg" />
            </div>
            <div>
                ava + description
            </div>

            <MyPosts />

        </div>

    );
}
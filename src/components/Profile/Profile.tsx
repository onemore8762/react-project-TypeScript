import React from 'react';
import s from './Profile.module.css';
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {postsType} from "../../App";

export type MyPostsPropsType = {
    posts: Array<postsType>
}
export const Profile = (props: MyPostsPropsType) => {
    const {posts} = props
    return (
        <>
            <ProfileInfo/>
            <MyPosts posts={posts}/>
        </>

    );
}
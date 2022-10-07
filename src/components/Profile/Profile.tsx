import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostContainer";


export const Profile = () => {

    return (
        <>
            <ProfileInfo/>
            <MyPostsContainer />
        </>

    );
}
import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostContainer";

type ProfileType ={
    profile: any
}

export const Profile = (props : ProfileType) => {

    return (
        <>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer />
        </>

    );
}
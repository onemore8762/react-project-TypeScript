import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostContainer";
import {profileType} from "./ProfileContainer";

type ProfileType ={
    profile: profileType | null
}

export const Profile = (props : ProfileType) => {

    return (
        <>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer />
        </>

    );
}
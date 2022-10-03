import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionTypes, postType, RootStateType} from "../../redux/store";
import {MyPostsContainer} from "./MyPosts/MyPostContainer";

type ProfileType={
    store: any
}

export const Profile = (props: ProfileType) => {

    return (
        <>
            <ProfileInfo/>
            <MyPostsContainer store={props.store}/>
        </>

    );
}
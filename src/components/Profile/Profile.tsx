import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostContainer";
import {ProfileType} from "../../redux/profile-reducer";

type ProfileTypeProps ={
    profile:  ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photoFile: any) => void
    saveProfile: (userId: string, FormData: any) => void

}

export const Profile = (props : ProfileTypeProps) => {

    return (
        <>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         isOwner={props.isOwner}
                         savePhoto={props.savePhoto}
                         saveProfile={props.saveProfile}
            />
            <MyPostsContainer />
        </>

    );
}
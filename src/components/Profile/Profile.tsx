import React, {useEffect} from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostContainer";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getStatus, getUserProfile, savePhoto, saveProfile, setStatus} from "../../redux/profile-reducer";
import {Navigate, useParams} from "react-router-dom";

const Profile = () => {
    const profile = useAppSelector(state => state.profilePage.profile)
    const status = useAppSelector(state => state.profilePage.status)
    const authorizedUserId = useAppSelector(state =>  state.auth.userId)
    const isAuth = useAppSelector(state =>  state.auth.isAuth)
    const dispatch = useAppDispatch()

    const updateStatusCallBack = (status: string) => {
        dispatch(setStatus(status))
    }
    const savePhotoCallBack = (photoFile: any) => {
        dispatch(savePhoto(photoFile))
    }
    const saveProfileCallBack = (userId: string, FormData: any) => {
        dispatch(saveProfile(userId, FormData))
    }
    const params = useParams()
    let userId = params.userId
    useEffect(() => {
        if (!userId) {
            userId = authorizedUserId?.toString()
        }
        if (userId) {
            dispatch(getUserProfile(userId))
            dispatch(getStatus(userId))
        }
    },[userId])

    if(!isAuth) return <Navigate to={'/login'}/>
    return (
        <>
            <ProfileInfo profile={profile}
                         status={status}
                         updateStatus={updateStatusCallBack}
                         isOwner={true}
                         savePhoto={savePhotoCallBack}
                         saveProfile={saveProfileCallBack}
            />
            <MyPostsContainer />
        </>

    );
}

export default Profile

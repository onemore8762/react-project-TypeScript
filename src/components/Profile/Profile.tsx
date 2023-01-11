import React, {useEffect} from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getStatus, getUserProfile, savePhoto, saveProfile, setStatus} from "../../redux/profile-reducer";
import {Navigate, useParams} from "react-router-dom";
import {selectIsAuth, selectProfile, selectStatusProfile, selectUserIdAuth} from "./selectors";
import {MyPosts} from "./MyPosts/MyPosts";


const Profile = () => {
    const profile = useAppSelector(selectProfile)
    const status = useAppSelector(selectStatusProfile)
    const authorizedUserId = useAppSelector(selectUserIdAuth)
    const isAuth = useAppSelector(selectIsAuth)

    const dispatch = useAppDispatch()
    const params = useParams()

    const updateStatusCallBack = (status: string) => {
        dispatch(setStatus(status))
    }
    const savePhotoCallBack = (photoFile: any) => {
        dispatch(savePhoto(photoFile))
    }
    const saveProfileCallBack = (userId: string, FormData: any) => {
        dispatch(saveProfile(userId, FormData))
    }

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
                         isOwner={!userId}
                         savePhoto={savePhotoCallBack}
                         saveProfile={saveProfileCallBack}
            />
            <MyPosts />
        </>

    );
}

export default Profile

import React, {useEffect} from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {useNavigate, useParams} from "react-router-dom";

import {MyPosts} from "./MyPosts/MyPosts";
import {Button} from "antd";
import {PreloaderCustom} from "../../common/PreloaderCustom/PreloaderCustom";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {selectAuth, selectProfile} from "../../common/selectors/selectors";

const Profile = () => {
    const profile = useAppSelector(selectProfile.Profile)
    const isLoading = useAppSelector(selectProfile.IsLoading)
    const status = useAppSelector(selectProfile.Status)
    const authorizedUserId = useAppSelector(selectAuth.UserId)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const params = useParams()

    const updateStatusCallBack = (status: string) => {
        dispatch(updateStatus(status))
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
    }, [userId])

    if (isLoading) return  <PreloaderCustom/>
    return (
        <div style={{position: 'relative'}}>
            {userId && <Button style={{position: 'absolute', zIndex: 2}} onClick={() => navigate('/profile')}>Back to my Profile</Button>}
            <ProfileInfo profile={profile}
                         status={status}
                         updateStatus={updateStatusCallBack}
                         isOwner={!userId}
                         savePhoto={savePhotoCallBack}
                         saveProfile={saveProfileCallBack}
            />
            <MyPosts isOwner={!userId}/>
        </div>

    );
}

export default Profile

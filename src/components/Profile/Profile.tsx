import React, {useEffect} from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {selectIsAuth, selectProfile, selectStatusProfile, selectUserIdAuth} from "./selectors";
import {MyPosts} from "./MyPosts/MyPosts";
import {Button} from "antd";
import {PreloaderCustom} from "../common/Preloader/PreloaderCustom";

const Profile = () => {
    const profile = useAppSelector(selectProfile)
    const isLoading = useAppSelector(state => state.profilePage.isLoading)
    const status = useAppSelector(selectStatusProfile)
    const authorizedUserId = useAppSelector(selectUserIdAuth)
    const isAuth = useAppSelector(selectIsAuth)
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

    if (!isAuth) return <Navigate to={'/login'}/>
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

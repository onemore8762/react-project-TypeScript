import React, {useEffect} from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostContainer";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {getStatus, getUserProfile, savePhoto, saveProfile, setStatus} from "../../redux/profile-reducer";


type PathParamsType = {
    userId: string | undefined
}

const Profile = (props : RouteComponentProps<PathParamsType>) => {
    const profile = useAppSelector(state => state.profilePage.profile)
    const status = useAppSelector(state => state.profilePage.status)
    const authorizedUserId = useAppSelector(state =>  state.auth.userId)

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
    let userId = props.match.params.userId
    useEffect(() => {
        if (!userId) {
            userId = authorizedUserId?.toString()
            if(!userId){
                props.history.push('/login')
            }
        }
        if (userId) {
            dispatch(getUserProfile(userId))
            dispatch(getStatus(userId))
        }
    },[userId])

    return (
        <>
            <ProfileInfo profile={profile}
                         status={status}
                         updateStatus={updateStatusCallBack}
                         isOwner={!props.match.params.userId}
                         savePhoto={savePhotoCallBack}
                         saveProfile={saveProfileCallBack}
            />
            <MyPostsContainer />
        </>

    );
}


export default withRouter(Profile)
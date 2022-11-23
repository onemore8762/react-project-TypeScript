import React from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader/Preloader";
import {profileType} from "../ProfileContainer";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";

type ProfileInfoType = {
    profile: profileType | null
    status: string
    updateStatus: (status: string) => void
}

export const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img src="https://interier-foto.ru/wp-content/uploads/dlinnye-foto-4.jpg" width={'950px'} alt='photo'/>
            </div>
            <h2>{props.profile.fullName}</h2>
            <div className={s.descriptionBlock}>
                <img src={props.profile?.photos.large} alt='userPhoto'/>
               {/* <div> {props.profile.aboutMe}</div>*/}
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    );
};

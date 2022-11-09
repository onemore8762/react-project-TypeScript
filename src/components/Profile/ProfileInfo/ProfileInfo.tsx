import React from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader/Preloader";
import {profileType} from "../ProfileContainer";
import {ProfileStatus} from './ProfileStatus'

type ProfileInfoType = {
    profile: profileType | null
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
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large} alt='userPhoto'/>
               {/* <div> {props.profile.aboutMe}</div>*/}
                <ProfileStatus title={'Hi is test'}/>
            </div>
        </div>
    );
};

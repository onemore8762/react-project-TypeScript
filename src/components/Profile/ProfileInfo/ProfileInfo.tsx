import React from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader/Preloader";


type ProfileInfoType ={
    profile: any
}

export const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.profile){
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img src="https://interier-foto.ru/wp-content/uploads/dlinnye-foto-4.jpg" width={'950px'}/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                <div> {props.profile.aboutMe}</div>
            </div>
        </div>
    );
};

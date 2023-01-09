import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import photoProfile from '../../../assets/images/user.png'
import {ProfileFormik} from "./ProfileDataForm";
import {ProfileType} from "../../../api/profile-api";

type ProfileInfoType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean;
    savePhoto: (photoFile: any) => void
    saveProfile: (userId: string, FormData: any) => void
}

export const ProfileInfo = (props: ProfileInfoType) => {

    const [editMode, setEditMode] = useState(false)
    if (!props.profile) {
        return <Preloader/>
    }

    const onchangePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.files?.length){
            props.savePhoto(e.currentTarget.files[0])
        }
    }

    return (
        <div>
            <div>
                <img src="https://interier-foto.ru/wp-content/uploads/dlinnye-foto-4.jpg" width={'950px'} alt='photo'/>
            </div>
            <h2>{props.profile.fullName}</h2>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || photoProfile} alt='userPhoto' height={'200px'}/>
                {props.isOwner && <input type={'file'} onChange={onchangePhoto}/>}
                {!editMode && <ProfileData profile={props.profile}
                                           setEditMode={() => setEditMode(true)}
                                           isOwner={props.isOwner}
                />
                }
                {editMode && <ProfileFormik profile={props.profile}
                                            setEditMode={() => setEditMode(false)}
                                           /* initialValues={props.profile}*/
                />
                }
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    );
};

type ContactType = {
    contactTitle: string
    contactValue?: string
}

export const Contact : React.FC<ContactType> = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}</b>: {contactValue}</div>
}

type ProfileDataType = {
    profile: ProfileType
    setEditMode: () => void
    isOwner: boolean
}

const ProfileData = (props: ProfileDataType) => {
    return <div>
        {props.isOwner && <button onClick={props.setEditMode}>edit</button>}
        <div>
            <b>Full name</b>: {props.profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b> : {props.profile.lookingForAJob? 'yes' : 'no'}
        </div>
        <div>
            <b>My professional skills</b>: {props.profile.lookingForAJobDescription}
        </div>
        <div>
            <b>About me</b>: {props.profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(props.profile.contacts).map((key: string)=> {
            return <Contact key={key} contactTitle={key} contactValue={(props.profile.contacts as any)[key]}></Contact>
        })}
        </div>
    </div>
}


import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css'
import {PreloaderCustom} from "../../common/Preloader/PreloaderCustom";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import {ProfileFormik} from "./ProfileDataForm";
import {ProfileType} from "../../../api/profile-api";
import {Avatar, Button, Descriptions, Dropdown, MenuProps} from "antd";
import {UserOutlined} from "@ant-design/icons";
import background from './../../../assets/images/background.jpg'

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
        return <PreloaderCustom/>
    }

    const onchangePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files?.length) {
            props.savePhoto(e.currentTarget.files[0])
        }
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <input type={'file'} onChange={onchangePhoto}/>
            ),
        },
    ];

    return (
        <div style={{position:'relative'}}>
            <img src={background} style={{ width: '100%', height: 225, borderRadius: 10}} alt={'background'}/>
            <div style={{backgroundColor: '#00101f', width: '100%', height: 125, marginTop: -5, borderBottomLeftRadius: 10,borderBottomRightRadius: 10, position: 'relative'}}>
                {props.isOwner && <Button onClick={()=> setEditMode(true)} style={{position: 'absolute', top: -15,right: 25}}>Edit Profile</Button>}
            </div>
                <div style={{position: 'absolute', top: '100px', display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap'}}>
                    {props.isOwner ?
                        <Dropdown menu={{items}}>
                            <Avatar size={240} src={props.profile.photos.large} icon={<UserOutlined />} style={{minWidth: 240}}/>
                        </Dropdown>
                        : <Avatar size={240} src={props.profile.photos.large} icon={<UserOutlined />}/>
                    }
                  <div>
                      <h2 style={{verticalAlign: 'center'}}>{props.profile.fullName}</h2>
                      {props.isOwner && <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>}
                      {!props.isOwner && props.status}
                  </div>
                </div>


            <div className={s.descriptionBlock} style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: '0 50px'}}>
                {!editMode && <ProfileData profile={props.profile}
                />
                }
                {editMode && <ProfileFormik profile={props.profile}
                                            setEditMode={() => setEditMode(false)}

                />
                }
            </div>
        </div>
    );
};

type ContactType = {
    contactTitle: string
    contactValue?: string
}

export const Contact: React.FC<ContactType> = ({contactTitle, contactValue}) => {
    return <Descriptions.Item label={contactTitle} span={3} style={{color: '#ffffff'}}>
        {contactTitle} : {contactValue}
    </Descriptions.Item>
}

type ProfileDataType = {
    profile: ProfileType
}

const ProfileData = (props: ProfileDataType) => {
    return <div >
        <Descriptions style={{backgroundColor: '#001529'}}
                      labelStyle={{color:'#ffffff', fontSize:'20px', fontWeight: '700'}}
                      contentStyle={{color:'#ffffff', fontSize:'20px'}}>
            <Descriptions.Item label="Full name" span={3} style={{color: '#ffffff'}}>
                {props.profile.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Looking for a job" span={3} style={{color: '#ffffff'}}>
                {props.profile.lookingForAJob ? 'yes' : 'no'}
            </Descriptions.Item>
            <Descriptions.Item label="My professional skills" span={3} style={{color: '#ffffff'}}>
                {props.profile.lookingForAJobDescription}
            </Descriptions.Item>
            <Descriptions.Item label="About me" span={3} style={{color: '#ffffff'}}>
                {props.profile.aboutMe}
            </Descriptions.Item>
            <Descriptions.Item label="Contacts" span={3} style={{color: '#ffffff'}}>
                facebook: {props.profile.contacts.facebook}
                <br/>
                github: {props.profile.contacts.github}
                <br/>
                vk: {props.profile.contacts.vk}
                <br/>
                twitter: {props.profile.contacts.twitter}
                <br/>
                instagram: {props.profile.contacts.instagram}
                <br/>
                website: {props.profile.contacts.website}
                <br/>
                youtube: {props.profile.contacts.youtube}
                <br/>
            </Descriptions.Item>
        </Descriptions>

    </div>
}


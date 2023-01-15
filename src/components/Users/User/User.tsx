import React from 'react';
import {NavLink} from "react-router-dom";
import {UserType} from "../../../api/users-api";
import {UserOutlined} from "@ant-design/icons";
import {Avatar, Button} from "antd";

type UserPropsType = {
    users: UserType[]
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    followingInProgress: Array<number>
}


export const User: React.FC<UserPropsType> = (props) => {

    const validateText = (name: string) => {
        if(name.length > 10){
            return name.slice(0, 10) + '...'
        }
        return name
    }

    return (
        <div style={{display: 'flex', flexWrap: "wrap", marginLeft:10, height: 752, overflowY: "auto"}}>
            {props.users.map(el => {
                return (
                    <div key={el.id} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 10, width:'140px'}}>
                        <NavLink to={'/profile/' + el.id}>
                            <Avatar size={128} src={el.photos.small} icon={<UserOutlined />}/>
                        </NavLink>
                        <h3>{validateText(el.name)}</h3>
                        {el.followed
                            ? <Button disabled={props.followingInProgress.some(id => id === el.id)} onClick={() => {
                                props.unFollow(el.id)
                            }}>unfollowed</Button>
                            : <Button disabled={props.followingInProgress.some(id => id === el.id)} onClick={() => {
                                props.follow(el.id)
                            }}>followed</Button>

                        }
                    </div>
                )
            })}
        </div>
    );
};

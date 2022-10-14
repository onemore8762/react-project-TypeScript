import React from 'react';

/*

import {initialStateType, UserType} from "../../redux/users-reducer";
import axios from "axios";
import userPhoto from '../../assets/images/user.png'

type UsersTypeProps = {
    usersPage: initialStateType
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
}

const Users = (props: UsersTypeProps) => {

    const getUsers = () => {
        if (props.usersPage.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(responce => {
                props.setUsers(responce.data.items)
            })

        }


    return (
        <div>
            <button onClick={getUsers}>getUsers</button>
            {props.usersPage.users.map(el => {
                return (
                    <div>
                        <img src={el.photos.small != null ? el.photos.small: userPhoto} style={{width: '100px'}}/>
                        <div>{el.name}</div>
                        <div>{'el.location.city'}</div>
                        <div>{'el.location.country'}</div>
                        {el.followed
                            ? <button onClick={() => props.unFollow(el.id)}>unfollowed</button>
                            : <button onClick={() => props.follow(el.id)}>followed</button>

                        }
                        <div>-------</div>
                    </div>
                )
            })}
        </div>
    );
};

export default Users;
*/

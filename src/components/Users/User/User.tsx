import React from 'react';
import userPhoto from "../../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import {UserType} from "../../../api/users-api";

type UserPropsType = {
    users: UserType[]
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    followingInProgress: Array<number>
    toggleIsFollowingProgress: (isLoading: boolean, userId: number) => void
}


export const User: React.FC<UserPropsType> = (props) => {

    return (
        <div>
            {props.users.map(el => {
                return (
                    <div key={el.id}>
                        <NavLink to={'/profile/' + el.id}>
                            <img src={el.photos.small != null ? el.photos.small : userPhoto} style={{width: '100px'}} alt={'photo-user'}/>
                        </NavLink>
                        <div>{el.name}</div>
                        <div>{'el.location.city'}</div>
                        <div>{'el.location.country'}</div>
                        {el.followed
                            ? <button disabled={props.followingInProgress.some(id => id === el.id)} onClick={() => {
                                props.unFollow(el.id)
                            }}>unfollowed</button>
                            : <button disabled={props.followingInProgress.some(id => id === el.id)} onClick={() => {
                                props.follow(el.id)
                            }}>followed</button>

                        }
                        <div>-------</div>
                    </div>
                )
            })}
        </div>
    );
};

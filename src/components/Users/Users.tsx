import React from 'react';
import s from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {followAPI, unFollowAPI} from "../../api/api";

type UsersPropsType = {
    users: UserType[]
    currentPage: number
    totalUsersCount: number
    onPageChanged: (page: number) => void
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    pageSize: number
    followingInProgress: Array<number>
    toggleIsFollowingProgress: (isLoading: boolean, userId: number) => void
}


export const Users: React.FC<UsersPropsType> = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = [1, props.currentPage - 1, props.currentPage, props.currentPage + 1, pagesCount]

    if (props.currentPage < 4) {
        pages = [1, 2, 3, 4, pagesCount]
    }
    if (props.currentPage > pagesCount - 2) {
        pages = [1, pagesCount - 3, pagesCount - 2, pagesCount - 1, pagesCount]
    }

    return (
        <div>
            <div>
                {pages.map(p => {

                    return <span className={props.currentPage == p ? s.selectedPage + ' ' + s.default : s.default}
                                 onClick={() => {
                                     props.onPageChanged(p)
                                 }}>{p}</span>
                })}
            </div>
            {props.users.map(el => {
                return (
                    <div>
                        <NavLink to={'/profile/' + el.id}>
                            <img src={el.photos.small != null ? el.photos.small : userPhoto} style={{width: '100px'}}/>
                        </NavLink>
                        <div>{el.name}</div>
                        <div>{'el.location.city'}</div>
                        <div>{'el.location.country'}</div>
                        {el.followed
                            ? <button disabled={props.followingInProgress.some(id => id === el.id)} onClick={() => {
                                props.toggleIsFollowingProgress(true, el.id)
                                unFollowAPI.unFollow(el.id)
                                    .then((data) => {
                                        if (data.resultCode === 0) {
                                            props.unFollow(el.id)
                                        }
                                        props.toggleIsFollowingProgress(false, el.id)
                                    })
                            }}>unfollowed</button>
                            : <button disabled={props.followingInProgress.some(id => id === el.id)} onClick={() => {
                                props.toggleIsFollowingProgress(true, el.id)
                                followAPI.follow(el.id)
                                    .then((data) => {
                                        if (data.resultCode === 0) {
                                            props.follow(el.id)
                                        }
                                        props.toggleIsFollowingProgress(false, el.id)
                                    })
                            }}>followed</button>

                        }
                        <div>-------</div>
                    </div>
                )
            })}
        </div>
    );
};

export default Users;
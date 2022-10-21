import React from 'react';
import s from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";

type UsersPropsType = {
    users: UserType[]
    currentPage: number
    totalUsersCount: number
    onPageChanged: (page: number) => void
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    pageSize: number
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

                    return <span className={props.currentPage == p ? s.selectedPage : ''}
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
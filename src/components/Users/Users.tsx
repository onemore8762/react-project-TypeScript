import React from 'react';
import {UserType} from "../../redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User/User";


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

    return (
        <div>
            <Paginator currentPage={props.currentPage}
                       pageSize={props.pageSize}
                       onPageChanged={props.onPageChanged}
                       totalItems={props.totalUsersCount}/>
            <User users={props.users}
                  follow={props.follow}
                  unFollow={props.unFollow}
                  followingInProgress={props.followingInProgress}
                  toggleIsFollowingProgress={props.toggleIsFollowingProgress}/>
        </div>
    );
};

export default Users;
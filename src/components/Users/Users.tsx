import React, {useEffect} from 'react';
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User/User";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import {follow, requestUsers, setCurrentPage, unFollow} from "../../redux/users-reducer";


export const Users: React.FC = () => {
    const users = useAppSelector(getUsers)
    const pageSize = useAppSelector(getPageSize)
    const totalUsersCount = useAppSelector(getTotalUsersCount)
    const currentPage = useAppSelector(getCurrentPage)
    const followingInProgress = useAppSelector(getFollowingInProgress)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize))
    }, [])


    const onPageChanged = (page: number) => {
        dispatch(setCurrentPage(page))
        if (page !== currentPage) {
            dispatch(requestUsers(page, pageSize))
        }
    }

    const followCallBack = (userID: number) => {
        dispatch(follow(userID))
    }
    const unFollowCallBack = (userID: number) => {
        dispatch(unFollow(userID))
    }
    return (
        <div>
            <Paginator currentPage={currentPage}
                       pageSize={pageSize}
                       onPageChanged={onPageChanged}
                       totalItems={totalUsersCount}/>
            <User users={users}
                  follow={followCallBack}
                  unFollow={unFollowCallBack}
                  followingInProgress={followingInProgress}/>
        </div>
    );
};

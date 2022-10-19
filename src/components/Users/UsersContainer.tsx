import React from 'react';
import {connect} from "react-redux";
import Users from './Users'
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {
    FollowAC,
    initialStateType,
    SetCurrentPageAC, SetTotalUsersCountAC,
    SetUsersAC,
    UnFollowAC,
    UserType,
} from "../../redux/users-reducer";

type mapStateToPropsType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
}

type mapDispatchToPropsType = {
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalCount: number) => void
}



const mapStateToProps = (state: AppStateType): mapStateToPropsType  => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}


const mapDispatchToProps = (dispatch: Dispatch) : mapDispatchToPropsType => {
    return {
        follow: (userID: number) => {
            dispatch(FollowAC(userID))
        },
        unFollow: (userID: number) => {
            dispatch(UnFollowAC(userID))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(SetUsersAC(users))
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(SetCurrentPageAC(currentPage))
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(SetTotalUsersCountAC(totalCount))
        }
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
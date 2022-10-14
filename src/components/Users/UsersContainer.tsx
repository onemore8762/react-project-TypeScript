import React from 'react';
import {connect} from "react-redux";
import Users from './Users'
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {FollowAC, initialStateType, SetUsersAC, UnFollowAC, UserType,} from "../../redux/users-reducer";

type mapStateToPropsType = {
    usersPage:initialStateType
}

type mapDispatchToPropsType = {
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
}



const mapStateToProps = (state: AppStateType): mapStateToPropsType  => {
    return {
        usersPage: state.users
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
        }
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
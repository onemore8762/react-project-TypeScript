import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";

import {
    FollowAC,
    SetCurrentPageAC, SetTotalUsersCountAC,
    SetUsersAC, toggleIsFetchingAC,
    UnFollowAC,
    UserType,
} from "../../redux/users-reducer";
import axios from "axios";
import Users from "./Users";
import {Preloader} from "../common/Preloader/Preloader";

type UsersTypeProps = {
    users: UserType[]
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching: (totalCount: boolean) => void
    isFetching: boolean
}
class UsersContainer extends React.Component<UsersTypeProps> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(responce => {
                this.props.setUsers(responce.data.items);
                this.props.setTotalUsersCount(responce.data.totalCount)
                this.props.toggleIsFetching(false)
            })
    }

    onPageChanged = (page: number) => {
        this.props.toggleIsFetching(true)
        if(page !== this.props.currentPage){
            this.props.setCurrentPage(page)
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
                .then(responce => {
                    this.props.setUsers(responce.data.items)
                    this.props.toggleIsFetching(false)
                })
        }

    }

    render(){

        return <>
            {this.props.isFetching
                ? <Preloader/>
                : <Users users={this.props.users}
                                           currentPage={this.props.currentPage}
                                           totalUsersCount={this.props.totalUsersCount}
                                           onPageChanged={this.onPageChanged}
                                           pageSize={this.props.pageSize}
                                           follow={this.props.follow}
                                           unFollow={this.props.unFollow}


            />
            }
        </>
    }
}


type mapStateToPropsType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}
/*

type mapDispatchToPropsType = {
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching: (totalCount: boolean) => void
}
*/



const mapStateToProps = (state: AppStateType): mapStateToPropsType  => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}


/*const mapDispatchToProps = (dispatch: Dispatch) : mapDispatchToPropsType => {
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
        },
        toggleIsFetching: (valueLoading: boolean) => {
            dispatch(toggleIsFetchingAC(valueLoading))
        },
    }
}*/

export default connect(mapStateToProps, {
    follow: FollowAC,
    unFollow: UnFollowAC,
    setUsers: SetUsersAC,
    setCurrentPage: SetCurrentPageAC,
    setTotalUsersCount: SetTotalUsersCountAC,
    toggleIsFetching: toggleIsFetchingAC
})(UsersContainer)
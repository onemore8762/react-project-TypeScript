import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {
    follow, requestUsers,
    setCurrentPage,
    toggleIsFetching,
    toggleIsFollowingProgress,
    unFollow,
} from "../../redux/users-reducer";
import Users from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import {UserType} from "../../api/users-api";

type UsersTypeProps = {
    users: UserType[]
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    setCurrentPage: (currentPage: number) => void
    toggleIsFetching: (totalCount: boolean) => void
    isFetching: boolean
    followingInProgress: Array<number>
    toggleIsFollowingProgress: (isLoading: boolean, userId: number) => void
    requestUsers: (currentPage: number, pageSize: number) => void
}

class UsersContainer extends React.Component<UsersTypeProps> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (page: number) => {
        this.props.setCurrentPage(page)
        if (page !== this.props.currentPage) {
            this.props.toggleIsFetching(true)
            this.props.requestUsers(page, this.props.pageSize)
        }
    }

    render() {

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
                         followingInProgress={this.props.followingInProgress}
                         toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}

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
    followingInProgress: Array<number>
}


const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow,
        unFollow,
        setCurrentPage,
        toggleIsFetching,
        toggleIsFollowingProgress,
        requestUsers
    }),
    withAuthRedirect
)(UsersContainer)
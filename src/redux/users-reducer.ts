import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT'
const SET_LOADING = 'SET-LOADING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}
export type initialStateType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean,
    followingInProgress: Array<number>
}

export type UserType = {
    id: number
    name: string
    uniqueUrlName: any
    photos: {
        small: any
        large: any
    }
    followed: boolean
    status: string
}


export const usersReducer = (state: initialStateType = initialState, action: UsersActionsType): initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(el => el.id === action.userID ? {...el, followed: true} : el)}
        case UNFOLLOW:
            return {...state, users: state.users.map(el => el.id === action.userID ? {...el, followed: false} : el)}
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_COUNT:
            return {...state, totalUsersCount: action.totalCount}
        case SET_LOADING:
            return {...state, isFetching: action.isLoading}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isLoading
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(t => t !== action.userId)
            }
        default:
            return state
    }

}

export type UsersActionsType = FollowACType
                            | UnFollowACType
                            | SetUsersACType
                            | SetCurrentPageACType
                            | SetTotalUsersCountACType
                            | toggleIsFetchingACType
                            | toggleIsFollowingProgressACType

type FollowACType = ReturnType<typeof followSuccess>
type UnFollowACType = ReturnType<typeof unFollowSuccess>
type SetUsersACType = ReturnType<typeof setUsersAC>
type SetCurrentPageACType = ReturnType<typeof setCurrentPage>
type SetTotalUsersCountACType = ReturnType<typeof setTotalUsersCount>
type toggleIsFetchingACType = ReturnType<typeof toggleIsFetching>
type toggleIsFollowingProgressACType = ReturnType<typeof toggleIsFollowingProgress>

export const followSuccess = (userID: number) => ({type: FOLLOW, userID} as const)
export const unFollowSuccess = (userID: number) => ({type: UNFOLLOW, userID} as const)
export const setUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users} as const)
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)
export const setTotalUsersCount = (totalCount: number) => ({type: SET_TOTAL_COUNT, totalCount} as const)
export const toggleIsFetching = (isLoading: boolean) => ({type: SET_LOADING, isLoading} as const)
export const toggleIsFollowingProgress = (isLoading: boolean, userId: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isLoading,
    userId
} as const)

export const requestUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch) => {
        return usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(setUsersAC(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
            dispatch(toggleIsFetching(false))
        })
    }
}

export const follow = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFollowingProgress(true, userId))
        return usersAPI.follow(userId).then((data) => {
            if (data.resultCode === 0) {
                dispatch(followSuccess(userId))
            }
            dispatch(toggleIsFollowingProgress(false, userId))
        })
    }
}

export const unFollow = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFollowingProgress(true, userId))

        return usersAPI.unFollow(userId).then((data) => {
            if (data.resultCode === 0) {
                dispatch(unFollowSuccess(userId))
            }
            dispatch(toggleIsFollowingProgress(false, userId))
        })
    }
}
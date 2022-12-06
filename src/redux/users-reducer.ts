import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

const FOLLOW = 'react-samurai-TS/users/FOLLOW'
const UNFOLLOW = 'react-samurai-TS/users/UNFOLLOW'
const SET_USERS = 'react-samurai-TS/users/SET-USERS'
const SET_CURRENT_PAGE = 'react-samurai-TS/users/SET-CURRENT-PAGE'
const SET_TOTAL_COUNT = 'react-samurai-TS/users/SET-TOTAL-COUNT'
const SET_LOADING = 'react-samurai-TS/users/SET-LOADING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'react-samurai-TS/users/TOGGLE_IS_FOLLOWING_PROGRESS'

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

export const requestUsers = (currentPage: number, pageSize: number) => async (dispatch: Dispatch) => {
    const data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(setUsersAC(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
    dispatch(toggleIsFetching(false))
}

export const follow = (userId: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFollowingProgress(true, userId))
    const data = await usersAPI.follow(userId)

    if (data.resultCode === 0) {
        dispatch(followSuccess(userId))
    }
    dispatch(toggleIsFollowingProgress(false, userId))
}

export const unFollow = (userId: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFollowingProgress(true, userId))

    const data = await usersAPI.unFollow(userId)

    if (data.resultCode === 0) {
        dispatch(unFollowSuccess(userId))
    }
    dispatch(toggleIsFollowingProgress(false, userId))
}
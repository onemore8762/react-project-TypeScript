import {usersAPI, UserType} from "../api/users-api";
import {AppThunk} from "./redux-store";

const initialState = {
    users: [] as UserType[],
    pageSize: 7,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
}
export type initialStateType = typeof initialState


export const usersReducer = (state = initialState, action: UsersActionsType): initialStateType => {
    switch (action.type) {
        case 'react-samurai-TS/users/FOLLOW':
            return {...state, users: state.users.map(el => el.id === action.userID ? {...el, followed: true} : el)}
        case 'react-samurai-TS/users/UNFOLLOW':
            return {...state, users: state.users.map(el => el.id === action.userID ? {...el, followed: false} : el)}
        case 'react-samurai-TS/users/SET-USERS':
            return {...state, users: action.users}
        case 'react-samurai-TS/users/SET-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage}
        case 'react-samurai-TS/users/SET-TOTAL-COUNT':
            return {...state, totalUsersCount: action.totalCount}
        case 'react-samurai-TS/users/SET-LOADING':
            return {...state, isFetching: action.isLoading}
        case 'react-samurai-TS/users/SET-FILTER':
            return {...state, filter: action.filter}
        case 'react-samurai-TS/users/SET-PAGE-SIZE':
            return {...state, pageSize: action.pageSize}
        case 'react-samurai-TS/users/TOGGLE_IS_FOLLOWING_PROGRESS':
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

export type UsersActionsType =
    ReturnType<typeof followSuccess>
    | ReturnType<typeof unFollowSuccess>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleIsFollowingProgress>
    | ReturnType<typeof setFilter>
    | ReturnType<typeof setPageSize>

export const followSuccess = (userID: number) => ({type: 'react-samurai-TS/users/FOLLOW', userID} as const)
export const unFollowSuccess = (userID: number) => ({type: 'react-samurai-TS/users/UNFOLLOW', userID} as const)
export const setUsersAC = (users: Array<UserType>) => ({type: 'react-samurai-TS/users/SET-USERS', users} as const)
export const setCurrentPage = (currentPage: number) => ({
    type: 'react-samurai-TS/users/SET-CURRENT-PAGE',
    currentPage
} as const)
export const setTotalUsersCount = (totalCount: number) => ({
    type: 'react-samurai-TS/users/SET-TOTAL-COUNT',
    totalCount
} as const)
export const toggleIsFetching = (isLoading: boolean) => ({
    type: 'react-samurai-TS/users/SET-LOADING',
    isLoading
} as const)
export const toggleIsFollowingProgress = (isLoading: boolean, userId: number) => ({
    type: 'react-samurai-TS/users/TOGGLE_IS_FOLLOWING_PROGRESS',
    isLoading,
    userId
} as const)
export const setFilter = (filter: FilterType) => ({
    type: 'react-samurai-TS/users/SET-FILTER',
    filter
} as const)
export const setPageSize = (pageSize: number) => ({
    type: 'react-samurai-TS/users/SET-PAGE-SIZE',
    pageSize
} as const)
export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType): AppThunk => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const data = await usersAPI.getUsers(currentPage, pageSize, filter)
    dispatch(setFilter(filter))
    dispatch(setUsersAC(data.items))
    dispatch(setCurrentPage(currentPage))
    dispatch(setPageSize(pageSize))
    dispatch(setTotalUsersCount(data.totalCount))
    dispatch(toggleIsFetching(false))
}

export const follow = (userId: number): AppThunk => async (dispatch) => {
    dispatch(toggleIsFollowingProgress(true, userId))
    const data = await usersAPI.follow(userId)

    if (data.resultCode === 0) {
        dispatch(followSuccess(userId))
    }
    dispatch(toggleIsFollowingProgress(false, userId))
}

export const unFollow = (userId: number): AppThunk => async (dispatch) => {
    dispatch(toggleIsFollowingProgress(true, userId))

    const data = await usersAPI.unFollow(userId)

    if (data.resultCode === 0) {
        dispatch(unFollowSuccess(userId))
    }
    dispatch(toggleIsFollowingProgress(false, userId))
}


export type FilterType = {
    term: string,
    friend: null | boolean
}
import {AppStateType} from "../../redux/redux-store";

export const selectAuth = {
    AuthIsAuth : (state: AppStateType) => state.auth.isAuth,
    UserId : (state: AppStateType) => state.auth.userId,
    Login : (state: AppStateType) => state.auth.login,
    CaptchaUrl : (state: AppStateType) => state.auth.captchaUrl,
    Email : (state: AppStateType) => state.auth.email,
}

export const selectProfile = {
    Photo: (state: AppStateType) => state.profilePage.myPhoto,
    IsLoading: (state: AppStateType) => state.profilePage.isLoading,
    Profile: (state: AppStateType) => state.profilePage.profile,
    Posts: (state: AppStateType) => state.profilePage.posts,
    Status: (state: AppStateType) => state.profilePage.status,

}
export const selectDialogPage = {
    Dialogs: (state: AppStateType) => state.dialogsPage.dialogs,
    Message: (state: AppStateType) => state.dialogsPage.message,
}

export const selectUsers = {
    Users: (state: AppStateType) => state.usersPage.users,
    PageSize: (state: AppStateType) => state.usersPage.pageSize,
    TotalUsersCount: (state: AppStateType) => state.usersPage.totalUsersCount,
    CurrentPage: (state: AppStateType) => state.usersPage.currentPage,
    IsFetching: (state: AppStateType) => state.usersPage.isFetching,
    FollowingInProgress: (state: AppStateType) => state.usersPage.followingInProgress,
    Filter: (state: AppStateType) => state.usersPage.filter,
}
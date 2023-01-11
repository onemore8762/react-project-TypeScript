import {AppStateType} from "../../redux/redux-store";

export const selectProfile = (state: AppStateType) => state.profilePage.profile
export const selectStatusProfile = (state: AppStateType) => state.profilePage.status
export const selectUserIdAuth = (state: AppStateType) => state.auth.userId
export const selectIsAuth = (state: AppStateType) => state.auth.isAuth
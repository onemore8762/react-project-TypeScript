import {combineReducers, legacy_createStore as createStore, applyMiddleware} from "redux";
import {ProfileActionType, profileReducer} from "./profile-reducer";
import {DialogsActionType, dialogsReducer} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";
import {UsersActionsType, usersReducer} from "./users-reducer";
import {authActionType, authReducer} from "./auth-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import {appReducer} from "./app-reducer";

declare const window: any;

export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebarPage: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

export type AllActionType  = ProfileActionType | DialogsActionType | UsersActionsType | authActionType

export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AllActionType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AllActionType>

export let store = createStore(rootReducer, applyMiddleware(thunk));

window.store = store

import {combineReducers, legacy_createStore as createStore, Store} from "redux";
import {ProfileActionType, profileReducer} from "./profile-reducer";
import {DialogsActionType, dialogsReducer} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";
import {UsersActionsType, usersReducer} from "./users-reducer";
import {authActionType, authReducer} from "./auth-reducer";

declare const window: any;

export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebarPage: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer
})

export type AllActionType  = ProfileActionType | DialogsActionType | UsersActionsType | authActionType

export type AppStateType = ReturnType<typeof rootReducer>


export let store = createStore(rootReducer);

window.store = store

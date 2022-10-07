import {combineReducers, legacy_createStore as createStore, Store} from "redux";
import {ProfileActionType, profileReducer} from "./profile-reducer";
import {DialogsActionType, dialogsReducer} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";
import {UsersActionsType, usersReducer} from "./users-reducer";


export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebarPage: sidebarReducer,
    users: usersReducer
})

export type AllActionType  = ProfileActionType | DialogsActionType | UsersActionsType

export type AppStateType = ReturnType<typeof rootReducer>


export let store = createStore(rootReducer);

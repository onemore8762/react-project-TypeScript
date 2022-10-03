import {combineReducers, legacy_createStore as createStore, Store} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";
import {ActionTypes} from "./store";
//combineReducers,legacy_createStore as

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebarPage: sidebarReducer,
})


type ReduxStoreType = ReturnType<typeof reducers>
export type RootStoreTypeRedux = Store<ReduxStoreType, ActionTypes>
export let store = createStore(reducers);



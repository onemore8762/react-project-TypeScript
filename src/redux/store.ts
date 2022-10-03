import {ProfileActionType, profileReducer} from "./profile-reducer";
import {
    DialogsActionType,
    dialogsReducer,
} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";

export type StoreType = {
    _state: RootStateType
    _callSubscriber: (state: RootStateType) => void
    getState: () => RootStateType
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionTypes) => void
}
export type RootStateType = {
    profilePage: ProfilePage
    dialogsPage: MessagePageType
    sidebarPage: {}
}
export type ProfilePage = {
    posts: Array<postType>
    newPostText: string
}
export type MessagePageType = {
    dialogs: Array<dialogType>
    message: Array<messageType>
    newMessageBody: string
}
export type dialogType = {
    id: number
    name: string
}
export type messageType = {
    id: number
    message: string
}
export type postType = {
    id: number
    message: string
    likesCount: number
}

export type ActionTypes = ProfileActionType | DialogsActionType




export const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 12},
                {id: 2, message: 'Yo', likesCount: 2},
                {id: 2, message: 'What you doing?', likesCount: 15},
            ],
            newPostText: ""
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Andrey'},
                {id: 3, name: 'Sveta'},
                {id: 4, name: 'Sasha'},
                {id: 5, name: 'Viktor'},
                {id: 6, name: 'Denis'},
                {id: 7, name: 'Valera'},
            ],
            message: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'Yo'},
                {id: 3, message: 'How is your it-kamasutra?'},
                {id: 4, message: 'uoy'},
                {id: 5, message: 'Yo'},
                {id: 6, message: 'Hello'},
                {id: 7, message: 'KIss'},
            ],
            newMessageBody: 'd'
        },
        sidebarPage: {}
    },
    _callSubscriber(state: RootStateType) {
        console.log('render...')
    },

    getState() {
        return this._state
    },
    subscribe(observer: () => void) {
        this._callSubscriber = observer
    },
    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        /*this._state.sidebar = sidebarReducer(this._state.sidebar, action)
*/
        this._callSubscriber(this._state)

    }
}
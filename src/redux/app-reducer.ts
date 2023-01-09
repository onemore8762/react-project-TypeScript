import {getAuthUserData} from "./auth-reducer";

let initialState = {
    initialized: false
}

type initialStateProfileType = typeof initialState

export const appReducer = (state: initialStateProfileType = initialState, action: setUserDataACType): initialStateProfileType => {
    switch (action.type) {
        case 'INITIALIZATION':
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export type setUserDataACType = ReturnType<typeof initializedSuccess>


export const initializedSuccess = () => ({type: 'INITIALIZATION'} as const)


export const initializedApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    promise.then(() => {
            dispatch(initializedSuccess())
    })
}

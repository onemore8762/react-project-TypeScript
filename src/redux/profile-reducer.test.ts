import {
    AddPostAC,
    deletePostAC,
    InitialStateProfileType,
    profileReducer,
} from "./profile-reducer";
import {postType, ProfileType} from "../api/profile-api";

let initialState: InitialStateProfileType;

beforeEach(() => {
    initialState = {
        posts: [
            {id: '321sx', message: 'Hi, how are you?', likesCount: 12},
            {id: '2131sxa', message: 'Yo', likesCount: 2},
            {id: '312123', message: 'What you doing?', likesCount: 15},
        ] as Array<postType>,
        profile: {} as ProfileType,
        status: ""
    }
})

test('new post should be add', () => {

    let action = AddPostAC('test_add')

    let newState = profileReducer(initialState, action)

    expect(newState.posts.length).toBe(4)
    expect(newState.posts[3].message).toBe('test_add')
})

test('after deleting length of messages should decrement', () => {

    let action = deletePostAC('312123')

    let newState = profileReducer(initialState, action)

    expect(newState.posts.length).toBe(2)
})
import {
    follow,
    followSuccess,
    initialStateType,
    toggleIsFollowingProgress,
    unFollow,
    unFollowSuccess,
    usersReducer
} from "./users-reducer";
import {usersAPI} from "../api/users-api";

jest.mock('../api/users-api')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const result = {
    resultCode: 0,
    messages: [],
    data: {}
}

let initialState: initialStateType
beforeEach(() => {
    initialState = {
        users: [
            {id: 0, name : 'Denis', followed: false, photos: {small: null, large: null}, status: 'test', uniqueUrlName: null},
            {id: 1, name : 'Denis1', followed: false, photos: {small: null, large: null}, status: '123', uniqueUrlName: null},
            {id: 2, name : 'Denis2', followed: true, photos: {small: null, large: null}, status: '5431', uniqueUrlName: null},
            {id: 3, name : 'Denis3', followed: true, photos: {small: null, large: null}, status: '333', uniqueUrlName: null}
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        filter: {
            term: '',
            friend: null
        }
    }

})

test('follow success', () => {

    const newState = usersReducer(initialState, followSuccess(1))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})
test('unfollow success', () => {

    const newState = usersReducer(initialState, followSuccess(3))
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeTruthy()
})

test('success follow thunk', async () => {
    userAPIMock.follow.mockReturnValue(Promise.resolve(result))
    const thunk = follow(1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1,toggleIsFollowingProgress(true, 1) )
    expect(dispatchMock).toHaveBeenNthCalledWith(2,followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3,toggleIsFollowingProgress(false, 1) )
})

test('success unfollow thunk', async () => {
    userAPIMock.unFollow.mockReturnValue(Promise.resolve(result))
    const thunk = unFollow(1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1,toggleIsFollowingProgress(true, 1) )
    expect(dispatchMock).toHaveBeenNthCalledWith(2,unFollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3,toggleIsFollowingProgress(false, 1) )
})
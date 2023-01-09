import {instance} from "./api";

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 5) {
        return instance.get<UsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },
    unFollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    }
}


type UsersType = {
    "items": UserType[],
    "totalCount": number,
    "error": string
}

export type UserType = {
    id: number
    name: string
    uniqueUrlName: string | null
    photos: {
        small: string | null
        large: string | null
    }
    followed: boolean
    status: string
}

import axios from "axios"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': '864bbc6e-9cc9-48c6-95b0-ec10fbf7e2fc'
    }
})

export const profileApi = {
    getProfile: (userId: number) => {
        return instance.get<ProfileType<photosType>>(`/profile/${userId}`).then(res => res.data)
    },
    getProfileStatus: (userId: number) => {
        return instance.get<string>(`/profile/status/${userId}`).then(res => res.data)
    },
    updateStatus: () => {
        return instance.get<ResponseType>(`/profile/status/`).then(res => res.data)
    },
    updateProfile: (newProfileInfo: ProfileType) => {
        return instance.put<ResponseType>('/profile', newProfileInfo).then(res => res.data)
    }
}

export const followApi = {
    followUser: (userId: number) => {
        return instance.post<ResponseType>(`/follow/${userId}`).then(res => res.data)
    },
    unFollowUser: (userId: number) => {
        return instance.delete<ResponseType>(`/follow/${userId}`).then(res => res.data)
    },
    isFollowUser: (userId: number) => {
        return instance.get<boolean>(`/profile/status/${userId}`).then(res => res.data)
    },
}

export const authApi = {
    me: () => {
        return instance.get<ResponseType<authMeDataType>>('/auth/me').then(res => res.data)
    },
    login: (requestLogin: RequestLoginType) => {
        return instance.post<ResponseType<{ userId: number }>>('/auth/login', {...requestLogin})
    },
    logOut: () => {
        return instance.delete<ResponseType>('/auth/login')
    }
}

export const usersApi = {
    getUsersList: (currentPage: number, pageSize?: number, friend?: boolean, term?: string) => {
        return instance.get<ResponseGetUsers>(`/users?page=${currentPage}&count=${pageSize}${friend ? `&friend=${friend}` : ''}${term ? `&term=${term}` : ''}`).then(res => res.data)
    },
    getSearchUserList: (term: string) => {
        return instance.get<ResponseGetUsers>(`users?term=${term}`).then(res => res.data)
    }
}


type RequestLoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}
export type ProfileType<T = {}>  = {
    aboutMe?: string
    userId?: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsType
    photos?: T
}
export type ResponseGetUsers = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export type UserType = {
    id: number
    name: string
    status: string
    photos: photosType
    followed: boolean
}

export type photosType = {
    small: string
    large: string
}
type contactsType = {
    github?: string
    vk?: string
    facebook?: string
    instagram?: string
    twitter?: string
    website?: string
    youtube?: string
    mainLink?: string
}
type authMeDataType = {
    id: number,
    login: string,
    email: string
}

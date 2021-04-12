import {InferValueTypes} from "../../App/store";
import {Dispatch} from "redux";
import {UserType, usersApi} from "../../Api/socialNetworkApi";
import {appAction} from "../../App/appReducer";

const initialState = {
    pageSize: 0,
    currentPage: 1,
    totalPagesCount: 0,
    totalCount: 0,

    userList: [] as Array<UserType>,

    filters: 'all' as FiltersUserType
}

const UsersReducer = (state: UsersStateType = initialState, action: ActionsType): UsersStateType => {
    switch (action.type) {
        case "USERS/SET-USERS": {
            return {
                ...state,
                userList: [...action.payload.userList]
            }
        }
        case "USERS/SET-LIST-SETTINGS": {
            return {
                ...state,
                totalCount: action.payload.totalCount,
                totalPagesCount: action.payload.totalPagesCount,
                pageSize: action.payload.pageSize
            }
        }
        case "USERS/SET-CURRENT-PAGE": {
            return {
                ...state,
                currentPage: action.payload
            }
        }
        case "USERS/SET-FILTERS": {
            return {
                ...state,
                filters: action.payload
            }
        }
        case "USERS/RESET-SETTINGS":{
            return {
                ...state,
                userList: [],
                pageSize: 0,
                currentPage: 1,
                totalPagesCount: 0,
                totalCount: 0,
            }

        }
        default:
            return state
    }
}

// ACTION
export const usersAction = {
    setUserList: (userList: Array<UserType>) => (
        {type: 'USERS/SET-USERS', payload: {userList}} as const),
    setListSettings: (totalCount: number, pageSize: number, totalPagesCount: number) => (
        {type: 'USERS/SET-LIST-SETTINGS', payload: {totalCount, pageSize, totalPagesCount}} as const),
    updateCurrentPage: (currentPage: number) => (
        {type: 'USERS/SET-CURRENT-PAGE', payload: currentPage} as const),
    setFilters: (value: FiltersUserType) => ({type: 'USERS/SET-FILTERS', payload: value} as const),
    resetSettings: () => ({type: 'USERS/RESET-SETTINGS'} as const),
}

//THUNKS
export const usersThunk = {
    getUserList: (currentPage: number, pageSize: number, friend?: boolean, term?: string) => async (dispatch: Dispatch) => {
        dispatch(appAction.setLoading(true))
        try {
            let res = await usersApi.getUsersList(currentPage, pageSize, friend, term)

            let pagesCount = Math.ceil(res.totalCount / pageSize)
            dispatch(usersAction.setListSettings(res.totalCount, pageSize, pagesCount))
            dispatch(usersAction.setUserList(res.items))
        } catch (err) {
            dispatch(appAction.setError(err))
        } finally {
            dispatch(appAction.setLoading(false))
        }
    },
    changePage: (currentPage: number) => async (dispatch: Dispatch) => {
        try {
            dispatch(appAction.setLoading(true))
            let res = await usersApi.getUsersList(currentPage)
            dispatch(usersAction.updateCurrentPage(currentPage))
            dispatch(usersAction.setUserList(res.items))
        } catch (err) {
            dispatch(appAction.setError(err))
        } finally {
            dispatch(appAction.setLoading(false))
        }
    },
    changeFilter: (value: FiltersUserType) => (dispatch: Dispatch) => {
        dispatch(usersAction.resetSettings())
        dispatch(usersAction.setFilters(value))
    }

}

//TYPES
type UsersStateType = typeof initialState
type ActionsType = ReturnType<InferValueTypes<typeof usersAction>>
export type FiltersUserType = 'all' | 'friends' | 'search'

export default UsersReducer
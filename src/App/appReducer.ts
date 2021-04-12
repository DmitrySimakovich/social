import {InferValueTypes} from "./store";
import {Dispatch} from "redux";
import {authApi} from "../Api/socialNetworkApi";

const initialState = {
    isAuth: false,
    userId: 0,

    isError: '',
    isLoading: false
}

const AppReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
    switch (action.type) {
        case "APP/SET-LOADING":
            return {...state, isLoading: action.payload}
        case "APP/SET-ERROR":
            return {...state, isError: action.payload}
        case "APP/SET-AUTH":
            return {...state, isAuth: action.payload.value, userId: action.payload.userId}
        default:
            return state
    }
}

// ACTION
export const appAction = {
    setLoading: (value: boolean) => ({type: 'APP/SET-LOADING', payload: value} as const),
    setError: (value: string) => ({type: 'APP/SET-ERROR', payload: value} as const),
    setAuthData: (userId: number, value: boolean) => ({type: 'APP/SET-AUTH', payload: {userId, value}} as const),
}
// THUNKS
export const appThunk = {
    isAuth: () => async (dispatch: Dispatch) => {
        dispatch(appAction.setLoading(true))
        try {
            let res = await authApi.me()
            if (res.resultCode === 0) {
                dispatch(appAction.setAuthData(res.data.id, true))
            }
        } catch (err) {
            dispatch(appAction.setError(err))
        } finally {
            dispatch(appAction.setLoading(false))
        }
    }
}
//TYPES

type AppStateType = typeof initialState
type ActionsType = ReturnType<InferValueTypes<typeof appAction>>

export default AppReducer
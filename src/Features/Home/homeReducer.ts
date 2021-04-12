import {InferValueTypes} from "../../App/store";
import {newsApi, ResponseNewsItem} from "../../Api/newsApi";
import {Dispatch} from "redux";
import {appAction} from "../../App/appReducer";

const initialState = {
    newsList: [] as Array<ResponseNewsItem>
}

const HomeReducer = (state: HomeStateType = initialState, action: ActionsType): HomeStateType => {
    switch (action.type) {
        case "HOME/SET-NEWS-LIST": {
            return {
                ...state,
                newsList: [...action.payload.map( el => el)]
            }
        }
        default:
            return state
    }
}

// ACTION
const HomeAction = {
    setNewsList: (newsList: Array<ResponseNewsItem>) => ({type: 'HOME/SET-NEWS-LIST', payload: newsList} as const)

}
//THUNKS
export const HomeThunk = {
    getNewsList: () => async (dispatch: Dispatch) => {
        dispatch(appAction.setLoading(true))
        try {
            let res = await newsApi.getNewsList()
            dispatch(HomeAction.setNewsList(res.articles))
        }
        catch (err) {
            dispatch(appAction.setError(err))
        }
        finally {
            dispatch(appAction.setLoading(false))
        }
    }
}
//TYPES

type HomeStateType = typeof initialState
type ActionsType = ReturnType<InferValueTypes<typeof HomeAction>>

export default HomeReducer
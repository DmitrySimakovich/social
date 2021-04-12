import {InferValueTypes} from "../../App/store";
import {Dispatch} from "redux";
import {photosType, profileApi, ProfileType} from "../../Api/socialNetworkApi";
import {appAction} from "../../App/appReducer";

const initialState = {} as ProfileType<photosType> & {status: string}

const ProfileReducer = (state: profileStateType = initialState, action: ActionsType): profileStateType => {
    switch (action.type) {
        case "PROFILE/SET-USER-PROFILE":
            return {...action.payload}
        default:
            return state
    }
}


// ACTION
export const profileAction = {
    setUserProfile: (userProfile: ProfileType<photosType>, status: string) => ({type: 'PROFILE/SET-USER-PROFILE', payload: {...userProfile, status}} as const)
}


//THUNKS
export const profileThunk = {
    getProfile: (userId: number) => async (dispatch: Dispatch) => {
        dispatch(appAction.setLoading(true))
        try {
            let result = await Promise.all([
                profileApi.getProfile(userId),
                profileApi.getProfileStatus(userId)
            ])
            dispatch(profileAction.setUserProfile(result[0], result[1]))
        }
        catch (err) {
            dispatch(appAction.setError(err))
        }
        finally {
            dispatch(appAction.setLoading(false))
        }
    },
    updateProfile: (profile: ProfileType) => async (dispatch: Dispatch) => {
        dispatch((appAction.setLoading(true)))
        try {
           await profileApi.updateProfile(profile)
        }
        catch (e) {
            dispatch(appAction.setError(e))
        }
        finally {
            dispatch(appAction.setLoading(false))
        }
    }
}


//TYPES
type profileStateType = typeof initialState
type ActionsType = ReturnType<InferValueTypes<typeof profileAction>>

export default ProfileReducer
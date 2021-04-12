import {applyMiddleware, combineReducers, createStore} from "redux";
import AppReducer from "./appReducer";
import ProfileReducer from "../Features/Profile/profileReducer";
import thunk from "redux-thunk";
import UsersReducer from "../Features/Users/usersReducer";
import HomeReducer from "../Features/Home/homeReducer";

const rootReducer = combineReducers({
    app: AppReducer,
    profile: ProfileReducer,
    usersList: UsersReducer,
    home: HomeReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type InferValueTypes<T> = T extends {[key: string]: infer U} ? U : never
export type RootStateType = ReturnType<typeof rootReducer>
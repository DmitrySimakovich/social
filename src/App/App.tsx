import React, {useEffect} from 'react';
import style from './App.module.css';
import {useDispatch, useSelector} from "react-redux";
import {appThunk} from "./appReducer";
import Profile from "../Features/Profile/profile";
import {NavLink, Route, Switch, useLocation} from "react-router-dom";
import UsersList from "../Features/Users/usersList";
import Home from '../Features/Home/home';
import {RootStateType} from "./store";
import Settings from "../Features/Setings/settings";


function App() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(appThunk.isAuth())
    }, [dispatch])
    const userId = useSelector<RootStateType, number>(state => state.app.userId)

    const location = useLocation()

    return (<>
            <div className={style.wrapMenu}>
                <div className={style.wrapFlex}>
                    <NavLink to={'/home'}>Home</NavLink>
                    <NavLink to={`/profile/:userId=${userId}`}>Profile</NavLink>
                    <NavLink to={'/users'}>Users</NavLink>
                    <NavLink to={'/settings'}>Settings</NavLink>
                </div>
            </div>
                <Switch location={location} key={location.pathname}>
                    <Route path={'/home'} render={() => <Home/>}/>
                    <Route path={'/profile/:userId?'} render={() => <Profile/>}/>
                    <Route path={'/users'} render={() => <UsersList/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                </Switch>
        </>
    );
}

export default App;

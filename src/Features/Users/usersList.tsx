import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FiltersUserType, usersThunk} from "./usersReducer";
import {RootStateType} from "../../App/store";
import {UserType} from "../../Api/socialNetworkApi";
import style from './usersList.module.css';
import {Spin} from "antd";
import ListItem from './listItem';
import SearchBox from "../SearchBox/searchBox";


const UsersList: FC = () => {

    const dispatch = useDispatch()

    const usersList = useSelector<RootStateType, Array<UserType>>(state => state.usersList.userList)
    const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)
    const activeFilter = useSelector<RootStateType, FiltersUserType>(state => state.usersList.filters)
    const currentPage = useSelector<RootStateType, number>(state => state.usersList.currentPage)
    const filter = useSelector<RootStateType, FiltersUserType>(state => state.usersList.filters)

    useEffect(() => {
        if (filter === 'all') {
            dispatch(usersThunk.getUserList(currentPage, 10))
        } else if (filter === 'friends') {
            dispatch(usersThunk.getUserList(currentPage, 10, true))
        }
    }, [dispatch, filter, currentPage])

    const searchUser = (term: string) => {
        dispatch(usersThunk.getUserList(currentPage, 10, undefined, term))
    }

    const isActive = (activeFilter: FiltersUserType, currentValue: FiltersUserType): boolean => {
        return activeFilter === currentValue
    }

    return <>
        {
            isLoading ?
                <Spin size='large'/> :
                <div className={style.container}>
                    <div className={style.toolbar}>
                        <div onClick={() => {
                            dispatch(usersThunk.changeFilter('all'))
                        }} className={`${style.filterItem} ${isActive(activeFilter, 'all') ? style.active : null}`}>Все
                        </div>

                        <div onClick={() => {
                            dispatch(usersThunk.changeFilter('friends'))
                        }}
                             className={`${style.filterItem} ${isActive(activeFilter, 'friends') ? style.active : null}`}>Друзья
                        </div>

                        <div onClick={() => {
                            dispatch(usersThunk.changeFilter('search'))
                        }}
                             className={`${style.filterItem} ${isActive(activeFilter, 'search') ? style.active : null}`}>Поиск
                            пользователя
                        </div>
                    </div>
                    <div className={style.wrapUserList}>
                        {
                            filter === 'search' ? <SearchBox submit={searchUser} /> : null
                        }
                        {
                            usersList.length !== 0 ? <ListItem usersList={usersList} filter={filter}/> : null
                        }
                    </div>
                </div>
        }
    </>


}
export default UsersList
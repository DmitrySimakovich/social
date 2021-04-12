import React, {FC} from 'react';
import {FiltersUserType, usersThunk} from "./usersReducer";
import style from "./usersList.module.css";
import {Pagination, Spin} from "antd";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../App/store";
import {UserType} from "../../Api/socialNetworkApi";
import UserItem from "./userItem";

type ownProps = {
    filter: FiltersUserType
    usersList: Array<UserType>
}
const ListItem: FC<ownProps> = ({usersList, filter}) => {

    const dispatch = useDispatch()
    const currentPage = useSelector<RootStateType, number>(state => state.usersList.currentPage)
    const totalPagesCount = useSelector<RootStateType, number>(state => state.usersList.totalPagesCount)
    const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)

    const changePageNumber = (pageNumber: number) => {
        dispatch(usersThunk.changePage(pageNumber))
    }

    return <div className={style.wrapList}>
        <div>
            {
                isLoading ?
                    <Spin size='large'/> :
                    usersList.map(user => {
                        return <UserItem key={user.id} user={user}/>
                        // <div key={user.id}>
                        //     <NavLink to={`/profile/:userId=${user.id}`}>
                        //         {user.name}
                        //     </NavLink>
                        // </div>
                    })
            }
        </div>
        <Pagination disabled={isLoading}
                    current={currentPage}
                    total={totalPagesCount}
                    onChange={changePageNumber}/>
    </div>
}
export default ListItem
import React, {FC} from 'react';
import style from './usersList.module.css';
import {UserType} from "../../Api/socialNetworkApi";
import {NavLink} from "react-router-dom";

type ownProps = {
    user: UserType
}

const UserItem: FC<ownProps> = ({user}) => {
    return (
        <div className={style.wrapUserItem}>
            <NavLink to={`/profile/:userId=${user.id}`}>
                {user.name}
            </NavLink>
            <button>
                {
                    user.followed ? 'Отписаться' : 'Подписаться'
                }
            </button>
        </div>
    )
}
export default UserItem
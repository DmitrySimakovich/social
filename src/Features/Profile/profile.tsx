import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../App/store";
import {photosType, ProfileType} from "../../Api/socialNetworkApi";
import {profileThunk} from "./profileReducer";
import {useParams} from 'react-router-dom';
import {Spin} from 'antd';
import PresentationalProfile from './PresentationalProfile';


const Profile: FC = () => {

    const dispatch = useDispatch()

    const {userId} = useParams<ParamTypes>()
    const id = Number(userId.split('=')[1])

    useEffect(() => {
        dispatch(profileThunk.getProfile(id))
    }, [dispatch, id])

    const profile = useSelector<RootStateType, ProfileType<photosType> & { status: string }>(state => state.profile)
    const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)

    return <>
        {
            isLoading ?
                <Spin size='large'/> :
                <PresentationalProfile profile={profile}/>
        }
    </>
}
// TYPES
type ParamTypes = {
    userId: string
}

export default Profile
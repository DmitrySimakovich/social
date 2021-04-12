import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {HomeThunk} from "./homeReducer";
import {RootStateType} from "../../App/store";
import {ResponseNewsItem} from "../../Api/newsApi";
import style from './home.module.css';
import {Spin} from "antd";

const Home: FC = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(HomeThunk.getNewsList())
    }, [dispatch])

    const newsList = useSelector<RootStateType, Array<ResponseNewsItem>>(state => state.home.newsList)
    const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)

    return <>
        {
            isLoading ?
                <Spin size='large'/> :
                newsList.map(news => {
                    return <div>
                        {news.author}
                        {news.source.name}
                        <img src={news.urlToImage} alt="" className={style.image}/>
                    </div>
                })
        }
    </>
}
export default Home
import axios from "axios"

const instance = axios.create({
    baseURL: 'https://newsapi.org/v2',
    headers: {
        'x-api-key': '6164c15dde464562b5bc5c8cd44e106b'
    }
})

export const newsApi = {
    getNewsList: () => {
        return instance.get<ResponseNewsListType>('/top-headlines?country=ru').then(res => res.data)
    }
}

export type ResponseNewsListType = {
    status: string
    totalResults: number
    articles: Array<ResponseNewsItem>
}
export type ResponseNewsItem = {
    source: {
        id: string | null
        name: string
    }
    author: string
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    content: string
}
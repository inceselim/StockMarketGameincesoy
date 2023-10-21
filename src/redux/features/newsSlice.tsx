import { createSlice, } from '@reduxjs/toolkit'
import { INews } from '../../interfaces/INews';

// stocksTrend: { aaTrend: true, ccaTrend: false, xahTrend: false },
const initialState: INews = {
    news: []
}

const newsSlice = createSlice({
    name: 'newsSlice',
    initialState,
    reducers: {
        newsAdd: (state, payload) => {
            console.log("news")
            console.log("news", payload.payload)
            console.log("news")
            if (state.news.length > 10) {
                state.news = []
            }
            switch (payload.payload) {
                case 0:
                    state.news = ["News0", ...state.news,]
                    break;
                case 1:
                    state.news = ["News1", ...state.news,]
                    break;
                case 2:
                    state.news = ["News2", ...state.news,]
                    break;
                case 3:
                    state.news = ["News3", ...state.news,]
                    break;
                case 4:
                    state.news = ["News4", ...state.news,]
                    break;
                case 5:
                    state.news = ["News5", ...state.news,]
                    break;
                case 6:
                    state.news = ["News6", ...state.news,]
                    break;
                case 7:
                    state.news = ["News7", ...state.news,]
                    break;
                default:
                    break;
            }
        },
        newsClear: (state) => {
            state.news = []
        },
    },
})

export const { newsAdd, newsClear } = newsSlice.actions

export default newsSlice.reducer
import { createSlice, } from '@reduxjs/toolkit'
import { IStocks } from '../../interfaces/IStocks';
import { IMarketTrend } from '../../interfaces/IMarketTrend';

// stocksTrend: { aaTrend: true, ccaTrend: false, xahTrend: false },
const initialState: IMarketTrend = {
    marketTrend: true,
}

const marketTrendSlice = createSlice({
    name: 'marketTrendSlice',
    initialState,
    reducers: {
        marketTrendChangeTrue: (state) => {
            state.marketTrend = true
        },
        marketTrendChangeFalse: (state) => {
            state.marketTrend = false
        },
    },
})

export const { marketTrendChangeTrue, marketTrendChangeFalse, } = marketTrendSlice.actions
export let selectMarketTrend = (state: any) => state.marketTrend

export default marketTrendSlice.reducer
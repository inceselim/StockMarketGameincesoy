import { createSlice, } from '@reduxjs/toolkit'
import { IStocks } from '../../constants/IStocks';
import { IMarketTrend } from '../../constants/IMarketTrend';

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
export let selectMarketTrend = (state: any) => initialState.marketTrend

export default marketTrendSlice.reducer
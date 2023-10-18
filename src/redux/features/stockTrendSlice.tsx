import { createSlice, } from '@reduxjs/toolkit'
import { IStocks } from '../../interfaces/IStocks';
import { IMarketTrend } from '../../interfaces/IMarketTrend';
import { IStockTrend } from '../../interfaces/IStockTrend';

// stocksTrend: { aaTrend: true, ccaTrend: false, xahTrend: false },
const initialState: IStockTrend = {
    aaTrend: true,
    ccaTrend: false,
    xahTrend: false
}

const stockTrendSlice = createSlice({
    name: 'marketTrendSlice',
    initialState,
    reducers: {
        stockTrendChange: (state, payload) => {
            state.aaTrend = !state.aaTrend
            state.ccaTrend = !state.ccaTrend
            state.xahTrend = !state.xahTrend
        },
        stockTrendChangeAATrue: (state) => {
            state.aaTrend = true
        },
        stockTrendChangeAAFalse: (state) => {
            state.aaTrend = false
        },
    },
})

export const {
    stockTrendChange,
    stockTrendChangeAATrue,
    stockTrendChangeAAFalse
} = stockTrendSlice.actions
export let selectStockTrend = (state: any) => initialState

export default stockTrendSlice.reducer
import { createSlice, } from '@reduxjs/toolkit'
import { IStocks } from '../../interfaces/IStocks';

// stocksTrend: { aaTrend: true, ccaTrend: false, xahTrend: false },
const initialState: IStocks = {
    aa: [22],
    cca: [12],
    xah: [12]
}

const stockSlice = createSlice({
    name: 'stockSlice',
    initialState,
    reducers: {
        aaTrendMarketTrend: (state) => {
            const aaLastValue: number = state.aa[state.aa.length - 1]
            const aaNewValue: number = aaLastValue + Number((Math.random() * 1.7).toFixed(2))

            state.aa = [...state.aa, aaNewValue]
        },
        aaTrend: (state) => {
            const aaLastValue: number = state.aa[state.aa.length - 1]
            const aaNewValue: number = aaLastValue + Number((Math.random() * 1.2).toFixed(2))

            state.aa = [...state.aa, aaNewValue]
        },
        aaTrendFalse: (state) => {
            const aaLastValue: number = state.aa[state.aa.length - 1]
            const aaNewValue: number = aaLastValue - Number((Math.random() * 1.2).toFixed(2))

            state.aa = [...state.aa, aaNewValue]
        },
        aaTrendMarketFalse: (state) => {
            const aaLastValue: number = state.aa[state.aa.length - 1]
            const aaNewValue: number = aaLastValue + Number((Math.random() * 1.6).toFixed(2))

            state.aa = [...state.aa, aaNewValue]
        },
    },
})

export const { aaTrend, aaTrendFalse, aaTrendMarketFalse, aaTrendMarketTrend } = stockSlice.actions
export let selectStocks = (state: any) => initialState
export let selectStocksAA = (state: any) => initialState.aa[initialState.aa.length - 1]

export default stockSlice.reducer
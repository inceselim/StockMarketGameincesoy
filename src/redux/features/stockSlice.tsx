import { createSlice, } from '@reduxjs/toolkit'
import { IStocks } from '../../interfaces/IStocks';

// stocksTrend: { aaTrend: true, ccaTrend: false, xahTrend: false },
const initialState: IStocks = {
    aa: [22],
    cca: [32],
    xah: [92]
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
            const aaNewValue: number = aaLastValue + Number((Math.random() * 1.1).toFixed(2))

            state.aa = [...state.aa, aaNewValue]
        },
        aaTrendFalse: (state) => {
            const aaLastValue: number = state.aa[state.aa.length - 1]
            if (aaLastValue < 3) {
                const aaNewValue: number = aaLastValue + Number((Math.random() * 2.2).toFixed(2))
                state.aa = [...state.aa, aaNewValue]
            }
            else {
                const aaNewValue: number = aaLastValue - Number((Math.random() * 1.2).toFixed(2))
                state.aa = [...state.aa, aaNewValue]
            }
        },
        aaTrendMarketFalse: (state) => {
            const aaLastValue: number = state.aa[state.aa.length - 1]
            if (aaLastValue < 3) {
                const aaNewValue: number = aaLastValue + Number((Math.random() * 2.5).toFixed(2))
                state.aa = [...state.aa, aaNewValue]
            }
            else {
                const aaNewValue: number = aaLastValue - Number((Math.random() * 1.5).toFixed(2))
                state.aa = [...state.aa, aaNewValue]
            }

        },
        ccaTrendMarketTrend: (state) => {
            const ccaLastValue: number = state.cca[state.cca.length - 1]
            const ccaNewValue: number = ccaLastValue + Number((Math.random() * 1.7).toFixed(2))

            state.cca = [...state.cca, ccaNewValue]
        },
        ccaTrend: (state) => {
            const ccaLastValue: number = state.cca[state.cca.length - 1]
            const ccaNewValue: number = ccaLastValue + Number((Math.random() * 1.1).toFixed(2))

            state.cca = [...state.cca, ccaNewValue]
        },
        ccaTrendFalse: (state) => {
            const ccaLastValue: number = state.cca[state.cca.length - 1]
            if (ccaLastValue < 10) {
                const ccaNewValue: number = ccaLastValue + Number((Math.random() * 2.2).toFixed(2))

                state.cca = [...state.cca, ccaNewValue]
            }
            else {
                const ccaNewValue: number = ccaLastValue - Number((Math.random() * 1.2).toFixed(2))

                state.cca = [...state.cca, ccaNewValue]
            }
        },
        ccaTrendMarketFalse: (state) => {
            const ccaLastValue: number = state.cca[state.cca.length - 1]
            if (ccaLastValue < 10) {
                const ccaNewValue: number = ccaLastValue + Number((Math.random() * 2.4).toFixed(2))

                state.cca = [...state.cca, ccaNewValue]
            }
            else {
                const ccaNewValue: number = ccaLastValue - Number((Math.random() * 1.5).toFixed(2))
                state.cca = [...state.cca, ccaNewValue]
            }

        },
        xahTrendMarketTrend: (state) => {
            const xahLastValue: number = state.xah[state.xah.length - 1]
            const xahNewValue: number = xahLastValue + Number((Math.random() * 1.7).toFixed(2))

            state.xah = [...state.xah, xahNewValue]
        },
        xahTrend: (state) => {
            const xahLastValue: number = state.xah[state.xah.length - 1]
            const xahNewValue: number = xahLastValue + Number((Math.random() * 1.2).toFixed(2))

            state.xah = [...state.xah, xahNewValue]
        },
        xahTrendFalse: (state) => {
            const xahLastValue: number = state.xah[state.xah.length - 1]
            if (xahLastValue < 10) {
                const xahNewValue: number = xahLastValue + Number((Math.random() * 2.9).toFixed(2))

                state.xah = [...state.xah, xahNewValue]
            }
            else {
                const xahNewValue: number = xahLastValue - Number((Math.random() * 1.2).toFixed(2))

                state.xah = [...state.xah, xahNewValue]
            }
        },
        xahTrendMarketFalse: (state) => {
            const xahLastValue: number = state.xah[state.xah.length - 1]
            if (xahLastValue < 20) {
                const xahNewValue: number = xahLastValue + Number((Math.random() * 2.9).toFixed(2))

                state.xah = [...state.xah, xahNewValue]
            }
            else {
                const xahNewValue: number = xahLastValue - Number((Math.random() * 1.4).toFixed(2))
                state.xah = [...state.xah, xahNewValue]
            }

        },
        aaValUpdate: (state, payload) => {
            console.log("aa type", payload.payload)
            console.log("aa type", payload.payload)
            console.log("aa type", typeof (payload.payload * 1))
            state.aa = [parseInt(payload.payload) * 1]
        },
        ccaValUpdate: (state, payload) => {
            state.cca = [parseInt(payload.payload) * 1]
        },
        xahValUpdate: (state, payload) => {
            state.xah = [parseInt(payload.payload) * 1]
        },
    },
})

export const {
    aaTrend,
    aaTrendFalse,
    aaTrendMarketFalse,
    aaTrendMarketTrend,
    ccaTrendMarketTrend,
    ccaTrend,
    ccaTrendFalse,
    ccaTrendMarketFalse,
    xahTrendMarketTrend,
    xahTrend,
    xahTrendFalse,
    xahTrendMarketFalse,
    aaValUpdate,
    ccaValUpdate,
    xahValUpdate
} = stockSlice.actions
export let selectStocks = (state: any) => initialState
export let selectStocksAA = (state: any) => initialState.aa[initialState.aa.length - 1]

export default stockSlice.reducer

import { createSlice, } from '@reduxjs/toolkit'
import { IStocksAmount } from '../../interfaces/IStocksAmount';

// stocksTrend: { aaTrend: true, ccaTrend: false, xahTrend: false },
const initialState: IStocksAmount = {
    aa: 0,
    cca: 0,
    xah: 0
}

const ShareOwnedSlice = createSlice({
    name: 'ShareOwnedSlice',
    initialState,
    reducers: {
        AddStockAmount: (state, { payload }: any) => {
            console.log("ShareOwnedSlice ADD",payload)
            switch (payload.key) {
                case "aa":
                    state.aa = state.aa + payload.amount
                    break;
                case "cca":
                    state.cca = state.cca + payload.amount
                    break;
                case "xah":
                    state.xah = state.xah + payload.amount
                    break;
                default:
                    break;
            }
            console.log(state)
        },
        SubstractStockAmount: (state, { payload }: any) => {
            console.log("ShareOwnedSlice SUBSTRACT",payload)
            switch (payload.key) {
                case "aa":
                    state.aa = state.aa - payload.amount
                    break;
                case "cca":
                    state.cca = state.cca - payload.amount
                    break;
                case "xah":
                    state.xah = state.xah - payload.amount
                    break;
                default:
                    break;
            }
        },
    },
})

export const { AddStockAmount, SubstractStockAmount } = ShareOwnedSlice.actions

export default ShareOwnedSlice.reducer
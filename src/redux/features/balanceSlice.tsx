import { createSlice, } from '@reduxjs/toolkit'
import { IBalance } from '../../interfaces/IBalance';

// stocksTrend: { aaTrend: true, ccaTrend: false, xahTrend: false },
const initialState: IBalance = {
    balance: 1000
}

const balanceSlice = createSlice({
    name: 'balanceSlice',
    initialState,
    reducers: {
        balanceAdd: (state, action: any) => {
            state.balance = state.balance + Number(action.payload)
        },
        balanceSubtract: (state: any, action: any,) => {
            state.balance = state.balance - Number(action.payload)
        },
    },
})

export const { balanceAdd, balanceSubtract } = balanceSlice.actions
export const selectBalance = (state: any) => state.balanceSlice.balance

export default balanceSlice.reducer
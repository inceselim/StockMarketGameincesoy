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
            console.log("BALANCE ADD")
            console.log("BALANCE BEFORE", state.balance)
            console.log("BALANCE")
            state.balance = state.balance + action.paylaod
            console.log("BALANCE AFTER: ", state.balance)
        },
        balanceSubtract: (state: any, action: any,) => {
            console.log("BALANCE SUBSTRACT", action)
            console.log("BALANCE SUBSTRACT", action.payload)
            console.log("BALANCE BEFORE", state.balance)
            console.log("BALANCE")
            state.balance = state.balance - action.payload
            console.log("BALANCE AFTER: ", state.balance)
        },
    },
})

export const { balanceAdd, balanceSubtract } = balanceSlice.actions
export const selectBalance = (state: any) => state.balanceSlice.balance

export default balanceSlice.reducer
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
        balanceChange: (state, { payload }: any) => {
            state.balance = state.balance + payload
        },
    },
})

export const { balanceChange } = balanceSlice.actions

export default balanceSlice.reducer
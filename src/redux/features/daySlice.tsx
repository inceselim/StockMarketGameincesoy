import { createSlice, } from '@reduxjs/toolkit'
import { IStocks } from '../../interfaces/IStocks';
import { IDay } from '../../interfaces/IDay';

// stocksTrend: { aaTrend: true, ccaTrend: false, xahTrend: false },
const initialState: IDay = {
    day: 0
}

const daySlice = createSlice({
    name: 'daySlice',
    initialState,
    reducers: {
        dayChange: (state) => {
            state.day = state.day + 1
        },
        dayUpdate: (state, payload) => {
            state.day = parseFloat(payload.payload)
        },
    },
})

export const { dayChange, dayUpdate } = daySlice.actions

export default daySlice.reducer
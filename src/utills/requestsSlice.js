import { createSlice } from "@reduxjs/toolkit";


const requetsSlice = createSlice({
    name: "requets",
    initialState: null,
    reducers: {
        addRequests: (state, action) => {
            return action.payload
        },
        removeRequest: (state, action) => {
            const newArray = state.filter((r) => r._id != action.payload);
            return newArray
        }

    }
})

export const { addRequests, removeRequest } = requetsSlice.actions
export default requetsSlice.reducer
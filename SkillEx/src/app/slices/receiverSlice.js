import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    receiverId: ''
}

const receiverSlice = createSlice({
    name: 'receiver',
    initialState,
    reducers: {
        setReceiver(state, action) {
            state.receiverId = action.payload;
        }
    }
});

export const { setReceiver } = receiverSlice.actions;

export const receiverReducer = receiverSlice.reducer;
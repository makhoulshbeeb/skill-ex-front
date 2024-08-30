import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    receiverId: '',
    displayName: '',
    username: '',
    email: '',
}

const receiverSlice = createSlice({
    name: 'receiver',
    initialState,
    reducers: {
        setReceiver(state, action) {
            state = action.payload;
        }
    }
});

export const { setReceiver } = receiverSlice.actions;

export const receiverReducer = receiverSlice.reducer;
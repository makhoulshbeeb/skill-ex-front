import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    _id: '',
    displayName: '',
    username: '',
    email: '',
    picture: '',
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
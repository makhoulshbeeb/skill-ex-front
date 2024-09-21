import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    _id: '',
    displayName: '',
    username: '',
    email: '',
    picture: '',
}

const videoReceiverSlice = createSlice({
    name: 'videoReceiver',
    initialState,
    reducers: {
        setVideoReceiver(state, action) {
            state = action.payload;
            return state;
        }
    }
});

export const { setVideoReceiver } = videoReceiverSlice.actions;

export const videoReceiverReducer = videoReceiverSlice.reducer;
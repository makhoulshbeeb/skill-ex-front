import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    _id: '',
    displayName: '',
    username: '',
    email: '',
    picture: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state = action.payload;
            return state;
        }
    }
});

export const { setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
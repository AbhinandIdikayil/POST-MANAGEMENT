import { createSlice } from "@reduxjs/toolkit";
import { IinitialState } from "../../types";
import { createPost, login, postsByOneUser, signup } from "../action/user_action";


const initialState: IinitialState = {
    user: null,
    posts: [],
    user_posts: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(signup.pending, (state) => {
            state.user = null

        })
        builder.addCase(signup.fulfilled, (state, { payload }) => {
            state.user = payload.data
        })
        builder.addCase(signup.rejected, (state) => {
            state.user = null
        })
        builder.addCase(login.pending, (state) => {
            state.user = null
        })
        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.user = payload.data
        })
        builder.addCase(login.rejected, (state) => {
            state.user = null
        })
        builder.addCase(createPost.pending, (state) => {

        })
        builder.addCase(createPost.fulfilled, (state, { payload }) => {
            state.posts = [...state.posts,payload.data]
        })
        builder.addCase(createPost.rejected, (state) => {
        })
        builder.addCase(postsByOneUser.pending, (state) => {
        })
        builder.addCase(postsByOneUser.fulfilled, (state,{payload}) => {
            state.user_posts = payload.data
        })
        builder.addCase(postsByOneUser.rejected, (state) => {
        })
    }
})

export default userSlice.reducer
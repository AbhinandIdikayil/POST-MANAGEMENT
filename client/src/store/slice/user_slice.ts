import { createSlice } from "@reduxjs/toolkit";
import { IinitialState } from "../../types";
import { createPost, deletePost, listAllPost, login, Logout, postsByOneUser, signup } from "../action/user_action";


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
            state.posts = [...state.posts, payload.data]
        })
        builder.addCase(createPost.rejected, (state) => {
        })
        builder.addCase(postsByOneUser.pending, (state) => {
        })
        builder.addCase(postsByOneUser.fulfilled, (state, { payload }) => {
            state.user_posts = payload.data
        })
        builder.addCase(postsByOneUser.rejected, (state) => {
            state.user_posts = []
        })
        builder.addCase(listAllPost.pending, (state) => {
        })
        builder.addCase(listAllPost.fulfilled, (state, { payload }) => {
            state.posts = payload.data
        })
        builder.addCase(listAllPost.rejected, (state) => {
            state.posts = []
        })
        builder.addCase(deletePost.pending, () => {
        })
        builder.addCase(deletePost.fulfilled, (state, { payload }) => {
            state.user_posts = state.user_posts?.filter(data => data._id !== payload)
        })
        builder.addCase(deletePost.rejected, (state) => {
            state.posts = []
        })
        builder.addCase(Logout.pending, (state) => {
        })
        builder.addCase(Logout.fulfilled, (state) => {
            state.posts = []
            state.user = null
            state.user_posts = []
        })
        builder.addCase(Logout.rejected, (state) => {
        })
    }
})

export default userSlice.reducer
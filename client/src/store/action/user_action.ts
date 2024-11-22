import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginUser, SignupUser } from "../../types";
import { AXIOS_INSTANCE } from "../../utils/axiosInstance";

export const login = createAsyncThunk(
    'user/login',
    async (req: LoginUser) => {
        try {
            const { data } = await AXIOS_INSTANCE.post('/login', { data: req });
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const signup = createAsyncThunk(
    'user/signup',
    async (req: SignupUser) => {
        try {
            const { data } = await AXIOS_INSTANCE.post('/signup', { data: req });
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const createPost = createAsyncThunk(
    'user/create-post',
    async () => {
        try {
            const { data } = await AXIOS_INSTANCE.post('/post');
            return data
        } catch (error) {
            console.log(error);
        }
    }
);

export const editPost = createAsyncThunk(
    'user/edit-post',
    async () => {
        try {
            const { data } = await AXIOS_INSTANCE.put('/post');
            return data
        } catch (error) {
            console.log(error);
        }
    }
);

export const deletePost = createAsyncThunk(
    'user/delete-post',
    async () => {
        try {
            const { data } = await AXIOS_INSTANCE.delete('/post');
            return data
        } catch (error) {
            console.log(error);
        }
    }
)


export const listAllPost = createAsyncThunk(
    'user/list-post',
    async () => {
        try {
            const { data } = await AXIOS_INSTANCE.get('/post');
            return data
        } catch (error) {
            console.log(error);
        }
    }
)
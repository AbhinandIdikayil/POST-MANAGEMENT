import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginUser, SignupUser } from "../../types";
import { AXIOS_INSTANCE } from "../../utils/axiosInstance";
import { AxiosError } from "axios";

export const login = createAsyncThunk(
    'user/login',
    async (req: LoginUser, { rejectWithValue }) => {
        try {
            const { data } = await AXIOS_INSTANCE.post('/login', { data: req });
            return data
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response)
                return rejectWithValue(error)
            }
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
    async (req: any) => {
        try {
            const { data } = await AXIOS_INSTANCE.post('/post', { data: req });
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
    async (id: string) => {
        try {
            const { data } = await AXIOS_INSTANCE.delete('/post', { data: { data: { id } } });
            console.log(data);
            return id
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



export const postsByOneUser = createAsyncThunk(
    'user/post-of-one-user',
    async (id: string) => {
        try {
            const { data } = await AXIOS_INSTANCE.get('/posts-by-user', { params: { id } });
            console.log(data)
            return data
        } catch (error) {
            console.log(error);
        }
    }
)

export const Logout = createAsyncThunk(
    'user/logout',
    async () => {
        try {
            const { data } = await AXIOS_INSTANCE.get('/logout');
            return data
        } catch (error) {
            console.log(error);
        }
    }
)
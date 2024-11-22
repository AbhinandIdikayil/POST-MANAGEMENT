

export type User = {
    _id: string
    username: string,
    email: string,
}
export type SignupUser = {
    username: string,
    email: string,
    password: string
}
export type LoginUser = {
    password: string
    email: string,
}
export type Post = {
    _id: string,
    title: string,
    description: string,
    image: string
}

export type PostT = {
    _id: string,
    title: string,
    description: string,
    image: string
    userId: {
        username: string,
        email: string,
        createdAt: string
    },
    createdAt: string
}


export interface IinitialState {
    user: User | null,
    posts: PostT[] | [],
    user_posts: Post[] | [],
    post: Post | null
}
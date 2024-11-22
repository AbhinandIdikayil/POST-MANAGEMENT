import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import { loginValidation } from "../../validation/loginValidation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"
import { login } from "../../store/action/user_action"
import { AxiosError } from "axios"

function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    type formData = z.infer<typeof loginValidation>
    const { register, handleSubmit, formState: { errors }, setError } = useForm<formData>({
        resolver: zodResolver(loginValidation),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data: formData) => {
        try {
            const res = await dispatch(login(data)).unwrap();
            console.log(res);
            navigate('/');
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.data.message.includes('User')) {
                    setError('email',{message:'User not found'})
                }
                if(error.response?.data.message.includes('Password')){
                    setError('password',{message:'incorrect password'});
                }
            }
            console.log(error)
        }
    }

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Login</h2>

                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit(onSubmit)()
                }}
                    className="mx-auto max-w-lg rounded-lg border"
                >
                    <div className="flex flex-col gap-4 p-4 md:p-8">
                        <div>
                            <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                                Email
                                {
                                    errors?.email?.message && (
                                        <span className="text-red-500"> ( {errors?.email?.message} )</span>
                                    )
                                }
                            </label>
                            <input
                                {...register('email')}
                                name="email"
                                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                                Password
                                {
                                    errors?.password?.message && (
                                        <span className="text-red-500"> ( {errors?.password?.message} )</span>
                                    )
                                }
                            </label>
                            <input
                                {...register('password')}
                                name="password"
                                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                            />
                        </div>

                        <button type="submit" className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">Log in</button>

                        <div className="relative flex items-center justify-center">
                            <span className="absolute inset-x-0 h-px bg-gray-300"></span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center bg-gray-100 p-4">
                        <p className="text-center text-sm text-gray-500">Don't have an account? <Link to={'/sign-up'} className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
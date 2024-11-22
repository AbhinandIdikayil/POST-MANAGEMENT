import { Link, useNavigate } from 'react-router-dom'
import { signupValidation } from '../../validation/signupValidation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { signup } from '../../store/action/user_action'
import { useEffect } from 'react'
function Signup() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector((state:RootState) => state.user);
    type formData = z.infer<typeof signupValidation>
    const { register, handleSubmit, formState: { errors } } = useForm<formData>({
        resolver: zodResolver(signupValidation),
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    })
    const onSubmit: SubmitHandler<formData> = async (data: formData) => {
        try {
            const res = await dispatch(signup(data));
            console.log(res);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(user.user){
            navigate('/')
        }
    }, [])

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Sign up</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-lg rounded-lg border">
                    <div className="flex flex-col gap-4 p-4 md:p-8">
                        <div>
                            <label
                                htmlFor="username"
                                className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                                Username
                                {
                                    errors?.username?.message && (
                                        <span className="text-red-500"> ( {errors?.username?.message} )</span>
                                    )
                                }
                            </label>
                            <input
                                {...register('username')}
                                type="text"
                                name="username"
                                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                            />
                        </div>
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
                                type="email"
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
                                type="password"
                                name="password"
                                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                            />
                        </div>

                        <button className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">Sign up</button>

                        <div className="relative flex items-center justify-center">
                            <span className="absolute inset-x-0 h-px bg-gray-300"></span>
                        </div>

                    </div>

                    <div className="flex items-center justify-center bg-gray-100 p-4">
                        <p className="text-center text-sm text-gray-500">have an account? <Link to={'/login'} className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
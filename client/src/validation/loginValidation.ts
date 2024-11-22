import { z } from 'zod'


export const loginValidation = z.object({
    email: z.string().nonempty({ message: 'Email is required' }).email({message:'Email is invalid'}),
    password: z.string().nonempty({ message: 'Passowrd is required' }),
})

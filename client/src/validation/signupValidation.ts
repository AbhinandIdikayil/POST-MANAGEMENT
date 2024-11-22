
import { z } from 'zod'


export const signupValidation = z.object({
    username: z.string().nonempty({message:'username is required'}),
    email: z.string().nonempty({message:'email is required'}).email(),
    password: z.string().nonempty({message:'password is required'})
})
import { z } from 'zod'

export const createPostValidation = z.object({
    title: z.string().nonempty({ message: 'Title is required' }).regex(/^[A-Za-z\s]+$/, { message: 'Title must contain only characters' }),
    description: z.string().nonempty({ message: 'Description is required' }).min(10, { message: 'Min 10 length' }),
    image: z.instanceof(File, { message: 'Image is required' }).refine((file) => ['image/jpeg', 'image/png', 'image/jpg', 'image/JPEG', 'image/webp'].includes(file.type), {
        message: 'Only image types are allowed',
    }),
})

export const editPostValidation = z.object({
    title: z.string().nonempty({ message: 'Title is required' }).regex(/^[A-Za-z\s]+$/, { message: 'Title must contain only characters' }),
    description: z.string().nonempty({ message: 'Description is required' }).min(10, { message: 'Min 10 length' }),
    image: z.string().optional(),
})
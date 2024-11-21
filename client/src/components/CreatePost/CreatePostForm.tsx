import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { createPostValidation } from "../../validation/createPostValidation";
import { z } from "zod";

function CreatePostForm() {

    type formData = z.infer<typeof createPostValidation>;
    const { register, handleSubmit, formState: { errors } } = useForm<formData>({
        resolver: zodResolver(createPostValidation),
        defaultValues: {
            title: '',
            description: '',
        }
    });

    const onSubmit: SubmitHandler<formData> = async (data: formData) => {

    };

    return (
        <>
            <h1 className="z-50  capitalize text-black label text-xl article-form">
                Create a post
            </h1>
            <div className="w-full max-md:w-5/6 h-2/3 bg-white px-4 py-3  rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full flex max-md:flex-col justify-between gap-2 pb-7">
                    <div className="w-full  max-md:w-full">
                        <div className="py-1">
                            <label className='label text-sm' htmlFor="">
                                Title
                                {
                                    errors?.title?.message && (
                                        <span className="text-red-500"> ( {errors?.title?.message} )</span>
                                    )
                                }
                            </label>
                            <input {...register('title')} type="text" id="email"
                                className="w-full placeholder:text-sm rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                                placeholder="Artcle title"
                            />
                        </div>
                        <div className="pb-1" >
                            <label className='label text-sm' htmlFor="">
                                Description
                                {
                                    errors?.description?.message && (
                                        <span className="text-red-500"> ( {errors?.description?.message} )</span>
                                    )
                                }
                            </label>
                            <input {...register('description')} type="text" id="email"
                                className="w-full rounded border placeholder:text-sm bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                                placeholder="Artcle description" />
                        </div>
                        <div className="">
                            <label className='label text-sm' htmlFor="">
                                Image

                                {
                                    errors?.image?.message && (
                                        <span className="text-red-500"> ( {errors.image.message} )</span>
                                    )
                                }
                            </label>
                            <input
                                // {...register('image')}
                                type="file"
                                // accept="image/jpeg, image/png, image/jpg"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const files = e.target.files;
                                    if (files && files.length > 0) {
                                        console.log(files[0])
                                        // setValue('image', files[0]); // Manually set the file
                                    } else {
                                        // setValue('image', ''); // Set to null if no file selected
                                    }
                                }}
                                id=""
                                className="text-sm w-full placeholder:text-sm "
                                placeholder=""
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreatePostForm
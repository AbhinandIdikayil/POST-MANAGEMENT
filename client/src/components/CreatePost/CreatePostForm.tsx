import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { createPostValidation } from "../../validation/createPostValidation";
import { z } from "zod";
import { LoaderIcon, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/action/user_action";
import { AppDispatch, RootState } from "../../store/store";
import { uploadToCloudinary } from "../../utils/imageUpload";

function CreatePostForm({closeModal,...propts}:{closeModal:() => void}) {
    console.log(propts,closeModal)
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user)
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    type formData = z.infer<typeof createPostValidation>;
    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, setValue } = useForm<formData>({
        resolver: zodResolver(createPostValidation),
        defaultValues: {
            title: '',
            description: '',
        }
    });


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const onSubmit: SubmitHandler<formData> = async (data: formData) => {
        try {
            const image = await uploadToCloudinary(data.image);
            const res = {
                userId: user.user?._id,
                ...data,
                image
            }
            const result = await dispatch(createPost(res)).unwrap();
            console.log(result);
            // if (closeModal) {
            //     closeModal()
            // }
            // console.log(closeModal)
            closeModal()

        } catch (error) {
            console.log(error)
        }
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
                                className="w-full placeholder:text-sm rounded border bg-gray-50 px-3 py-2 text-gray-800 text-base outline-none ring-indigo-300 transition duration-100 focus:ring"
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
                                className="w-full text-base rounded border placeholder:text-sm bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
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
                                type="file"
                                // accept="image/jpeg, image/png, image/jpg"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const files = e.target.files;
                                    if (files && files.length > 0) {
                                        console.log(files[0])
                                        setValue('image', files[0]); // Manually set the file
                                        handleImageChange(e)
                                    } else {
                                        // setValue('image', ''); // Set to null if no file selected
                                    }
                                }}
                                id=""
                                className="text-sm w-full placeholder:text-sm "
                                placeholder=""
                            />
                        </div>
                        <div className="">

                            {
                                imagePreview && (
                                    <div className='relative w-[150px] h-[108px]'>
                                        <X onClick={() => {
                                            setImagePreview('')
                                            reset({ 'image': undefined })
                                        }} className='absolute  bg-red-500 top-0 right-0' />
                                        <img src={imagePreview} className='w-full h-full ' />
                                    </div>
                                )
                            }

                        </div>
                        <div className="mt-6">
                            {
                                isSubmitting ? (
                                    <button className="button-4 max-md:h-10 w-1/2 flex items-center justify-center py-2" >
                                        <LoaderIcon className='animate-spin' width={35} height={20} />
                                    </button>
                                ) : (
                                    <button type="submit" disabled={isSubmitting} className="button-4 max-md:h-10  w-full py-2 bg-[#6366f1]"> post article</button>
                                )
                            }
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreatePostForm
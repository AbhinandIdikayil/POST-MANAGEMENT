import { useForm } from "react-hook-form"
import { z } from "zod"
import { editPostValidation } from "../../validation/createPostValidation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { useEffect, useState } from "react"
import { LoaderIcon, X } from "lucide-react"
import { uploadToCloudinary } from "../../utils/imageUpload"
import { editPost } from "../../store/action/user_action"

function EditPost({ closeModal }: { closeModal: () => void }) {
  const [image, setImage] = useState<any>()
  const dispatch = useDispatch<AppDispatch>()
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  type formSchema = z.infer<typeof editPostValidation>
  const user = useSelector((state: RootState) => state.user);
  const { register, handleSubmit,  setError, formState: { errors, isSubmitting } } = useForm<formSchema>({
    resolver: zodResolver(editPostValidation),
    defaultValues: {
      description: user?.post?.description,
      title: user?.post?.title,
      image:user?.post?.image,
    }
  });
  async function onSubmit(data: formSchema) {
    try {
      let img;
      let res;
      if (!image) {
        setError("root", {
          type: "manual",
          message: 'Image is required',
        });
        return
      }
      if (!data.image) {
        img = await uploadToCloudinary(image);
      }
      res = {
        ...data,
        image: img || data.image
      }
      console.log(res)
      await dispatch(editPost(res)).unwrap()
      closeModal()
    } catch (error) {
      console.log(error);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };


  useEffect(() => {
    if (user?.post?.image) {
      setImage(user?.post?.image);
      setImagePreview(user?.post?.image);
    }
  }, [])

  return (
    <>
      <h1 className="z-50  capitalize text-black label text-xl article-form">
        Edit a post
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
                  errors?.root?.message && (
                    <span className="text-red-500"> ( {errors?.root?.message} )</span>
                  )
                }
              </label>
              <input
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    const file = files[0];
                    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

                    // Check if the file type is valid
                    if (!allowedTypes.includes(file.type)) {
                      setError('root', { message: 'Invalid file type! Please upload a JPEG or PNG image.' }); // You can replace this with your error handling logic
                      return;
                    }
                    console.log(files[0])
                    setImage(files[0]);
                    handleImageChange(e)
                  } else {
                  }
                }}
                id=""
                className="text-sm w-full placeholder:text-sm "
                placeholder=""
              />
            </div>

            <div>
              {
                imagePreview && (
                  <div className='relative w-[150px] h-[108px]'>
                    <X onClick={() => {
                      setImagePreview('');
                      setImage(null)
                    }} className='absolute  bg-red-500 top-0 right-0' />
                    <img src={imagePreview} className='w-full h-full ' />
                  </div>
                )
              }
            </div>
            <div className="mt-6">
              {
                isSubmitting ? (
                  <button className="button-4 max-md:h-10 w-full flex items-center justify-center py-2" >
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

export default EditPost
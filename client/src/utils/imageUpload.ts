import axios from "axios"

export const uploadToCloudinary = async (imageFile: any ): Promise<string | null> => {
    const formData = new FormData()
    formData.append('file',imageFile)
    formData.append('upload_preset','post-management')
    try {
        const {data} = await axios.post('https://api.cloudinary.com/v1_1/dghv07eag/image/upload',formData,{withCredentials:false})
        console.log(data);
        return data.secure_url
    } catch (error) {
        console.log(error)
        return null
    }
}
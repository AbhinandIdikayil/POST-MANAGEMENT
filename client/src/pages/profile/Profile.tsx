import { useDispatch, useSelector } from "react-redux"
import EditPost from "../../components/EditPost/EditPost"
import { AppDispatch, RootState } from "../../store/store"
import { useEffect, useState } from "react"
import { deletePost, postsByOneUser } from "../../store/action/user_action"
import { editPost } from "../../store/slice/user_slice"
import { X } from "lucide-react"
import Confitmation from "../../components/Modal/Confitmation"


function Profile() {
    const user = useSelector((state: RootState) => state.user);
    const dispath = useDispatch<AppDispatch>();
    const [open, setOpen] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<boolean>(false);
    const [id, setId] = useState<string>('')

    async function fetch(id: string) {
        if (id) {
            await dispath(postsByOneUser(id)).unwrap()
        }
    }
    useEffect(() => {
        if (user?.user?._id) {
            fetch(user?.user?._id)
        }
    }, [])

    async function deleteById(id: string) {
        try {
            console.log(id)
            await dispath(deletePost(id)).unwrap()
        } catch (error) {
            console.log(error);
        }
    }

    function onEdit(id: string) {
        dispath(editPost(id));
        setOpen(true);
    }
    const closeModal = () => setOpen(false)
    // const openModal = () => setOpen(true)

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <Confitmation
                open={confirm}
                setOpen={setConfirm}
                text=" Are you sure you want to delete"
                cb={() => deleteById(id)}
            />
            {
                open && (
                    <>
                        <div
                            style={{ zIndex: 99 }}
                            className="fixed flex justify-center items-center top-0 left-0 z-50 w-full h-full bg-black bg-opacity-40"
                        >
                            <div
                                className={`'w-1/3'} relative flex-col max-md:w-5/6 rounded-md border border-solid border-gray-500 shadow-md bg-white px-4 py-2`}
                            >
                                <div className="flex justify-between absolute right-4 top-2">
                                    <X className="text-black" onClick={closeModal} />
                                </div>
                                <EditPost closeModal={closeModal} />
                            </div>
                        </div>
                    </>
                )
            }
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Your posts</h2>
                    {/* <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated.</p> */}
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
                    {
                        user?.user_posts?.map(data => (
                            <a key={data._id} className="group relative flex h-48 items-end justify-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-96">
                                <img src={`${data.image}`} loading="lazy" alt="Photo by Minh Pham" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
                                {/* auto=format&q=75&fit=crop&w=600 */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                                <span onClick={() => onEdit(data._id)} className="relative cursor-pointer mr-3 mb-3 inline-block rounded-lg border border-gray-500 px-2 py-1 text-xs text-gray-200 backdrop-blur md:px-3 md:text-sm">EDIT</span>
                                <span onClick={() => {
                                    setConfirm(true)
                                    setId(data._id)
                                }} className="absolute left-0 ml-3 mb-3 inline-block rounded-lg border border-red-500 px-2 py-1 text-xs text-red-500 backdrop-blur md:px-3 md:text-sm">DELETE</span>
                            </a>
                        ))
                    }
                </div>
            </div>
        </div >
    )
}

export default Profile
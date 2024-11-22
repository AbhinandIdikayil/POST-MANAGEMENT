import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { listAllPost } from "../../store/action/user_action";
import { dateToMmmmDdYy } from "../../utils/date";

function Home() {
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()
    async function fetchPosts() {
        try {
            await dispatch(listAllPost()).unwrap()
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchPosts();
    }, [])
    return (
        <>
            <div className="bg-white py-6 sm:py-8 lg:py-12">
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <div className="mb-10 md:mb-16">
                        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Posts</h2>

                        {/* <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated.</p> */}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">

                        {
                            user?.posts?.map(data => (
                                <div key={data._id} className="flex flex-col overflow-hidden rounded-lg border bg-white">
                                    <a className="group relative block h-40 overflow-hidden bg-gray-100 md:h-64">
                                        <img src={`${data.image}`} loading="lazy" alt="Photo by Minh Pham" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                                        {/* auto=format&q=75&fit=crop&w=600 */}
                                    </a>

                                    <div className="flex flex-1 flex-col p-4 sm:p-6 h-auto">
                                        <h2 className="mb-2 text-lg font-semibold text-gray-800">
                                            <a href="#" className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"> {data.title} </a>
                                        </h2>

                                        <p className="mb-8 text-gray-500 capitalize break-words">
                                            {
                                                data.description
                                            }
                                            {/* This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text. */}
                                        </p>

                                        <div className="mt-auto flex items-end justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                                                    <img src="https://cdn-icons-png.flaticon.com/512/3541/3541871.png" loading="lazy" alt="Photo by Brock Wegner" className="h-full w-full object-cover object-center" />
                                                </div>

                                                <div>
                                                    <span className="block text-indigo-500"> {data.userId.username} </span>
                                                    <span className="block text-sm text-gray-400"> {dateToMmmmDdYy(data.createdAt)} </span>
                                                </div>
                                            </div>

                                            {/* <span className="rounded border px-2 py-1 text-sm text-gray-500">Post</span> */}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }


                        <div className="flex flex-col overflow-hidden rounded-lg border bg-white">
                            <a href="#" className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64">
                                <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Lorenzo Herrera" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
                            </a>

                            <div className="flex flex-1 flex-col p-4 h-[150px]  sm:p-6">
                                <h2 className="mb-2 text-lg font-semibold text-gray-800">
                                    <a href="#" className="transition duration-100 hover:text-indigo-500 active:text-indigo-600">Working with legacy stacks</a>
                                </h2>

                                <p className="mb-1 text-gray-500">Timple also known as placeholder text. It shares some characteristics of a real written text.</p>

                                <div className="mt-auto flex items-end justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                                            <img

                                                // https://images.unsplash.com/photo-1586116104126-7b8e839d5b8c?auto=format&q=75&fit=crop&w=64
                                                src="https://cdn-icons-png.flaticon.com/512/3541/3541871.png" loading="lazy" alt="Photo by peter bucks" className="h-full w-full object-cover object-center"
                                            />
                                            
                                        </div>

                                        <div>
                                            <span className="block text-indigo-500">Jane Jackobs</span>
                                            <span className="block text-sm text-gray-400">April 07, 2021</span>
                                        </div>
                                    </div>

                                    <span className="rounded border px-2 py-1 text-sm text-gray-500">Article</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
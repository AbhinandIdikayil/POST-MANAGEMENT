import { User } from "lucide-react"
import CreatePostForm from "../CreatePost/CreatePostForm"
import { ModalHOC } from "../Modal/ModalHOC"
import { Link, useNavigate } from "react-router-dom"
import { Logout } from "../../store/action/user_action"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"

function Navbar() {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    function createPostButton({ onClick }: { onClick?: () => void }) {
        console.log(onclick)
        return (
            <button onClick={onClick} style={{ border: '1px solid rgba(27, 31, 35, 0.15) ' }}
                className="button border-[#24292E] border tracking-wide border-solid rounded flex justify-center items-center w-[120px] bg-[#FAFBFC] text-lg shadow-md cursor-pointer">
                create post
            </button>
        )
    }

    const Button = ModalHOC(createPostButton, CreatePostForm, 'h-[500px]', 'w-1/3');

    async function logout() {
        try {
            await dispatch(Logout()).unwrap();
            navigate('/login');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <nav className="w-full h-12 bg-[#6366f1] flex justify-center items-center">
            <main className="w-full flex justify-between items-center px-8 font-semibold text-xl capitalize">
                <section>
                    <Button />
                </section>
                <section className="flex items-center gap-3">
                    <Link to={'/profile'}>
                        <User className=" border-[#24292E] border-solid border bg-[#FAFBFC] rounded shadow-md cursor-pointer" />
                    </Link>
                    <button onClick={logout} className="bg-[#FAFBFC] cursor-pointer mr-3  inline-block rounded-lg border border-red-500 px-2 py-1 text-xs text-red-500 backdrop-blur md:px-3 md:text-sm">
                        Logout
                    </button>
                </section>
            </main>
        </nav>
    )
}

export default Navbar
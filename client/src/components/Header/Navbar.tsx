import { User } from "lucide-react"
import CreatePostForm from "../CreatePost/CreatePostForm"
import { ModalHOC } from "../Modal/ModalHOC"
import { Link } from "react-router-dom"

function Navbar() {


    function createPostButton({ onClick }: { onClick?: () => void }) {
        return (
            <button onClick={onClick} style={{ border: '1px solid rgba(27, 31, 35, 0.15) ' }}
                className="button border-[#24292E] border tracking-wide border-solid rounded flex justify-center items-center w-[120px] bg-[#FAFBFC] text-lg shadow-md cursor-pointer">
                create post
            </button>
        )
    }

    const Button = ModalHOC(createPostButton, CreatePostForm, 'h-[500px]', 'w-1/3')

    return (
        <nav className="w-full h-12 bg-[#6366f1] flex justify-center items-center">
            <main className="w-full flex justify-between items-center px-8 font-semibold text-xl capitalize">
                <section>
                    left
                </section>
                <section className="flex items-center gap-3">
                    <Link to={'/profile'}>
                        <User className=" border-[#24292E] border-solid border bg-[#FAFBFC] rounded shadow-md cursor-pointer" />
                    </Link>
                    <Button />
                </section>
            </main>
        </nav>
    )
}

export default Navbar
import React, { SetStateAction } from 'react'
import './Confirmation.css'


function Confitmation({ open, setOpen, cb, text }: {
    open: boolean,
    setOpen: React.Dispatch<SetStateAction<boolean>>,
    cb: (..._:any) => void,
    text: string
}) {

    return (
        <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] max-md:w-[300px] h-[200px] bg-gray-100 z-50 rounded-md shadow-md px-2 py-3
         ${open ? 'modal' : 'close'} `}>
            <h1 className=" px-2 text-center capitalize text-3xl font-semibold tracking-tight">
               {text}
            </h1>
            <div className="flex justify-center items-center h-4/6">
                <div>
                    {
                        open && (
                            <button onClick={() => {
                                setOpen(false);
                            }
                            } className="mr-2 capitalize px-4 py-2 rounded-md font-semibold text-white bg-green-500">
                                cancel
                            </button>
                        )
                    }

                    {
                        open && (
                            <button onClick={() => {
                                cb();
                                setOpen(false);
                            }} className="ml-2 capitalize px-4  py-2 rounded-md font-semibold text-white bg-red-500 ">
                                confirm
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Confitmation
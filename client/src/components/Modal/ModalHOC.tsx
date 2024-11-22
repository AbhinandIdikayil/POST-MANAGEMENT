import { X } from "lucide-react";
import { useState } from "react"

export function ModalHOC<
    P extends object,
    C extends object,
>(WrappedComponent: React.ComponentType<P>, ModalContent: React.ComponentType<C & { closeModal: () => void }>, height: string, width: string) {

    return function WithModal(props: P & C) {
        const [isOpen, setIsOpen] = useState<boolean>(false);

        const openModal = () => setIsOpen(true);
        const closeModal = () => setIsOpen(false);

        return (
            <>
                {/* Pass props to the WrappedComponent */}
                <WrappedComponent onClick={openModal} {...(props as P)} />
                {isOpen && (
                    <div
                        style={{ zIndex: 99 }}
                        className="fixed flex justify-center items-center top-0 left-0 z-50 w-full h-full bg-black bg-opacity-40"
                    >
                        <div
                            className={`${height} ${width || 'w-1/3'} relative flex-col max-md:w-5/6 rounded-md border border-solid border-gray-500 shadow-md bg-white px-4 py-2`}
                        >
                            <div className="flex justify-between absolute right-4 top-2">
                                <X className="text-black" onClick={closeModal} />
                            </div>
                            {/* Pass closeModal explicitly to ModalContent */}
                            <ModalContent closeModal={closeModal}  {...(props as C)} />
                        </div>
                    </div>
                )}
            </>
        );
    };
}


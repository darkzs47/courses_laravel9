import React from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useState, useEffect} from "react";
import {usePage} from '@inertiajs/react';
import messages from "@/messages";

const FlashMessageModal = () => {
    const { props } = usePage()
    const [isOpen, setIsOpen] = useState(false)
    const messageKey = props.flash

    const message = messageKey ? messages[messageKey] || messageKey : null;

    useEffect(() => {
        if (messageKey) setIsOpen(true)
    }, [messageKey])

    function closeModal() {
        setIsOpen(false)
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Уведомление
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">{message}</p>
                                </div>

                                <div className="mt-4 text-right">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                        onClick={closeModal}
                                    >
                                        Закрыть
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default React.memo(FlashMessageModal);

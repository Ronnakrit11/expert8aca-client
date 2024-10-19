import { Button, Modal } from 'flowbite-react'
import React from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

const DialogConfirm = ({
    openModal,
    title = "Are you sure you want to delete ?",
    okTitle = "Yes, I'm sure",
    cancelTitle = "No, cancel",
    onClose,
    onConfirm
}) => {
    return (
        <div>
            <Modal show={openModal} size="md" onClose={onClose} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            {title}
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="gray" onClick={onClose}>
                                {cancelTitle}
                            </Button>
                            <Button onClick={onConfirm}>
                                {okTitle}
                            </Button>

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DialogConfirm

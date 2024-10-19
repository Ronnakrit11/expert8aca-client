import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

interface IModalAddFolder {
    open: boolean;
    onClose: () => void;
    onAddFolder: (name: string) => void;
}
export const ModalAddFolder = ({ open, onClose, onAddFolder }: IModalAddFolder) => {
    const [folderName, setFolderName] = useState("new folder");

    return (
        <Modal show={open} onClose={onClose} size={"sm"}>
            <Modal.Header>Add Folder</Modal.Header>
            <div className="flex flex-col items-center">
                <div className="py-[20px] pb-10">
                    <div className="mb-2 block mt-2">
                        <Label htmlFor="small" value="Folder Name" />
                    </div>
                    <TextInput
                        className="min-w-[240px]"
                        value={folderName}
                        onChange={(event) => setFolderName(event.target.value)}
                        id="small"
                        type="text"
                        sizing="md"
                    />
                </div>
                <div className="mb-5">
                    <Button
                        className="min-w-[100px]"
                        color="success"
                        onClick={() => {
                            onAddFolder(folderName);
                        }}
                    >
                        Add
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

interface IModalEditFolder {
    open: boolean;
    onClose: () => void;
    onEditFolder: (name: string) => void;
    name: string;
}
export const ModalEditFolder = ({ open, onClose, onEditFolder, name }: IModalEditFolder) => {
    const [folderName, setFolderName] = useState(name);
    return (
        <Modal show={open} onClose={onClose} size={"sm"}>
            <Modal.Header>Edit</Modal.Header>
            <div className="flex flex-col items-center">
                <div className="py-[20px] pb-10">
                    <div className="mb-2 block mt-2">
                        <Label htmlFor="small" value="Name" />
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
                            onEditFolder(folderName);
                        }}
                    >
                        Update
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
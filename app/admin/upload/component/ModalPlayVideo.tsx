import { Modal } from "flowbite-react";
import { VideoStatus } from "../FileManager";
import CoursePlayer from "@/app/utils/CoursePlayer";

interface IModalPlayVideo {
    open: boolean;
    onClose: () => void;
    playbackId: string;
    assetId: string;
    status: string;
    refresh: () => void;
}
export const ModalPlayVideo = ({ open, onClose, playbackId, assetId, refresh, status }: IModalPlayVideo) => {
    return (
        <Modal show={open} onClose={onClose} size={"4xl"}>
            <Modal.Header>Play Video</Modal.Header>
            <Modal.Body className="p-1 overflow-hidden">
                {
                    (assetId && status === VideoStatus.READY) && <CoursePlayer videoUrl={playbackId} title="" /> 
                }
                {
                    status === VideoStatus.PREPARING && <p className="text-black font-bold text-center">Preparing video...</p>
                }
            </Modal.Body>
        </Modal>
    );
};

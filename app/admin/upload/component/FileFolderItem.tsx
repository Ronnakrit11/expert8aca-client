import { FcFolder, FcStart } from "react-icons/fc";

interface IFolderItem {
    name: string;
    onClick: () => void;
}

export const FolderItem = ({ name, onClick }: IFolderItem) => {
    return (
        <>
            <div onClick={onClick} className="flex items-center cursor-pointer">
                <FcFolder size={25} />
                <span className="pl-2"> {name}</span>
            </div>
        </>
    );
};

export const FileItem = ({ name, onClick }: IFolderItem) => {
    return (
        <>
            <div onClick={onClick} className="flex items-center cursor-pointer">
                <FcStart size={20} />
                <span className="pl-2">{name}</span>
            </div>
        </>
    );
};

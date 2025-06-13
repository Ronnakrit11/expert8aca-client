"use client";
import React, { use, useEffect, useState } from "react";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { HiOutlineExclamationCircle, HiShoppingCart } from "react-icons/hi";
import { FaFolderPlus } from "react-icons/fa6";
import { RiVideoUploadLine } from "react-icons/ri";
import { Modal } from "flowbite-react";
import { CiEdit, CiFolderOn, CiTrash } from "react-icons/ci";
import { MdCopyAll } from "react-icons/md";
import {
    useAddFileMutation,
    useAddFolderMutation,
    useDelFileMutation,
    useDeleteFolderMutation,
    useEditFileMutation,
    useEditFolderMutation,
    useGetAllFileAndFolderQuery,
    useGetFolderMutation,
} from "@/redux/features/file/fileApi";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { FcStart } from "react-icons/fc";
import { FcFolder } from "react-icons/fc";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Progress, Tooltip } from "flowbite-react";
import { deleteVideoStreamable } from "./serverAction/action";
import ModalUploadAWS from "./component/ModalUploadAWS";
import CoursePlayer from "@/app/utils/CoursePlayer";
import { S3_BUCKET, s3 } from "./aws.util";
import { ModalAddFolder } from "./component/ModalAddFolder";
import { ModalPlayVideo } from "./component/ModalPlayVideo";
import { TableListFiles } from "./component/TableListFiles";
import ModalUploadVimeo from "./component/ModalUploadVimeo";

const INTERVAL_CHECK_PREPARE_IN_SEC = 5;

const mockData = [];

interface INavigatorStack {
    id: string;
    name: string;
}

let interval: any = null;

export enum VideoStatus {
    PREPARING = "preparing",
    READY = "ready",
    FAILED = "failed",

}

const FileManager = () => {
    const {
        data: fileAndFolder,
        isLoading,
        isSuccess,
        error,
        refetch,
    } = useGetAllFileAndFolderQuery<any>(
        {},
        {
            refetchOnMountOrArgChange: true,
        }
    );

    const [addFolder] = useAddFolderMutation();
    const [deleteFolder] = useDeleteFolderMutation();
    const [getFolder, { isLoading: isLoadingGetFolder, }] = useGetFolderMutation();
    const [addFile] = useAddFileMutation();
    const [delFile] = useDelFileMutation();
    const [editFolder] = useEditFolderMutation();
    const [editFile] = useEditFileMutation();
    const [listFile, setListFile] = useState<any>(mockData);
    const [openModalAddFolder, setOpenModalAddFolder] = useState(false);
    const [usedProgress, setUsedProgress] = useState(0);
    const [usedState, setUsedState] = useState({
        used: 0,
        total: 0,
        percent: 0,
    });
    const [openModalUpload, setOpenModalUpload] = useState(false);
    const [navigatorStack, setNavigatorStack] = useState<INavigatorStack[]>([]);
    const [openModalPlayVideo, setOpenModalPlayVideo] = useState<any>({
        open: false,
        playbackId: "",
        assetId: "",
        status: "",
    });
    const [labelId, setLabelId] = useState("");

    useEffect(() => {
        pushNavigatorStack("root", "root");
    }, []);

    useEffect(() => {
        if (fileAndFolder) {
            const mergeAll = mergeAllFolderFile(
                fileAndFolder.folders,
                fileAndFolder.files
            );
            setListFile([...mergeAll]);
            setProgreesFormat(fileAndFolder.sizeUsedInGB, fileAndFolder.sizeLimitInGB);
            setLabelId(fileAndFolder.labelId);
        }
    }, [fileAndFolder, isSuccess, error, isLoading]);

    const setProgreesFormat = (used: number, total: number) => {
        const percent = (used / total) * 100;
        setUsedState({
            used: used,
            total: total,
            percent: +percent?.toFixed(2),
        })
    }

    useEffect(() => {
        if (interval) clearInterval(interval);

        interval = setInterval(() => {
            checkStatusFilePrepare()
        }, INTERVAL_CHECK_PREPARE_IN_SEC * 1000);

        return () => clearInterval(interval);
    }, [navigatorStack, listFile])

    const checkStatusFilePrepare = () => {
        const allFileList = listFile.filter((item) => item.type === 'file');
        const someFileIsPreparing = allFileList.some((item) => item.status === VideoStatus.PREPARING);
        if (someFileIsPreparing) {
            refreshCurrentFolder();
        } else {
            clearInterval(interval);
        }
    }

    const handleAddFolder = (name) => {
        const currentFolderId = getCurrentFolder().id;
        toast.promise(
            addFolder({
                name,
                parentId: currentFolderId === "root" ? null : currentFolderId,
                childFolders: [],
                childFiles: [],
            })
                .unwrap()
                .then((res) => {
                    handleGetFolder(currentFolderId);
                }),
            {
                loading: "Adding...",
                success: "Add success",
                error: "Add failed",
            }
        )
    };

    const handleDelFolder = (id) => {
        toast.promise(
            deleteFolder(id)
                .unwrap()
                .then((res) => {
                    refreshCurrentFolder();
                }),
            {
                loading: "Deleting...",
                success: "Delete success",
                error: "Delete failed",
            }
        )
    };

    const pushNavigatorStack = async (id, name) => {
        await handleGetFolder(id);
        setNavigatorStack((prev) => [...prev, { id, name }]);
    };

    const popNavigatorStack = async () => {
        const newStack = [...navigatorStack];
        newStack.pop();
        await handleGetFolder(getBackFolder()?.id || "root");
        setNavigatorStack(newStack);
    };

    const refreshCurrentFolder = () => {
        const currentFolderId = getCurrentFolder().id;
        handleGetFolder(currentFolderId);
    };

    const mergeAllFolderFile = (folders: any = [], files: any = []) => {
        const allFolder = folders.map((item) => ({ ...item, type: "folder" }));
        const allFile = files.map((item) => ({ ...item, type: "file" }));
        const mergeAll = [...allFolder, ...allFile];
        return mergeAll;
    };

    const handleGetFolder = async (id) => {
        if (id === "root") {
            await refetch()
                .unwrap()
                .then((res) => {
                    const mergeAll = mergeAllFolderFile(res.folders, res.files);
                    setListFile(mergeAll);
                });
            return
        }

        await getFolder(id)
            .unwrap()
            .then((result: any) => {
                const mergeAll = mergeAllFolderFile(
                    result.folder.childFolders,
                    result.folder.childFiles
                );
                setListFile(mergeAll);
                setProgreesFormat(result.sizeUsedInGB, result.sizeLimitInGB);
            });
    };

    const clickNavigatorStack = (id) => {
        const index = navigatorStack.findIndex((item) => item.id === id);
        const newStack = navigatorStack.slice(0, index + 1);
        setNavigatorStack(newStack);
        handleGetFolder(id);
    };

    const getCurrentFolder = () => {
        return navigatorStack[navigatorStack.length - 1];
    };

    const getBackFolder = () => {
        return navigatorStack[navigatorStack.length - 2];
    };

    const handleSaveFile = (file) => {
        toast.promise(
            addFile({
                ...file,
                parentId: getCurrentFolder().id === "root" ? null : getCurrentFolder().id,
            })
                .unwrap()
                .then((res) => {
                    refreshCurrentFolder();
                }),
            {
                loading: "Uploading...",
                success: "Upload success",
                error: (error) => (error.data.message || "Upload failed"),
            }
        );
    };

    const isNotRoot = getCurrentFolder()?.id !== "root";

    const onClickVideoPreview = (playbackId, assetId, status) => {
        setOpenModalPlayVideo({
            open: true,
            playbackId,
            assetId,
            status
        });
    };

    const handleDelFile = async (id, assetId, awsId) => {
        toast.promise(
            delFile(id)
                .unwrap()
                .then((res) => {
                    refreshCurrentFolder();

                    s3.deleteObject({
                        Bucket: S3_BUCKET,
                        Key: awsId,
                    }).promise();

                    if (assetId) {
                        deleteVideoStreamable(assetId)
                    }
                }),
            {
                loading: "Deleting...",
                success: "Delete success",
                error: "Delete failed",
            }
        );
    };

    const handleEditFolder = (id, name) => {
        toast.promise(
            editFolder({
                id,
                name,
            })
                .unwrap()
                .then((res) => {
                    refreshCurrentFolder();
                }),
            {
                loading: "Editing...",
                success: "Edit success",
                error: "Edit failed",
            }
        );
    }

    const handleEditFile = (id, name) => {
        toast.promise(editFile({
            id,
            name,
        })
            .unwrap()
            .then((res) => {
                refreshCurrentFolder();
            }), {
            loading: "Editing...",
            success: "Edit success",
            error: "Edit failed",
        });
    }

    return (
        <div>
            {openModalPlayVideo.open && (
                <ModalPlayVideo
                    open={openModalPlayVideo.open}
                    onClose={() =>
                        setOpenModalPlayVideo({
                            open: false,
                            playbackId: "",
                            assetId: "",
                            status: "",
                        })
                    }
                    assetId={openModalPlayVideo.assetId}
                    playbackId={openModalPlayVideo.playbackId}
                    status={openModalPlayVideo.status}
                    refresh={refreshCurrentFolder}
                />
            )}
            {openModalAddFolder && (
                <ModalAddFolder
                    onAddFolder={(name) => {
                        handleAddFolder(name);
                        setOpenModalAddFolder(false);
                    }}
                    open={openModalAddFolder}
                    onClose={() => setOpenModalAddFolder(false)}
                />
            )}
            <div className="flex justify-center">
                <div className="w-full max-w-[1000px]">
                    <div className="flex justify-between mb-6">
                        <Button color="light" onClick={() => setOpenModalAddFolder(true)}>
                            <FaFolderPlus className="mr-2 h-5 w-5" />
                            New Folder
                        </Button>
                        <Button
                            color="failure"
                            onClick={() => {
                                if ((usedState.percent >= 100)) {
                                    toast.error(`Storage limit exceeded. Limit is ${usedState.total} GB`);
                                    return;
                                }
                                setOpenModalUpload(true)
                            }}
                        >
                            <RiVideoUploadLine className="mr-2 h-5 w-5" />
                            Upload video
                        </Button>
                        {/* {
                            openModalUpload && <ModalUploadAWS
                                {...{
                                    isOpen: openModalUpload,
                                    onClose: () => setOpenModalUpload(false),
                                    handleSaveFile,
                                    labelId,
                                    usedState
                                }}
                            />
                        } */}
                        {
                            openModalUpload && <ModalUploadVimeo
                                {...{
                                    isOpen: openModalUpload,
                                    onClose: () => setOpenModalUpload(false),
                                    handleSaveFile,
                                    labelId,
                                    usedState
                                }}
                            />
                        }

                    </div>
                    <DataSizeUsed
                        usedState={usedState}
                    />
                    <NavigatorStack
                        navigatorStack={navigatorStack}
                        onClick={clickNavigatorStack}
                    />
                    <TableListFiles
                        {...({
                            listFile,
                            isNotRoot,
                            pushNavigatorStack,
                            popNavigatorStack,
                            handleDelFolder,
                            handleDelFile,
                            handleEditFolder,
                            handleEditFile,
                            onClickVideoPreview,
                        })}
                    />
                </div>
            </div>
        </div>
    );
};

const NavigatorStack = ({ navigatorStack, onClick }) => {
    return (
        <div className="flex gap-2">
            <Breadcrumb
                aria-label="Solid background breadcrumb example"
                className="mb-2"
            >
                {navigatorStack.map((item, idx) => {
                    const isLast = idx === navigatorStack.length - 1;
                    if (idx === 0)
                        return (
                            <Breadcrumb.Item
                                key={"stack-0"}
                                onClick={() => onClick(item.id)}
                                href="#"
                                icon={HiHome}
                            >
                                Home
                            </Breadcrumb.Item>
                        );

                    return (
                        <Breadcrumb.Item
                            key={'navigate-' + item.id}
                            href={isLast ? undefined : "#"}
                            onClick={() => !isLast && onClick(item.id)}
                            className={isLast ? "text-gray-100" : "text-indigo-500"}
                        >
                            {item.name}
                        </Breadcrumb.Item>
                    );
                })}
            </Breadcrumb>
        </div>
    );
};


const DataSizeUsed = ({ usedState }) => {
    return (
        <>
            <div className="bg-gray-100 dark:bg-gray-700 shadow block p-6 font-semibold rounded max-lg:mb-4 mb-7">
                <div className="flex gap-1 items-center">
                    <CiFolderOn size={30} /> <span>Quota</span>
                </div>
                <div className="w-full h-2 bg-indigo-200 rounded-full my-2" title="36%">
                    <Progress
                        progress={usedState.percent}
                        progressLabelPosition="inside"
                        textLabel=""
                        textLabelPosition="outside"
                        size="lg"
                    />
                </div>
                <div className="text-sm inline-block text-gray-500 dark:text-gray-100">
                    <span className="text-gray-700 dark:text-white font-bold">{usedState.used?.toFixed(2)} Gb</span>
                    /{usedState.total} Gb <span className="text-[10px] text-gray-400">({usedState.percent})%</span>
                </div>
            </div>
        </>
    );
};
export default FileManager;

"use client";

import { Button, Modal } from "flowbite-react";
import { useEffect, useMemo, useState } from "react";
import { Label, TextInput } from "flowbite-react";
import { Box } from "@mui/material";
import { deleteVideoStreamable, getAwsVideoId, uploadToStreamable } from "../serverAction/action";
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, REGION, S3_BUCKET, s3 } from "../aws.util";
import { useDropzone } from 'react-dropzone';
import { Progress } from "flowbite-react";
import toast from "react-hot-toast";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};


interface ModalUploadProps {
    isOpen: boolean;
    onClose: () => void;
    handleSaveFile: (data: any) => void;
    labelId: string;
    usedState: {
        used: number;
        total: number;
        percent: number;
    };

}

export default function ModalUploadAWS({
    isOpen,
    onClose,
    handleSaveFile,
    labelId,
    usedState,
}: ModalUploadProps) {
    const [file, setFile] = useState<any>(null);
    const [videoPlayback, setVideoPlaybackId] = useState("");
    const [isOpenUpload, setIsOpenUpload] = useState(true);
    const [assetId, setAssetId] = useState("");
    const [videoInfo, setVideoInfo] = useState({
        name: "",
        size: "",
        type: "",
    });
    const [processing, setProcessing] = useState(false);
    const [prepareUpload, setPrepareUpload] = useState<any>(null);
    const { acceptedFiles,
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject } = useDropzone({
            maxFiles: 1,
            accept: {
                'video/mp4': ['.mp4', '.MP4'],
              }
        });
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploaded, setIsUploaded] = useState(false);
    const [awsId, setAwsId] = useState("");
    const [stremableInfo, setStreamableInfo] = useState<{
        shortcode: string;
        title: string;
        streamable_url: string;
    }>({
        shortcode: "",
        title: "",
        streamable_url: "",
    });

    const resetState = () => {
        setIsOpenUpload(true);
        setVideoPlaybackId("");
        setFile(null);
        setVideoInfo({
            name: "",
            size: "",
            type: "",
        })
        setAssetId("");
        setPrepareUpload(null)
    }

    const handleClose = () => {
        resetState()
        s3.deleteObject({
            Bucket: S3_BUCKET,
            Key: awsId,
        }).promise();

        if (stremableInfo.shortcode) {
            deleteVideoStreamable(stremableInfo.shortcode)
        }

        setPrepareUpload(null)
        onClose()
    };
    const handleSave = () => {
        handleSaveFile({
            name: videoInfo.name,
            sizeInMB: videoInfo.size,
            format: videoInfo.type,
            assetId,
            playbackId: assetId || null,
            status: "preparing",
            awsId,
        });
        resetState()
        onClose()
    }

    useEffect(() => {
        const file = acceptedFiles[0]
        if (file) {
            const fileSizeInMB = file.size / (1024 * 1024);

            const name = file.name;
            const size = fileSizeInMB.toFixed(2); // Limit to two decimal places
            const type = file.type;
            // You can access other properties likelastModified
            setVideoInfo({
                name,
                size,
                type,
            });
            setFile(file);
            // uploadFile(file)
            uploadFileMultipart(file)
        }

    }, [acceptedFiles])

    const uploadFile = async (file: File) => {
        const currentAwsId = await getAwsVideoId();
        const params = {
            Bucket: S3_BUCKET,
            Key: currentAwsId,
            Body: file,
            ContentType: file.type,
        };

        const upload = s3
            .putObject(params)
            .on("httpUploadProgress", (evt: any, data) => {
                setUploadProgress(+(((+evt.loaded * 100) / evt.total)).toFixed(1))
            })
            .promise();

        await upload.then(async (err) => {
            setIsUploaded(true)
            setProcessing(true)
            await uploadToStreamable({
                awsId: currentAwsId,
                title: file.name,
                labelId: labelId,
            })
                .then((result) => {
                    setStreamableInfo(result)
                    setAssetId(result.shortcode)
                    return result
                })
                .catch((err) => {
                    toast.error("Error get Asset Id.")
                }).finally(() => {
                    setProcessing(false)
                })
        });

        setAwsId(currentAwsId)
    }

    const uploadFileMultipart = async (file) =>{

        const fileSizeInMB = file.size / (1024 * 1024);
        const fileSizeInGB = fileSizeInMB / 1024;
        const totalUnsed = usedState.used + fileSizeInGB;

        if (totalUnsed > usedState.total) {
            onClose()
            return toast.error("You are out of storage space.")
        }
        
        const currentAwsId = await getAwsVideoId();
        const target = { Bucket: S3_BUCKET, Key: currentAwsId, Body: file };
        const creds = { accessKeyId: AWS_ACCESS_KEY_ID as string, secretAccessKey: AWS_SECRET_ACCESS_KEY as string };
        try {
            const parallelUploadS3 = new Upload({
                client: new S3Client({ region: REGION, credentials: creds }),
                leavePartsOnError: false,
                params: target,
            });

            parallelUploadS3.on("httpUploadProgress", (progress: any) => {
                const percentage = Math.round((progress.loaded / progress.total) * 100).toFixed(1);
                setUploadProgress(+percentage)
            });
            
            parallelUploadS3.done().then( async (data) => {
                console.log('upload success', data);
                setIsUploaded(true)
                setProcessing(true)
                await uploadToStreamable({
                    awsId: currentAwsId,
                    title: file.name,
                    labelId: labelId,
                })
                    .then((result) => {
                        setStreamableInfo(result)
                        setAssetId(result.shortcode)
                        setAwsId(currentAwsId)
                        return result
                    })
                    .catch((err) => {
                        toast.error("Error get Asset Id.")
                    }).finally(() => {
                        setProcessing(false)
                    })
            })
        } catch (e) {
            console.log(e);
        }
    }

    const style: any = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    return (
        <>
            <Modal show={isOpen} onClose={handleClose} className="text-black">
                <Modal.Header>Upload Video</Modal.Header>
                <Modal.Body>                 
                    <div className="mb-5">
                        {
                            uploadProgress > 0 && <Progress progress={uploadProgress} textLabel="Upload" size="lg" labelProgress labelText />
                        }
                    </div>
                    {
                        !file && <div className="container">
                            <div {...getRootProps({ style })}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, to upload</p>
                            </div>
                        </div>

                    }
                    <div>
                        <div className="mb-2 block mt-2">
                            <Label htmlFor="small" value="Video Name" />
                        </div>
                        <TextInput
                            value={videoInfo.name}
                            onChange={(event) => setVideoInfo({ ...videoInfo, name: event.target.value })}
                            id="small"
                            type="text"
                            sizing="sm"
                        />
                    </div>
                    <div>
                        <div className="mb-2 block mt-2">
                            <Label htmlFor="small" value="Video Size" />
                        </div>
                        <TextInput
                            disabled
                            value={videoInfo.size + `${videoInfo.size ? " MB" : ""}`}
                            id="small"
                            type="text"
                            sizing="sm"
                        />
                    </div>
                    <div>
                        <div className="mb-2 block mt-2">
                            <Label htmlFor="small" value="Video Type" />
                        </div>
                        <TextInput
                            disabled
                            value={videoInfo.type}
                            id="small"
                            type="text"
                            sizing="sm"
                        />
                    </div>
                    <div>
                        <div className="mb-2 block mt-2">
                            <Label htmlFor="small" value="Video Asset Id" />
                        </div>
                        <TextInput
                            disabled
                            value={stremableInfo.shortcode}
                            id="small"
                            type="text"
                            sizing="sm"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button isProcessing={processing} disabled={!stremableInfo.shortcode} onClick={handleSave}>
                        {
                            processing ? 'Processing...' : 'Save'
                        }
                    </Button>
                    <Button color="gray" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

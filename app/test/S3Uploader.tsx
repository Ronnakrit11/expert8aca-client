"use client"
import React, { useState } from 'react';
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";
import { REGION, S3_BUCKET } from '../admin/upload/aws.util';

const S3Uploader: React.FC = () => {
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    function fileChange(e) {
        var file = e.target.files[0];

        const target = { Bucket: S3_BUCKET, Key: file.name, Body: file };
        const creds = { accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string, secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string };
        try {
            const parallelUploadS3 = new Upload({
                client: new S3Client({ region: REGION, credentials: creds }),
                leavePartsOnError: false,
                params: target,
            });

            parallelUploadS3.on("httpUploadProgress", (progress: any) => {
                const percentage = Math.round((progress.loaded / progress.total) * 100);
                setUploadProgress(percentage);
            });
            
            parallelUploadS3.done().then((data) => {
                console.log('upload success', data);
            })
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='text-black'>
            <input type="file" onChange={fileChange} />
             <div>Upload Progress: {uploadProgress}%</div>
        </div>
    );
};

export default S3Uploader;

import AWS from "aws-sdk";

export const S3_BUCKET = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string;

// S3 Region
export const REGION = process.env.NEXT_PUBLIC_AWS_REGION;
export const AWS_ACCESS_KEY_ID = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;

// S3 Credentials
AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
});
export const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
});
"use server"

import axios from "axios";
import { REGION, S3_BUCKET } from "../aws.util";

const uploadApiStreamableUrl = process.env.CORE_API_UPLOAD_URL
const uploadApiStreamableKey = process.env.CORE_API_UPLOAD_KEY

const headers = {
    'x-api-key': uploadApiStreamableKey
}

type TUpload = {
    awsId: string
    title: string
    labelId: string

}
export const uploadToStreamable = async (data: TUpload) => {
    try {
        const body = {
            label_id: +data.labelId,
            video_url: `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/` + data.awsId,
            title: data.title,
        }
        const result = await axios.post(`${uploadApiStreamableUrl}/upload-streamable`, body, { headers })
        return result.data
    } catch (err) {
        console.log("🚀 ~ uploadToStreamable ~ e", err)
        throw err
    }

}

export const deleteVideoStreamable = async (videoId: string) => {
    const result = await axios.delete(`${uploadApiStreamableUrl}/delete-streamable/${videoId}`,{ headers })
    return result.data
}

export const getAwsVideoId = (): string => {
    const timestamp = new Date().getTime();
    const buffer = Buffer.from(timestamp.toString()).toString("base64");
    return buffer.replace(/=/g, "");
}
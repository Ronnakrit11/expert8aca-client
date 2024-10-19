import { updateRespTimeWatched } from "@/redux/features/courses/coursesSlice";
import axios from "axios";
import { time } from "console";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

function useVideoWatchTime(courseId?: string) {
    const [watchTime, setWatchTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const intervalRef = useRef<number | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = window.setInterval(() => {
                setWatchTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPlaying]);

    useEffect(() => {
        if (watchTime >= 10) {
            updateWatchTime(watchTime);
        }
        return () => { };
    }, [watchTime]);

    const updateWatchTime = async (watchTimeInSec: number) => {
        if (!courseId) return;
        try {
            const result = await axios.post(
                `/api/v1/update-watch-time/${courseId}`,
                { watchTimeInSec },
                {
                    withCredentials: true,
                }
            );
            setWatchTime(0);
            dispatch(updateRespTimeWatched(result?.data?.userProgress || {}));
        } catch (error) {
            console.error("Failed to update watch time", error);
        }
    };

    const pauseCounting = () => {
        console.log("pauseCounting");
        setIsPlaying(false);
    };

    const startCounting = () => {
        console.log("startCounting");
        setIsPlaying(true);
    };

    return { watchTime, startCounting, pauseCounting, updateWatchTime };
}

export default useVideoWatchTime;

"use client"
import React, { useRef } from 'react'
import toast from 'react-hot-toast'
import ReactPlayer from 'react-player'
const videoUrl = 'https://streamable.com/62ve05'

const videoList = [
    'https://streamable.com/62ve05',
    'https://streamable.com/r1atm3',
    'https://streamable.com/55xrit',
    'https://streamable.com/iwhyeo'
]

const Player = () => {
    const playerRef = useRef<ReactPlayer | null>(null);
    const [selectedVideo, setSelectedVideo] = React.useState(videoUrl);

    const handleVideoEnded = () => {

        toast.success('Video Ended')
    };

    const handleNextVideoLoop = () => {
        const currentIndex = videoList.indexOf(selectedVideo)
        if (currentIndex === videoList.length - 1) {
            setSelectedVideo(videoList[0])
        }
        else {
            setSelectedVideo(videoList[currentIndex + 1])
        }
    }


    return (
        <div className='max-w-[600px] w-full mr-auto'>
            <ReactPlayer
                ref={playerRef}
                onEnded={handleVideoEnded}
                // onProgress={handleProgress}
                // playing={isPlaying}
                className="w-full aspect-video"
                url={selectedVideo}
                width="100%"
                height="100%"
                controls
            />
            <button className='text-2xl text-black' onClick={handleNextVideoLoop} >Next video</button>
        </div>
    )
}

export default Player
import React, { useRef, useState } from "react";
import "./Cam.css"

const CameraComponent = () => {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setStream(mediaStream); // Save the stream for later use
        } catch (error) {
            console.error("Camera access error: ", error);
            alert("Could not access the camera. Please check permissions.");
        }
    };

    const stopCamera = () => {
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop()); // Stop all tracks (e.g., video/audio)
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null; // Clear the video stream
        }
        setStream(null); // Clear the saved stream
    };

    return (
        <div className="Cam">
            <video ref={videoRef} autoPlay playsInline></video>
            <div>
                <button onClick={startCamera}>Start Camera</button>
                <button onClick={stopCamera}>Stop Camera</button>
            </div>
        </div>
    );
};

export default CameraComponent;

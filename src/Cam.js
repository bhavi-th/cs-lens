import React, { useRef, useState } from "react";
import "./Cam.css";

const Cam = () => {
    const videoRef = useRef(null); // Reference to the video element
    const [stream, setStream] = useState(null); // State to store the media stream

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "environment" // Prefer back camera but fallback if unavailable
                }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream; // Set the video stream to the video element
            }
            setStream(mediaStream); // Save the media stream in the state
        } catch (error) {
            console.error("Camera access error:", error); // Handle errors gracefully
            alert(
                "Could not access the camera. Please check permissions or ensure the device has a compatible camera."
            );
        }
    };

    const stopCamera = () => {
        if (stream) {
            // Stop all media tracks (video/audio)
            stream.getTracks().forEach((track) => track.stop());
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null; // Clear the video stream
        }
        setStream(null); // Clear the state
    };

    return (
        <div className="Cam" id="cam">
            <video ref={videoRef} autoPlay playsInline></video>
            <div>
                <button onClick={startCamera}>Start Camera</button>
                <button onClick={stopCamera}>Stop Camera</button>
            </div>
        </div>
    );
};

export default Cam;

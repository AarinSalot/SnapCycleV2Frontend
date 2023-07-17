import React, { FC, MouseEventHandler, useEffect } from 'react'
import './Camera.css';
import axios from 'axios';

interface CameraProps {
    setCamera: (camera: boolean) => void;
    setResult: (result: string) => void; 
    restart: Function
}

const Camera:FC<CameraProps> = ({setCamera, setResult, restart}) => {

    const openCamera: Function = (): void => {
        let mediaDevices: MediaDevices = navigator.mediaDevices;

        if (!mediaDevices || !mediaDevices.getUserMedia) {
            alert("Sorry, your device camera isn't accessible");
            return;
        }
        mediaDevices.getUserMedia({
            video: true,
        })
        .then(
            (vidStream: MediaStream) => {
                const video: HTMLVideoElement = document.getElementById('video-cam') as HTMLVideoElement; 
                video.srcObject = vidStream;
                video.onloadedmetadata = (e:Event):void => {
                    video.play();
                }
            }
        )
        .catch(
            (e:Error) => {
                alert('There was an error with accessing video.')
                restart();
            }
        )
    } 

    useEffect(()=>{
        openCamera();
    }, [])

    const takePicture: MouseEventHandler<HTMLButtonElement> = async (): Promise<void> => {
        setCamera(false);
        let picture: HTMLCanvasElement = document.createElement('canvas');
        let video: HTMLVideoElement = document.getElementById('video-cam') as HTMLVideoElement; 
        picture.width = 1920;
        picture.height = 1080;

        let ctx: CanvasRenderingContext2D | null = picture.getContext('2d');
        if (ctx) {
            ctx.drawImage( video, 0, 0, picture.width, picture.height );
        }
        const image: string = picture.toDataURL('image/jpeg');
        try {
            const response = await axios.post('https://snapcyclev2backend.onrender.com/process', { picture: image });
            setResult(response.data.answer);
          } catch (error) {
            alert('Error with OpenAI API.')
            console.error(error);
        }
    }

    
    return (
        <div className="container">
            <h3 className="camera-header">Get recycling recommendations by photographing an item!</h3>
            <div className="video-wrapper">
                <div className="video-mask">
                    <video id="video-cam" />
                </div>
            </div>
            <button onClick={takePicture} className='btn'>Take Picture</button>
        </div>
    )
}

export default Camera


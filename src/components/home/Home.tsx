import React, { FC, useState } from 'react';
import Camera from '../camera/Camera'; // Import the Camera component
import Result from '../result/Result'; // Import the Result component

const Home:FC = () => {
    const [camera, setCamera] = useState<boolean>(true);
    const [result, setResult] = useState<string>("Loading...");

    const restart: Function = ():void => {
        setCamera(true);
        setResult("Loading...");
    }
  

    return (
        <>
            {camera && <Camera setCamera={setCamera} setResult={setResult} restart={restart}/>}
            {!camera && <Result restart={restart} result={result}/>}
        </>
    );
}

export default Home;
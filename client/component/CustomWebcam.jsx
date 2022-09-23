import { Button, LinearProgress } from "@mui/material";
import React, { useRef } from "react";
import Webcam from "react-webcam";
import { useRouter } from "next/router";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user" || { exact: "environment" },
};
const CustomWebcam = ({ width, height }) => {
  const router = useRouter();
  const webRef = useRef(null);

  const handleCapture = () => {
    const imageURL = webRef.current.getScreenshot();
    router.push(`/patients/register?ImageURL=${imageURL}`);
  };

  return (
    <div>
      <Webcam
        ref={webRef}
        width={width}
        height={height}
        videoConstraints={videoConstraints}
      />
      <Button onClick={handleCapture}>Capture</Button>
      <LinearProgress />
    </div>
  );
};

export default CustomWebcam;

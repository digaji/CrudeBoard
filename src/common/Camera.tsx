import { useRef, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { backendUrl } from "../misc/Constants";
import axios from "axios";
import { Cookies } from "react-cookie";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user", // For possible mobile users
};

const CameraCapture = (props: {cookies: Cookies, setIsMaskOn: Function}) => {
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    // @ts-ignore
    const imageSrc = webcamRef.current.getScreenshot();

    return imageSrc;
  }, [webcamRef]);

  useEffect(() => {
    let interval = setInterval(async () => {
      const res = capture();

      const axiosApp = axios.create({
        baseURL: backendUrl,
        withCredentials: true,
        headers: {
          sessionid: props.cookies.get("sessionId"),
        },
      });

      // Send image to nodeflux
      const node_res = await axiosApp.post("/nodeflux/facemask", {img: res})
      props.cookies.set("maskOn", node_res.data, { path: "/" });
      props.setIsMaskOn(node_res.data);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div>
      <Webcam
        audio={false}
        height={1280}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={720}
        videoConstraints={videoConstraints}
        className="invisible absolute"
      />
    </div>
  );
};

function Camera(props: { cookies: Cookies, setIsMaskOn: Function }) {
  return <CameraCapture cookies={props.cookies} setIsMaskOn={props.setIsMaskOn}/>;
}

export default Camera;

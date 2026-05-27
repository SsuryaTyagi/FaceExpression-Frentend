import React, { useEffect, useRef, useState } from "react";
import { detectExpression, init } from "../utils/util";

export default function FaceExpression({onClick=()=>{}}) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const [expression, setExpression] = useState("Click button to detect");

  useEffect(() => {
    init({ landmarkerRef, videoRef });
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);


  const handleClick = async() => {
    const detected = detectExpression({ setExpression, videoRef, landmarkerRef });
   onClick(detected)
   console.log(detected);
   
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Face Expression Detector</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "400px",
          borderRadius: "10px",
          border: "2px solid #333",
        }}
      />

      <h3 style={{ marginTop: "10px" }}>{expression}</h3>

      <button
        onClick={handleClick}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Detect Expression
      </button>
    </div>
  );
}

import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const init = async ({ landmarkerRef, videoRef }) => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
  );

  const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
    },
    outputFaceBlendshapes: true,
    runningMode: "VIDEO",
  });

  landmarkerRef.current = faceLandmarker;

  // webcam start
  const video = videoRef.current;
  if (!video) return;
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
};

export const detectExpression = ({
  setExpression,
  videoRef,
  landmarkerRef,
}) => {
  const video = videoRef.current;
  const faceLandmarker = landmarkerRef.current;

  if (!faceLandmarker || video.readyState < 2) {
    setExpression("Camera not ready ❌");
    return;
  }

  const results = faceLandmarker.detectForVideo(video, Date.now());

  if (results.faceBlendshapes?.length > 0) {
    const blendShapes = results.faceBlendshapes[0].categories;

    const getScore = (name) =>
      blendShapes.find((b) => b.categoryName === name)?.score || 0;

    const smile =
      getScore("mouthSmileLeft") > 0.5 && getScore("mouthSmileRight") > 0.5;

    const sad =
      getScore("mouthFrownLeft") > 0.003 && getScore("mouthFrownRight") > 0.003;

    console.log(getScore("mouthFrownLeft"));
    console.log(getScore("mouthFrownRight"));

    let currentExpression = "normal";

    if (sad) {
      currentExpression = "sad";
    } else if (smile) {
      currentExpression = "happy";
    } else {
      currentExpression = "normal";
    }
    setExpression(currentExpression);
    return currentExpression;
  } else {
    setExpression("No face detected ❌");
  }

};

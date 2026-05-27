import React from "react";
import FaceExpression from "../../Expression/components/FaceExpression";
import PlaySong from "../components/PlaySong";
import useSong from "../hooks/useSong";

export default function Home() {
  const { handleGetSong } = useSong();
  return (
    <>
      <FaceExpression
        onClick={(expression) => {
            //  console.log("FROM CHILD:", expression);
          handleGetSong(expression);
        }}
      />
      <PlaySong />
    </>
  );
}

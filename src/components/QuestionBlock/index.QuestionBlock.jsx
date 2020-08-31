import React, { useContext } from "react";
import "./QuestionBlock.scss";
import { Context } from "../../context/context";
import BirdImg from "../BirdImg/index.BirdImg";
import AudioPlayer from "../AudioPlayer/index.AudioPlayer";
import { BIRD_IMG_PLACEHOLDER, BIRD_NAME_PLACEHOLDER } from "../../data/consts";

const QuestionBlock = () => {
  const { state, questionAudio } = useContext(Context);

  const img = state.questionDetails.img;
  const name = state.questionDetails.name;

  return (
    <div className="gray_block question">
      <BirdImg src={img ? img : BIRD_IMG_PLACEHOLDER} />
      <div className="question--vertical_block">
        <span className="question--text">
          {name ? name : BIRD_NAME_PLACEHOLDER}
        </span>
        <hr className="question--hr" />
        <AudioPlayer src={questionAudio} />
      </div>
    </div>
  );
};

export default QuestionBlock;

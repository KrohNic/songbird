import React, { useContext } from "react";
import "./AnswerDetailsBlock.scss";
import { Context } from "../../context/context";
import BirdImg from "../BirdImg/index.BirdImg";
import AudioPlayer from "../AudioPlayer/index.AudioPlayer";

const DetailPlaceholder = () => (
  <span>
    <span>Послушайте плеер.</span>
    <br />
    <span>Выберите птицу из списка</span>
  </span>
);

const AnswerDetailsBlock = () => {
  const { state } = useContext(Context);

  return (
    <div className="gray_block block_border answer_details">
      {state.answerDetails ? (
        <>
          <div className="answer_details--img_wrapper">
            <BirdImg src={state.answerDetails.image} />
          </div>
          <span>{state.answerDetails.name}</span>
          <hr />
          <span>{state.answerDetails.species}</span>
          <hr />
          <div className="answer_details--text">
            {state.answerDetails.description}
          </div>
          <hr />
          <AudioPlayer src={state.answerDetails.audio} />
        </>
      ) : (
        <DetailPlaceholder />
      )}
    </div>
  );
};

export default AnswerDetailsBlock;

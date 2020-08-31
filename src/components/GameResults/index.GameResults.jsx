import React, { useContext } from "react";
import { Context } from "../../context/context";
import "./GameResults.scss";

const GameResults = () => {
  const { state, resetState } = useContext(Context);
  const maxScore = state.data.reduce((sum, level) => sum + level.length - 1, 0);

  return (
    <div className="gray_block results">
      <h2 className="results--title">Поздравляем!</h2>
      <br />
      <span className="results--text">
        Вы прошли викторину и набрали {state.score} из {maxScore} возможных
        баллов
      </span>
      <br />
      {state.score < maxScore && (
        <button className="button" onClick={resetState}>
          Попробовать еще раз!
        </button>
      )}
    </div>
  );
};

export default GameResults;

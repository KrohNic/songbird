import React, { useContext } from "react";
import "./NextLevelBtn.scss";
import { Context } from "../../context/context";

const NextLevelBtn = () => {
  const { state, initNextLevel } = useContext(Context);

  return (
    <button
      disabled={!state.isLevelPassed}
      onClick={initNextLevel}
      className="button"
    >
      Далее
    </button>
  );
};

export default NextLevelBtn;

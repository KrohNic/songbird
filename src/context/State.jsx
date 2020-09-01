import React, { useReducer } from "react";
import _ from "lodash";
import { Context } from "./context";
import reducer from "./reducer";
import data from "../data/birds";
import {
  RESET_STATE,
  SET_ANSWER_TYPE,
  SET_LEVEL,
  SHOW_DETAILS
} from "../context/types";
import { playIncorrectSound, playCorrectSound } from "../utils/utils";
import { stopAllPlayers as AllAudioPlayersStop } from "../components/AudioPlayer/utils.AudioPlayer";

const State = ({ children }) => {
  const getRightAnswerIndex = levelData => {
    return Math.floor(Math.random() * levelData.length);
  };

  const initialState = {
    loading: false,
    isLevelPassed: false,
    isGameEnded: false,
    answerDetails: null,
    questionDetails: {},
    level: 0,
    score: 0,
    data: _.cloneDeep(data),
    rightAnswerIndex: getRightAnswerIndex(data[0])
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const resetState = () => {
    dispatch({
      type: RESET_STATE,
      payload: initialState
    });
  };

  const initNextLevel = () => {
    const { data, level } = state;
    const nextLevel = level + 1;

    if (nextLevel < data.length)
      dispatch({
        type: SET_LEVEL,
        payload: {
          level: nextLevel,
          rightAnswerIndex: getRightAnswerIndex(data[nextLevel])
        }
      });
    else
      dispatch({
        type: SET_LEVEL,
        payload: {
          isGameEnded: true
        }
      });
  };

  const getLevelScore = () => {
    const maxLevelScore = state.data[state.level].length - 1;
    const levelScore = state.data[state.level].reduce((score, itemData) => {
      if (itemData.type === "wrong") return score - 1;

      return score;
    }, maxLevelScore);

    return state.score + levelScore;
  };

  const chooseAnswer = itemIndex => {
    const { data, level, rightAnswerIndex } = state;
    let payload = { data: [...data] };

    if (itemIndex !== rightAnswerIndex) {
      playIncorrectSound();
      payload.data[level][itemIndex].type = "wrong";
    } else {
      AllAudioPlayersStop();
      playCorrectSound();
      payload.data[level][itemIndex].type = "right";
      payload.score = getLevelScore();
      payload.isLevelPassed = true;
      payload.questionDetails = {
        img: data[level][rightAnswerIndex].image,
        name: data[level][rightAnswerIndex].name
      };
    }

    dispatch({
      type: SET_ANSWER_TYPE,
      payload
    });
  };

  const selectAnswerItem = itemIndex => {
    const { data, level, isLevelPassed } = state;

    dispatch({
      type: SHOW_DETAILS,
      payload: data[level][itemIndex]
    });

    if (!isLevelPassed) chooseAnswer(itemIndex);
  };

  return (
    <Context.Provider
      value={{
        resetState,
        initNextLevel,
        selectAnswerItem,
        state,
        questionAudio: state.data[state.level][state.rightAnswerIndex].audio
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default State;

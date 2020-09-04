import { ERROR_SOUND_SRC, CORRECT_SOUND_SRC } from "../constants/constants";

const audioCorrect = new Audio(CORRECT_SOUND_SRC);
const audioIncorrect = new Audio(ERROR_SOUND_SRC);

export const playCorrectSound = () => {
  audioCorrect.play();
};

export const playIncorrectSound = () => {
  audioIncorrect.play();
};

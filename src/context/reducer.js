import { RESET_STATE, SET_ANSWER_TYPE, SET_LEVEL, SHOW_DETAILS } from "./types";

const handlers = {
  [RESET_STATE]: (state, { payload }) => ({
    ...payload
  }),
  [SET_LEVEL]: (state, { payload }) => ({
    ...state,
    ...payload,
    answerDetails: null,
    questionDetails: {},
    isLevelPassed: false
  }),
  [SHOW_DETAILS]: (state, { payload }) => ({
    ...state,
    answerDetails: payload
  }),
  [SET_ANSWER_TYPE]: (state, { payload }) => ({ ...state, ...payload }),
  DEFAULT: state => state
};

function reducer(state, action) {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
}

export default reducer;

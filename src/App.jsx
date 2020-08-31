import React, { Fragment, useContext, useEffect } from "react";
import { Context } from "./context/context";
import Logo from "./components/Logo/index.Logo.jsx";
import Navbar from "./components/Navbar/index.Navbar.jsx";
import "./App.scss";
import AnswerList from "./components/AnswersList/index.AnswerList";
import NextLevelBtn from "./components/NextLevelBtn/index.NextLevelBtn";
import Score from "./components/Score/index.Score";
import QuestionBlock from "./components/QuestionBlock/index.QuestionBlock";
import AnswerDetailsBlock from "./components/AnswerDetailsBlock/index.AnswerDetailsBlock";
import GameResults from "./components/GameResults/index.GameResults";

export const App = () => {
  const { state } = useContext(Context);

  // console.log(state);

  if (state.loading) return <p>Loading...</p>;

  return (
    <Fragment>
      <header className="header">
        <Logo />
        <Score score={state.score} />
      </header>
      <Navbar activeItem={state.level} />
      {state.isGameEnded ? (
        <GameResults />
      ) : (
        <Fragment>
          <QuestionBlock />
          <div className="flex">
            <AnswerList />
            <AnswerDetailsBlock />
          </div>
          <NextLevelBtn />
        </Fragment>
      )}
    </Fragment>
  );
};

export default App;

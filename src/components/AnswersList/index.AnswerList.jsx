import React, { useContext } from "react";
import "./AnswersList.scss";
import { Context } from "../../context/context";

const AnswerItem = ({ label, onSelect, type }) => {
  const classNames = ["answer_list--item"];

  if (type === "wrong") classNames.push("answer_list--item-wrong");
  else if (type === "right") classNames.push("answer_list--item-right");

  return (
    <li className={classNames.join(" ")} onClick={onSelect}>
      {label}
    </li>
  );
};

const AnswerList = () => {
  const { state, selectAnswerItem } = useContext(Context);
  const levelData = state.data[state.level];

  const AnswerItems = levelData.map(({ name, type }, i) => (
    <AnswerItem
      key={name}
      label={name}
      type={type}
      onSelect={() => selectAnswerItem(i)}
    />
  ));

  return <ul className="answer_list block_border gray_block">{AnswerItems}</ul>;
};

export default AnswerList;

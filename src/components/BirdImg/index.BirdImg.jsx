import React from "react";
import "./BirdImg.scss";

const BirdImg = ({ src }) => (
  <img className="question--img" src={src} alt="Bird picture" />
);

export default BirdImg;

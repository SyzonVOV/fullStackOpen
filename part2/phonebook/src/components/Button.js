import React from "react";

const Button = ({type, text, handle}) => {
  return (
    <>
      <button type={type} onClick={typeof handle === "function" ? handle : undefined} >{text}</button>
    </>
  );
};

export default Button;

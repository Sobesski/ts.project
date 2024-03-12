import React from "react";
import { useNavigate } from "react-router-dom";

type label = {
  label: string;
  style?: any;
  onClick?: any;
  type?: any;
};

function Button(props: label) {
  return (
    <button
      className="button"
      type={props.type}
      onClick={props.onClick}
      style={props.style}
    >
      {props.label}
    </button>
  );
}

export default Button;

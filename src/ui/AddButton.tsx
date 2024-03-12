import React from "react";
interface AddButtonProps {
  onClick: () => void;
  style?: React.CSSProperties;
}
const AddButton: React.FC<AddButtonProps> = (props) => {
  return (
    <button className="AddButton" onClick={props.onClick} style={props.style}>
      Add +
    </button>
  );
};

export default AddButton;

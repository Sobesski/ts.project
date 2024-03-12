import React from "react";
interface BurgerProps {
  onClick: () => void;
  style?: React.CSSProperties;
}
const Burger: React.FC<BurgerProps> = (props) => {
  return (
    <div className="Burger" onClick={props.onClick}>
      <div className="Burger_hamburger_button" style={props.style}>
        <img src="/assets/icons/menu_24px.png" />
      </div>
    </div>
  );
};

export default Burger;

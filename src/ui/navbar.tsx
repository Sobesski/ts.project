import React, { useState } from "react";
import store from "../core/store";
import { useSelector } from "react-redux";
import Burger from "./Burger";
import { Auth } from "../core/authReducer";

interface state {
  auth: Auth;
  onClick: () => void;
  name: string;
}
interface NavbarProps {
  onClick: () => void;
}
const Navbar: React.FC<NavbarProps> = (props) => {
  const name = useSelector((state: state) => state.auth);

  return (
    <div className="navbar">
      <Burger
        style={{ marginTop: "19px", marginLeft: "12px" }}
        onClick={props.onClick}
      />
      <div className="navbar_poster">
        <img src="/assets/images/logo.png"></img>
      </div>
      <div className="navbar_name">
        <p className="navbar_name_userName">{name.name}</p>
        <div className="navbar_name_icon">
          <img src="/assets/icons/profile.png" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

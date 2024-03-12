import React, { useState } from "react";
import store from "../core/store";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearState } from "../core/actions";
import { Auth } from "../core/authReducer";
const SideBar = (props: any) => {
  interface state {
    auth: Auth;
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: state) => state.auth);
  const param = useLocation();
  const handleClearState = () => {
    store.dispatch({
      type: "CLEAR_STATE",
      payload: {},
    });
  };
  function signOut() {
    delete localStorage.auth;
    store.dispatch({
      type: "auth/loaded",
      payload: { token: null, name: null },
    });
    store.dispatch({
      type: "allRefresh",
      payload: {},
    });
    navigate("/signin");
  }

  const toggleImageTeam = () => {
    navigate("/CardTeams");
  };

  const toggleImagePlayer = () => {
    navigate("/CardPlayers");
  };
  return (
    <div className={props.burger ? "SideBar" : "SideBarNo"} style={props.style}>
      <div className="SideBar_auth">
        {props.burger}
        <img src="/assets/icons/profile.png" />
        <p>{auth.name}</p>
      </div>
      <hr></hr>
      <div className="SideBar_TeamsIcon" onClick={toggleImageTeam}>
        <img
          src={
            param.pathname === "/CardTeams" ||
            param.pathname === "/AddNewTeam" ||
            param.pathname.includes("/DetailsTeam") ||
            param.pathname.includes("/updateNewTeam")
              ? "/assets/icons/group_person (1).png"
              : "/assets/icons/group_person (2).png"
          }
        />
        <p
          style={{
            color:
              param.pathname === "/CardTeams" ||
              param.pathname === "/AddNewTeam" ||
              param.pathname.includes("/DetailsTeam") ||
              param.pathname.includes("/updateNewTeam")
                ? "red"
                : "gray",
          }}
        >
          Teams
        </p>
      </div>
      <div className="SideBar_PlayersIcon" onClick={toggleImagePlayer}>
        <img
          src={
            param.pathname === "/CardPlayers" ||
            param.pathname === "/AddNewPlayer" ||
            param.pathname.includes("/DetailsPlayer") ||
            param.pathname.includes("/updateNewPlayer")
              ? "/assets/icons/person (2).png"
              : "/assets/icons/person (1).png"
          }
        />
        <p
          style={{
            color:
              param.pathname === "/CardPlayers" ||
              param.pathname === "/AddNewPlayer" ||
              param.pathname === "/DetailsPlayer" ||
              param.pathname.includes("/DetailsPlayer") ||
              param.pathname.includes("/updateNewPlayer")
                ? "red"
                : "gray",
          }}
        >
          Players
        </p>
      </div>
      <div className="SideBar_SignOutIcon" onClick={signOut}>
        <img src="/assets/icons/Frame 27.png" />
      </div>
      <div className="SideBar_SignOut" onClick={signOut}>
        <img src="/assets/icons/input.png" />
        <img src="/assets/icons/Sign out.png" />
      </div>
    </div>
  );
};
export default SideBar;

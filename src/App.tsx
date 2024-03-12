import React from "react";
import logo from "./logo.svg";
import "./index.css";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import store from "./core/store";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useAppSelector } from "./core/hooks";
import AddNewTeam from "./pages/AddNewTeam";
import CardTeams from "./pages/CardTeams";
import DetailsTeam from "./pages/DetailsTeam";
import AddNewPlayer from "./pages/AddNewPlayer";
import CardPlayers from "./pages/CardPlayers";
import DetailsPlayer from "./pages/DetailsPlayer";
const App: React.FC = () => {
  const navigate = useNavigate();
  const currentUrl = window.location.reload;
  useEffect(() => {
    !auth && navigate("/signin");
    console.log(store.getState().auth.token);
  }, []);
  let auth = useSelector((state: any) => state.auth.token);
  console.log(auth);
  console.log(store.getState().auth.token);
  return (
    <div className="App">
      <Routes>
        {!auth && <Route path="/signin" element={<SignIn />} />}
        {!auth && <Route path="/signup" element={<SignUp />} />}
        {auth && <Route path="/AddNewTeam" element={<AddNewTeam />} />}
        {auth && <Route path="/CardTeams" element={<CardTeams />} />}
        {auth && <Route path="/CardPlayers" element={<CardPlayers />} />}
        {auth && <Route path="/DetailsTeam/:id" element={<DetailsTeam />} />}
        {auth && <Route path="/updateNewTeam/:id" element={<AddNewTeam />} />}
        {auth && <Route path="/AddNewPlayer" element={<AddNewPlayer />} />}
        {!auth && <Route path="/CardPlayers" element={<CardPlayers />} />}
        {auth && (
          <Route path="/updateNewPlayer/:id" element={<AddNewPlayer />} />
        )}
        {auth && <Route path="/DetailsPlayer" element={<DetailsPlayer />} />}
        {auth && (
          <Route path="/DetailsPlayer/:id" element={<DetailsPlayer />} />
        )}
      </Routes>
    </div>
  );
};

export default App;

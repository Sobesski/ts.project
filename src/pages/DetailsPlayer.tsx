import React, { useState } from "react";
import Navbar from "../ui/navbar";
import SideBar from "../ui/SideBar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Api from "../api/Api";
import { useEffect } from "react";
import { player } from "../core/playerReducer";
import { RootState } from "../core/store";
const DetailsPlayer = () => {
  const domain = "http://dev.trainee.dex-it.ru";
  const navigate = useNavigate();
  const player1 = useSelector((state: RootState) => state.player);
  const id = useParams();
  const [burger, setBurgerOn] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [player, setPlayer] = useState<player>();
  const deletePlayer = (id: any) => {
    Api.player
      .delete(id.id)
      .then((r) => {
        console.log(r);
        navigate("/CardPlayers");
      })
      .catch((error) => alert(`The problem will be resolved - ${error}`));
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    console.log(windowWidth);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    Api.player
      .get(id.id)
      .then((r) => {
        console.log(r.data);
        setPlayer(r.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div className="DetailsPlayer">
      <div>
        <Navbar onClick={() => setBurgerOn(!burger)} />
      </div>
      {burger ? (
        <div className="Black—InactiveOn"></div>
      ) : (
        <div className="Black—Inactive"></div>
      )}
      <div className="DetailsPlayer_CardShow">
        <SideBar burger={burger} style={{ height: "1026px" }} />
        <div className="DetailsPlayer_CardShow">
          <div className="DetailsPlayer_CardShow_Card">
            <div className="DetailsPlayer_CardShow_Card_Nav">
              <p
                style={{
                  width: "203px",
                  height: "21px",
                  fontFamily: "Avenir",
                }}
              >
                <p
                  style={{
                    color: "red",
                    marginLeft: "32px",
                    marginTop: "30px",
                  }}
                >
                  Players&nbsp;<span style={{ color: "gray" }}>/</span>&nbsp;
                  {player && player.name}
                </p>
              </p>
              <img
                src="/assets/icons/create.png"
                style={{
                  height: "24px",
                  width: "24px",
                  marginLeft: windowWidth < 376 ? "114px" : "835px",
                  marginTop: "27px",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/updateNewPlayer/${id.id}`)}
              />
              <img
                src="/assets/icons/delete.png"
                style={{
                  height: "24px",
                  width: "24px",
                  marginLeft: windowWidth > 376 ? "24px" : "20px",
                  marginTop: "27px",
                  cursor: "pointer",
                }}
                onClick={() => deletePlayer(id)}
              />
            </div>
            <div
              className="DetailsPlayer_CardShow_Card_Inf"
              style={{ textAlign: windowWidth < 376 ? "center" : "start" }}
            >
              <img src={`${domain}${player && player.avatarUrl}`} />
              <div
                style={{
                  fontFamily: "Avenir",
                  color: "white",
                  marginTop: windowWidth < 376 ? 55 : 89,
                  marginLeft: windowWidth < 376 ? 0 : 78,
                  textAlign: windowWidth < 376 ? "center" : "start",
                  width: 375,
                }}
              >
                <div
                  style={{
                    fontSize: 17,
                    textAlign: windowWidth < 376 ? "center" : "start",
                  }}
                >
                  <p>
                    {player && player.name}{" "}
                    <span style={{ color: "red", marginLeft: 13 }}>
                      #{player && player.number}
                    </span>
                  </p>
                </div>
                <div style={{ display: windowWidth < 376 ? "block" : "flex" }}>
                  <div style={{ height: 25 }}>
                    <p
                      style={{
                        fontSize: 17,
                        marginTop: windowWidth < 376 ? 39 : 49,
                      }}
                    >
                      Position
                    </p>
                    <div style={{ fontSize: 15, marginTop: 25 }}>
                      {player && player.position}
                    </div>
                  </div>
                  <div
                    style={{
                      marginLeft: windowWidth < 376 ? 0 : 182,
                      width: windowWidth > 376 ? "77px" : "",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 17,
                        marginTop: windowWidth < 376 ? 39 : 49,
                      }}
                    >
                      Team
                    </p>
                    <div style={{ fontSize: 15, marginTop: 25 }}>
                      {player && player.teamName}
                    </div>
                  </div>
                </div>
                <div style={{ display: windowWidth < 376 ? "block" : "flex" }}>
                  <div style={{ width: windowWidth > 376 ? "77px" : "" }}>
                    <p
                      style={{
                        fontSize: 17,
                        marginTop: windowWidth < 376 ? 39 : 67,
                      }}
                    >
                      Height
                    </p>
                    <div style={{ fontSize: 15, marginTop: 25 }}>
                      {player && player.height}
                    </div>
                  </div>
                  <div
                    style={{
                      marginLeft: windowWidth < 376 ? 0 : 164,
                      width: windowWidth > 376 ? "77px" : "",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 17,
                        marginTop: windowWidth < 376 ? 39 : 67,
                      }}
                    >
                      Weight
                    </p>
                    <div style={{ fontSize: 15, marginTop: 25 }}>
                      {player && player.weight}
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: 17,
                    marginTop: windowWidth < 376 ? 39 : 67,
                  }}
                >
                  Age
                </p>
                <div style={{ fontSize: 15, marginTop: 25 }}>
                  {new Date().getFullYear() - new Date(player && player.birthday).getFullYear()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPlayer;

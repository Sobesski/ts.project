import React, { useEffect, useState } from "react";
import Navbar from "../ui/navbar";
import SideBar from "../ui/SideBar";
import Api from "../api/Api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { player } from "../core/playerReducer";
import { team } from "../core/teamReducer";
const DetailsTeam = () => {
  interface id {
    id: string;
  }
  const navigate = useNavigate();
  let baseURL: string = "http://dev.trainee.dex-it.ru";
  const [team, setTeam] = useState<team>();
  const id: any = useParams();
  const [teamIds, setTeamIds] = useState([]);
  const [burger, setBurgerOn] = useState(false);
  const [players, setPlayers] = useState([]);
  const domain = "http://dev.trainee.dex-it.ru";
  const [windowWidth, setwindowWidth] = useState<number>(window.innerWidth);
  const deleteTeam = (id: id) => {
    Api.team
      .delete(id.id)
      .then((response: any) => {
        if (response.status === 500) {
          throw new Error(
            `Failed to delete player: ${response.status} ${response.statusText}`
          );
        }
        alert('Team can not be deleted now')
        console.log(response);
        navigate("/CardTeams");
      })
      .catch((error: any) => {
        if (error.response && error.response.status === 500) {
          alert(
            `Team can not be deleted now ${error.response.status} ${error.response.statusText}`
          );
        } else {
          console.error("Unknown error occured", error);
        }
      });
  };
  const getTeam = (id: number) => {
    Api.team.getTeam(id).then((r) => {
      console.log(r);
      setTeam(r.data);
    });
  };
  useEffect(() => {
    const handleResize = () => {
      setwindowWidth(windowWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    setTeamIds(id.id);
    console.log(getTeam(id));
    Api.player
      .getPlayers({
        teamIds: [id.id],
        name: "",
        page: 1,
        pageSize: 1000,
      })
      .then((r) => {
        console.log(r);
        setPlayers(r.data.data);
      });
  }, []);
  return (
    <div className="DetailsTeam">
      <div>
        <Navbar onClick={() => setBurgerOn(!burger)} />
      </div>
      {burger ? (
        <div className="Black—InactiveOn"></div>
      ) : (
        <div className="Black—Inactive"></div>
      )}
      <div className="DetailsTeam_field">
        <SideBar burger={burger} style={{ height: "1026px" }} />
        <div style={{ display: "block" }}>
          <div className="DetailsTeam_Card">
            <div className="DetailsTeam_Card_Nav">
              <p
                className="DetailsTeam_Card_Nav_p1"
                style={{
                  width: windowWidth > 375 ? "203px" : "",
                  height: "21px",
                  display: "flex",
                  fontFamily: "Avenir",
                }}
              >
                <p
                  className="DetailsTeam_Card_Nav_p2"
                  style={{
                    color: "red",
                    marginLeft: windowWidth > 375 ? "32px" : "",
                    marginTop: windowWidth > 375 ? "30px" : "",
                  }}
                >
                  Teams&nbsp;
                  <span style={{ color: windowWidth > 375 ? "gray" : "" }}>
                    /
                  </span>
                  &nbsp;
                  {team && team.name}
                </p>
              </p>
              <img
                src="/assets/icons/create.png"
                className="DetailsTeam_Card_Nav_img1"
                style={{
                  height: "24px",
                  width: "24px",
                  marginLeft: windowWidth > 375 ? "835px" : "",
                  marginTop: windowWidth > 375 ? "27px" : "",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/updateNewTeam/${id.id}`)}
              />
              <img
                src="/assets/icons/delete.png"
                className="DetailsTeam_Card_Nav_img2"
                style={{
                  height: "24px",
                  width: "24px",
                  marginLeft: windowWidth > 375 ? "24px" : "",
                  marginTop: windowWidth > 375 ? "27px" : "",
                  cursor: "pointer",
                }}
                onClick={() => deleteTeam(id)}
              />
            </div>
            <div className="DetailsTeam_Card_Inf">
              <img
                src={`${baseURL}${team && team.imageUrl}`}
                className="DetailsTeam_Card_Inf_img"
              />
              <div className="DetailsTeam_Card_Inf_text">
                <div>{team && team.name}</div>
                <div
                  style={{
                    display: windowWidth > 375 ? "flex" : "block",
                    fontSize: windowWidth > 375 ? "24px" : "",
                    marginTop: windowWidth > 375 ? "60px" : "",
                  }}
                >
                  <div className="DetailsTeam_Card_Inf_text_year">
                    Year of foundation
                    <br />
                    <p
                      style={{
                        marginTop: windowWidth > 375 ? "22px" : "",
                        fontSize: windowWidth > 375 ? "18px" : "",
                      }}
                    ></p>
                    {team && team.foundationYear}
                  </div>
                  <div
                    className="DetailsTeam_Card_Inf_text_division"
                    style={{ marginLeft: windowWidth > 375 ? "87px" : "" }}
                  >
                    Division
                    <br />
                    <p
                      style={{
                        marginTop: windowWidth > 375 ? "22px" : "",
                        fontSize: windowWidth > 375 ? "18px" : "",
                      }}
                    >
                      {team && team.division}
                    </p>
                  </div>
                </div>
                <div
                  className="DetailsTeam_Card_Inf_text_conference"
                  style={{
                    fontSize: windowWidth > 375 ? "24px" : "",
                    marginTop: windowWidth > 375 ? "67px" : "",
                  }}
                >
                  Conference <br />
                  <p
                    style={{
                      marginTop: windowWidth > 375 ? "22px" : "",
                      fontSize: windowWidth > 375 ? "18px" : "",
                    }}
                  >
                    {team && team.conference}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="DetailsTeam_Roster">
            <div className="DetailsTeam_Roster_Roster">
              <p>Roster</p>
            </div>
            <div className="DetailsTeam_Roster_Inf">
              <p>#</p> <p>Player</p> <p>Height</p> <p>Weight</p> <p>Age</p>
            </div>
            <div className="DetailsTeam_Roster_Inf_Players">
              {players.map((player: player) => (
                <div className="player">
                  <div className="player_number">{player.number}</div>
                  <img
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/DetailsPlayer/${player.id}`)}
                    src={`${domain}${player.avatarUrl}`}
                    className="Player_avatarUrl"
                  />
                  <div style={{ display: "block" }}>
                    {" "}
                    <div className="player_name">{player.name}</div>
                    <div className="player_position">{player.position}</div>
                  </div>
                  <div className="player_height">{player.height}</div>
                  <div className="players_weight">{player.weight}</div>
                  <div className="players_age">
                    {new Date().getFullYear() -
                      new Date(player.birthday).getFullYear()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsTeam;

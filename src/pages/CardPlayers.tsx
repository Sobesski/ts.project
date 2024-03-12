import React, { CSSProperties } from "react";
import Navbar from "../ui/navbar";
import SideBar from "../ui/SideBar";
import { useState } from "react";
import InputSearch from "../ui/Input_Search";
import AddButton from "../ui/AddButton";
import ReactPaginate from "react-paginate";
import Api from "../api/Api";
import { useEffect } from "react";
import store from "../core/store";
import { useNavigate } from "react-router-dom";
import SelectorUi from "../ui/SelectorUi";
import { useParams } from "react-router-dom";
import { MenuProps, OptionProps } from "react-select";
const CardPlayers = () => {
  type Team = { label: string; value: number };
  type Player = {
    data: {
      name: string;
      number: number;
      position: string;
      team: number;
      teamName: string;
      birthday: string;
      height: number;
      weight: number;
      avatarUrl: string;
      id?: number | string;
    };
  };
  const customStyles = {
    menu: (provided: MenuProps) => ({
      ...provided,
      marginTop: "unset",
      marginBottom: "30px",
      top: "unset",
      bottom: "calc(100% + 8px)",
    }),
    multiValueLabel: (provided: CSSProperties) => ({
      ...provided,
      color: "white",
      backgroundColor: "red",
      borderRadius: "20px",
    }),
    option: (provided: CSSProperties, state: OptionProps<any>) => ({
      ...provided,
      borderBottom: "0.5px solid gray",
      color: "gray",
      backgroundColor: state.isSelected ? "red" : "white",
    }),
  };

  const domain = "http://dev.trainee.dex-it.ru";
  const id = useParams();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [players, setPlayers] = useState<string[]>([]);
  const [initialPage, setInitialPage] = useState(0);
  const [burger, setBurgerOn] = useState<Boolean>(false);
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentSize, setCurrentSize] = useState({ label: 6, value: 6 });
  const [value, setValue] = useState<string>("");
  const [teams, setTeams] = useState<any>([]);
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [select, setSelect] = useState("");
  const filteredPlayers: Array<any> = players.filter((player: any) => {
    return player.name.toLowerCase().includes(value.toLowerCase());
  });

  const handleChange = (e: Team[]) => {
    if (e && e.length > 0) {
      Api.player
        .getPlayers({
          name: "",
          page: 1,
          teamIds: e.map((team: Team) => team.value),
          pageSize: currentSize.value,
        })
        .then((response: any) => {
          console.log(response);
          setPageCount(response.data.count / response.data.size);
          setPlayers(response.data.data);
          setFlag(true);
        });
    } else {
      setPlayers([]);
    }
  };
  const handlePageClick = (page: { selected: number }) => {
    Api.player
      .getPlayers({
        name: "",
        teamIds: teams.map((e: Team) => e.value),
        page: page.selected + 1,
        pageSize: currentSize.value,
      })
      .then((response: any) => {
        console.log(response);
        setPlayers(response.data.data);
        setInitialPage(page.selected);
        setPageCount(response.data.count / response.data.size);
        setFlag(true);
      });
  };

  const choosedSize = (value: any) => {
    setCurrentSize(value);
    Api.player
      .getPlayers({
        name: "",
        page: 1,
        teamIds: teams.map((e: Team) => e.value),
        pageSize: value.value,
      })
      .then((response) => {
        setPlayers(response.data.data);
        console.log(response.data);
        setInitialPage(0);
        setPageCount(response.data.count / response.data.size);
        setFlag(true);
      });
  };

  const getPlayer = (id: number | string) => {
    store.dispatch({
      type: "player/set",
      payload: players.filter((team: any) => team.id === id)[0],
    });
    navigate(`/DetailsPlayer/${id}`);
  };
  useEffect(() => {
    Api.team
      .getTeams({
        name: "",
        page: 1,
        pageSize: 1000,
      })
      .then((response: any) => {
        console.log(response.data);
        setTeams(
          response.data.data.map((e: any) => {
            return { label: e.name, value: e.id };
          })
        );
      })
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);
  return (
    <div className="PlayerTeams">
      <Navbar onClick={() => setBurgerOn(!burger)} />
      {burger ? (
        <div className="Black—InactiveOn"></div>
      ) : (
        <div className="Black—Inactive"></div>
      )}
      <div className="PlayerTeams_cards">
        <SideBar burger={burger} />
        <div className="PlayerTeams_cards_manage">
          <div>
            <InputSearch
              style={{
                marginLeft: windowWidth < 376 ? "12px" : "80px",
                marginTop: windowWidth < 376 ? 22 : 32,
              }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setValue(event.target.value);
              }}
            />
            <SelectorUi
              style={{
                width: windowWidth < 376 ? "351px" : "364px",
                height: "40px",
                marginTop: windowWidth < 376 ? 22 : 32,
                marginLeft: windowWidth < 376 ? 12 : 24,
                left: 0,
                position: "relative",
              }}
              options={teams}
              onChange={handleChange}
              multiple={true}
              p={{ display: "none", marginBottom: 0 }}
            />
            <AddButton
              style={{
                marginTop: windowWidth < 376 ? 22 : "32px",
                marginLeft: windowWidth < 376 ? 12 : 285,
              }}
              onClick={() => {
                store.dispatch({
                  type: "allRefresh",
                  payload: {},
                });
                navigate("/AddNewPlayer");
              }}
            />
          </div>
          {players.length === 0 ? (
            <div className="EmptyHere">
              <div className="EmptyHere_img">
                <img
                  src="/assets/images/illustration (1).png"
                  className="EmptyHere_img1"
                />
                <img
                  src="/assets/images/Empty here.png"
                  className="EmptyHere_img2"
                />
                <img
                  src="/assets/images/Add new players to continue.png"
                  className="EmptyHere_img3"
                />
              </div>
            </div>
          ) : (
            <div className="teams">
              {filteredPlayers.map((card) => (
                <div
                  className="card"
                  style={{ cursor: "pointer" }}
                  onClick={() => getPlayer(card.id)}
                >
                  <div>
                    <img
                      src={`${domain}${card.avatarUrl}`}
                      className="card__img"
                    />
                    <div className="card__inf">
                      <p className="card__name">
                        {card.name}
                        <span style={{ color: "red" }}>#{card.number}</span>
                      </p>
                      <p
                        className="card__teamName"
                        style={{
                          fontFamily: "Avenir",
                          fontSize: "20px",
                          color: "gray",
                        }}
                      >
                        {
                          teams.filter(
                            (teams: any) => teams.value === card.team
                          )[0].label
                        }
                      </p>
                      <p className="card__year"></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="pagination" style={{ marginLeft: "48px" }}>
            <ReactPaginate
              className="pagination_pagesNumber"
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
              marginPagesDisplayed={7}
              forcePage={initialPage}
            />
            <div>
              <SelectorUi
                options={[
                  { value: 6, label: 6 },
                  { value: 12, label: 12 },
                  { value: 24, label: 24 },
                ]}
                onChange={choosedSize}
                value={currentSize}
                styles={customStyles}
                p={{ display: "none" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPlayers;

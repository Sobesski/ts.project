import React, { ChangeEvent } from "react";
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
const CardTeams = () => {
  interface Team {
    name: string;
    foundationYear: number | null;
    division: string;
    conference: string;
    imageUrl: string;
    id?: number;
  }
  const [windowWidth, setWindowWidth] = useState<any>();
  const customStyles = {
    menu: (provided: React.CSSProperties, state: any) => ({
      ...provided,
      marginTop: "unset",
      marginBottom: "8px",
      top: "unset",
      bottom: "calc(100% + 8px)",
    }),
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const customStylesWidth = {
    save: {
      width: windowWidth < 376 ? "152px" : "172px",
      backgroundColor: "red",
      color: "white",
      marginLeft: "24px",
      borderRadius: "4px",
      background: "var(--UI-Red, #E4163A)",
    },
    cancel: {
      width: windowWidth < 376 ? "152px" : "172px",
      backgroundColor: "white",
      borderRadius: "4px",
      color: "var(--UI-Light-Grey, #9C9C9C)",
    },
  };
  const [cards, setCards] = useState<Team[]>([]);
  const [initialPage, setInitialPage] = useState<number>(0);
  const [burger, setBurgerOn] = useState<Boolean>(false);
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentSize, setCurrentSize] = useState({ label: 6, value: 6 });
  const [value, setValue] = useState<string>("");
  const domain = "http://dev.trainee.dex-it.ru";
  const navigate = useNavigate();
  const filteredCountries: Array<any> = cards.filter((card: any) => {
    return card.name.toLowerCase().includes(value.toLowerCase());
  });

  function getTeam(id: number) {
    store.dispatch({
      type: "team/set",
      payload: cards.filter((team: Team) => team.id === id)[0],
    });
    const teamDataToSave = cards.find((team: Team) => team.id === id);
    if (teamDataToSave) {
      window.localStorage.removeItem("teamData");
      window.localStorage.setItem("teamData", JSON.stringify(teamDataToSave));
    }
    navigate(`/DetailsTeam/${id}`);
  }
  const handlePageClick = (page: { selected: number }) => {
    try {
      Api.team
        .getTeams({
          name: "",
          page: page.selected + 1,
          pageSize: currentSize.value,
        })
        .then((response) => {
          setCards(response.data.data);
          console.log(response);
          setInitialPage(page.selected);
          setPageCount(response.data.count / response.data.size);
        });
    } catch (error) {
      console.log(error);
    }
  };

  function choosedSize(value: any) {
    setCurrentSize(value);
    Api.team
      .getTeams({
        name: "",
        page: 1,
        pageSize: value.value,
      })
      .then((response) => {
        setCards(response.data.data);
        console.log(response);
        setInitialPage(0);
        setPageCount(response.data.count / response.data.size);
      });
  }
  useEffect(() => {
    Api.team
      .getTeams({
        name: "",
        page: 1,
        pageSize: currentSize.value,
      })
      .then((response) => {
        setCards(response.data.data);
        console.log(response);
        setPageCount(response.data.count / response.data.size);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="CardTeams">
      <Navbar onClick={() => setBurgerOn(!burger)} />
      {burger ? (
        <div className="Black—InactiveOn"></div>
      ) : (
        <div className="Black—Inactive"></div>
      )}
      <div className="CardTeams_cards">
        <SideBar burger={burger} />
        <div className="CardTeams_cards_manage">
          <div className="CardTeams_cards_manage_flex">
            <div className="InputSearch_margin">
              <InputSearch
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setValue(event.target.value);
                }}
              />
            </div>
            <div className="AddButton_margin">
              <AddButton
                onClick={() => {
                  store.dispatch({
                    type: "allRefresh",
                    payload: {},
                  });
                  navigate("/AddNewTeam");
                }}
              />
            </div>
          </div>
          {cards.length === 0 ? (
            <div className="EmptyHere">
              <div className="EmptyHere_img">
                <img
                  src="/assets/images/illustration.png"
                  className="EmptyHere_img1"
                />
                <img
                  src="/assets/images/Empty here.png"
                  className="EmptyHere_img2"
                />
                <img
                  src="/assets/images/Add new teams to continue.png"
                  className="EmptyHere_img3"
                />
              </div>
            </div>
          ) : (
            <div className="teams">
              {filteredCountries.map((card: Team) => (
                <div
                  className="card"
                  onClick={() => card.id && getTeam(card.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div>
                    {
                      <img
                        src={`${domain}${card.imageUrl}`}
                        className="card__img"
                      />
                    }
                    <div className="card__inf">
                      <p className="card__name">{card.name}</p>
                      <p className="card__year">
                        Year of foundation:{card.foundationYear}
                      </p>
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

export default CardTeams;

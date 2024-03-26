import React, { ChangeEvent, useState, useMemo } from "react";
import store from "../core/store";
import Navbar from "../ui/navbar";
import SideBar from "../ui/SideBar";
import { useSelector } from "react-redux";
import reactSelect, { StylesConfig } from "react-select";
import { useForm } from "react-hook-form";
import Api from "../api/Api";
import Button from "../ui/button";
import Input from "../ui/Input";
import { useNavigate } from "react-router-dom";
import SelectorUi from "../ui/SelectorUi";
import DatePick from "../ui/DatePicker";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const AddNewPlayer: React.FC = () => {
  interface Option {
    value?: string | number;
    label?: string;
  }
  type FormData = {
    name: string;
    number: number;
    position: string;
    team: number | null;
    teamName: any;
    birthday: string;
    height: number;
    weight: number;
    avatarUrl: string;
    id?: any;
  };
  type State = {
    player: FormData;
  };
  type Selected = {
    value: number | string;
    label: string | number;
  };

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
      id?: any;
    };
  };

  interface position {
    value: string | number;
    label: string | number;
  }
  type positions = [string];
  const selectStyle: StylesConfig = {
    menu: (provided) => ({
      ...provided,
      marginBottom: "unset",
      bottom: "unset",
      top: "calc(100% + 0px)",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: "0.5px solid gray",
      color: "gray",
      backgroundColor: state.isSelected ? "red" : "white",
    }),
  };
  const id = useParams();
  const navigate = useNavigate();
  const domain = "http://dev.trainee.dex-it.ru";
  const [player, setPlayer] = useState<FormData>({
    name: "",
    number: 0,
    position: "",
    teamName: "",
    team: null,
    birthday: "",
    height: 0,
    weight: 0,
    avatarUrl: "",
    ...(id.id ? { id: id.id } : {}),
  });
  const [inputValue, setInputValue] = useState(player);
  const basicValue = useSelector((state: State) => state.player);
  const [burger, setBurgerOn] = useState<Boolean>();
  const player1 = useSelector((state: State) => state.player);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [teams, setTeams] = useState<Option[]>([]);
  const [startDate, setStartDate] = useState(
    player ? new Date(player.birthday) : new Date()
  );
  const [positions, setPositions] = useState<Option[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<any>({
    value: inputValue.position,
    label: inputValue.position,
  });
  const [selectedTeam, setSelectedTeam] = useState<any>({
    value: inputValue.teamName,
    label: inputValue.teamName,
  });

  const handleChange = (selected: Selected, f: any) => {
    selected && f(selected);
    if (f === setSelectedTeam) {
      setSelectedTeam(selected);
    } else if (f === setSelectedPosition) {
      setSelectedPosition(selected);
    }
  };

  const sendPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    return new Promise((resolve, reject) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file) {
          let formData = new FormData();
          formData.append("file", file);
          Api.saveImage(formData)
            .then((response) => {
              console.log(response.data);
              store.dispatch({
                type: "player/set",
                payload: { avatarUrl: response.data },
              });
              setValue("avatarUrl", response.data);
              setInputValue((prevInputValue: FormData) => ({
                ...prevInputValue,
                avatarUrl: response.data,
              }));
              setPlayer((prevInputPlayer: FormData) => ({
                ...prevInputPlayer,
                avatarUrl: response.data,
              }));
              resolve(response.data);
            })
            .catch((error) => {
              console.error(error);
              reject(error);
            });
        }
      } else {
        console.log("Файл не выбран");
        reject(new Error("Файл не выбран"));
      }
    });
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
    id.id &&
      Api.player
        .get(id.id)
        .then((player: Player) => {
          console.log(player.data);
          if (player.data) {
            setSelectedTeam({
              value: player.data.team,
              label: player.data.teamName,
            });
            setSelectedPosition({
              value: player.data.position,
              label: player.data.position,
            });
            setPlayer(player.data);
            setInputValue(player.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });

    Api.player
      .getPositions()
      .then((r) => {
        console.log(r);
        setPositions(
          r.data.map((e: positions) => {
            return { value: e, label: e };
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });

    Api.team
      .getTeams({ name: "", page: "1", pageSize: "10000" })
      .then((r: any) => {
        console.log(r);
        setTeams(
          r.data.data.map((e: any) => {
            return { value: e.id, label: e.name };
          })
        );
        const filteredTeams = r.data.data.filter(
          (e: any) => e.id === player1.team
        );
        console.log(player1);
        console.log(filteredTeams);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (id.id) {
        await Api.player.upDate(Object.assign(inputValue, data)).then((r) => {
          console.log(r);
          window.location.href = "/CardPlayers";
        });
      } else {
        await Api.player.add(inputValue).then((r) => {
          console.log(r);
          window.location.href = "/CardPlayers";
        });
      }
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <div className="AddNewPlayer">
      <Navbar onClick={() => setBurgerOn(!burger)} />
      {burger ? (
        <div className="Black—InactiveOn"></div>
      ) : (
        <div className="Black—Inactive"></div>
      )}
      <div className="AddNewPlayer_field">
        <SideBar burger={burger} />
        <form className="AddNewPlayer_field_add" onSubmit={onSubmit}>
          <div className="AddNewPlayer_field_add_nav">
            <p>
              Player&nbsp;<span>/</span>&nbsp;Add new player
            </p>
          </div>
          <div className="NewTeam_field_add_content">
            {inputValue.avatarUrl ? (
              <label>
                <div className="NewTeam_field_add_content_inputedPhoto">
                  <input type="file" onInput={sendPhoto} />
                  <img
                    src={`${domain}${inputValue.avatarUrl}`}
                    className="photoTeam"
                  />
                  <img
                    src="/assets/icons/add_a_photo_24px_rounded.png"
                    className="camera"
                  />
                </div>
              </label>
            ) : (
              <label>
                <div className="NewTeam_field_add_content_inputPhoto">
                  <input type="file" onInput={sendPhoto} />
                  <img src="/assets/icons/add_a_photo_24px_rounded.png" />
                </div>
              </label>
            )}
            <div className="NewTeam_field_add_content_inputDatas">
              <Input
                label="Name"
                onInput1={(e: ChangeEvent<HTMLInputElement>) => {
                  setValue("name", e.target.value);
                }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInputValue((prevInputValue) => ({
                    ...prevInputValue,
                    name: e.target.value,
                  }))
                }
                value={player && inputValue.name}
              />
              <SelectorUi
                styles={selectStyle}
                style={{
                  width: windowWidth < 376 ? "327px" : "366px",
                  marginTop: 30,
                }}
                label="Position"
                options={positions}
                value={selectedPosition}
                onChange={(selected: any) => {
                  handleChange(selected, setSelectedPosition);
                  setValue("position", selected.value);
                  setInputValue((prevInputValue: any) => ({
                    ...prevInputValue,
                    position: selected.value,
                  }));
                }}
              />
              {player && (
                <SelectorUi
                  styles={selectStyle}
                  style={{
                    width: windowWidth < 376 ? "327px" : "366px",
                    marginTop: 30,
                  }}
                  label="Team"
                  options={teams}
                  value={selectedTeam}
                  onChange={(selected: any) => {
                    handleChange(selected, setSelectedTeam);
                    setValue("team", selected.value);
                    setValue("teamName", selected.label);
                    setInputValue((prevInputValue: any) => ({
                      ...prevInputValue,
                      team: selected.value,
                      teamName: selected.label,
                    }));
                  }}
                />
              )}
              <div style={{ display: "flex", marginTop: "30px" }}>
                <Input
                  label="Height (cm)"
                  value={player && inputValue.height}
                  style={{ width: windowWidth < 376 ? "152px" : "171px" }}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setInputValue((prevInputValue: any) => ({
                      ...prevInputValue,
                      height: e.target.value,
                    }));
                    setValue("height", Number(e.target.value));
                  }}
                />
                <Input
                  label="Weight (kg)"
                  style={{
                    width: windowWidth < 376 ? "152px" : "171px",
                    marginLeft: 12,
                  }}
                  value={player && inputValue.weight}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setInputValue((prevInputValue: any) => ({
                      ...prevInputValue,
                      weight: e.target.value,
                    }));
                    setValue("weight", Number(e.target.value));
                  }}
                />
              </div>
              <div style={{ display: "flex", marginTop: "30px" }}>
                {id.id ? (
                  inputValue.birthday && (
                    <DatePick
                      label="Birthday"
                      style={{ width: windowWidth < 376 ? "152px" : "172px" }}
                      player={player && inputValue.birthday}
                      selected={startDate}
                      onChange={(date: any) => {
                        console.log(new Date(date).toISOString());
                        setInputValue((prevInputValue: any) => ({
                          ...prevInputValue,
                          birthday: new Date(date).toISOString(),
                        }));
                        setValue("birthday", new Date(date).toISOString());
                      }}
                    />
                  )
                ) : (
                  <DatePick
                    label="Birthday"
                    style={{ width: windowWidth < 376 ? "152px" : "172px" }}
                    player={player && inputValue.birthday}
                    selected={startDate}
                    onChange={(date: any) => {
                      setInputValue((prevInputValue: any) => ({
                        ...prevInputValue,
                        birthday: date,
                      }));
                      setValue("birthday", new Date(date).toISOString());
                    }}
                  />
                )}
                <Input
                  label="Number"
                  value={player && inputValue.number}
                  style={{
                    width: windowWidth < 376 ? "152px" : "172px",
                    marginLeft: 12,
                  }}
                  styles={{ marginLeft: 24 }}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setInputValue((prevInputValue: any) => ({
                      ...prevInputValue,
                      number: e.target.value,
                    }));
                    setValue("number", Number(e.target.value));
                  }}
                />
              </div>
              <div
                className="NewTeam_field_add_content_inputDatas_buttons"
                style={{ marginTop: 24 }}
              >
                <Button
                  style={{
                    width: windowWidth < 376 ? "152px" : "172px",
                  }}
                  label="Cancel"
                  onKeyDown={(event: any) => {
                    if (event.keyCode === 13) {
                      event.preventDefault();
                    }
                  }}
                  onClick={() => {
                    navigate("/CardPlayers");
                  }}
                />
                <Button
                  label="Save"
                  style={{
                    width: windowWidth < 376 ? "152px" : "172px",
                    marginLeft: 24,
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewPlayer;

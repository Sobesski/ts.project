import React, { ChangeEvent } from "react";
import Navbar from "../ui/navbar";
import Button from "../ui/button";
import store, { RootState } from "../core/store";
import SideBar from "../ui/SideBar";
import { useForm } from "react-hook-form";
import Api from "../api/Api";
import { useState } from "react";
import Input from "../ui/Input";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const AddNewTeam: React.FC = () => {
  type FormData = {
    name: string;
    foundationYear: number | null;
    division: string;
    conference: string;
    imageUrl: string;
    id?: number;
  };
  const navigate = useNavigate();
  let params = useParams();
  const id = params.id;
  const team = useSelector((state: RootState) => state.team);
  const domain = "http://dev.trainee.dex-it.ru";
  const [burger, setBurgerOn] = useState(false);
  const image = useSelector(
    (state: { team: { imageUrl: string } }) => state.team.imageUrl
  );
  const [img, setImg] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [inputValue, setInputValue] = useState(team);
  let stateData = {
    name: inputValue.name,
    foundationYear: inputValue.foundationYear,
    division: inputValue.division,
    conference: inputValue.conference,
    imageUrl: inputValue.imageUrl,
    ...(id ? { id: id } : {}),
  };
  const sendPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file) {
        let formData = new FormData();
        formData.append("file", file);
        Api.saveImage(formData).then((response) => {
          console.log(response.data);
          store.dispatch({
            type: "team/set",
            payload: { imageUrl: response.data },
          });
          console.log(response.data);
          setImg(response.data);
          setValue("imageUrl", response.data);
        });
      }
    }
  };
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit(async (data) =>
    id
      ? Api.team
          .upDateTeam(Object.assign(stateData, data))
          .then((r) => {
            console.log(r);
          })
          .catch((e) => {
            console.log(e);
          })
          .then(() => navigate("/CardTeams"))
      : Api.team
          .add(Object.assign(stateData, data))
          .then((r) => {
            console.log(r);
          })
          .catch((e) => {
            console.log(e);
          })
          .then(() => navigate("/CardTeams"))
  );
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
  useEffect(() => {
    if (id) {
      Api.team
        .getTeam({
          id: id,
        })
        .then((res) => {
          console.log(res);
          store.dispatch({
            type: "team/set",
            payload: res.data,
          });
        });
    }
  }, []);
  const customStyles = {
    save: {
      width: windowWidth < 376 ? "152px" : "172px",
      backgroundColor: "red",
      color: "white",
      marginLeft: "24px",
      borderRadius: "4px",
      background: "var(--UI-Red, #E4163A)",
      marginTop: 24,
    },
    cancel: {
      width: windowWidth < 376 ? "152px" : "172px",
      backgroundColor: "white",
      borderRadius: "4px",
      color: "var(--UI-Light-Grey, #9C9C9C)",
      marginTop: 24,
    },
  };

  return (
    <div className="NewTeam">
      <Navbar onClick={() => setBurgerOn(!burger)} />
      {burger ? (
        <div className="Black—InactiveOn"></div>
      ) : (
        <div className="Black—Inactive"></div>
      )}
      <div className="NewTeam_field">
        <SideBar burger={burger} />
        <form className="NewTeam_field_add" onSubmit={onSubmit}>
          <div className="NewTeam_field_add_nav">
            <p>
              Teams<span>/</span>Add new team
            </p>
          </div>
          <div className="NewTeam_field_add_content">
            {team.imageUrl ? (
              <label>
                <div className="NewTeam_field_add_content_inputedPhoto">
                  <input type="file" onInput={sendPhoto} />
                  <img
                    src={`${domain}${team.imageUrl}`}
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
                style={{ marginBottom: "24px" }}
                onInput1={(e: ChangeEvent<HTMLInputElement>) => {
                  setValue("name", e.target.value);
                }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInputValue((prevInputValue) => ({
                    ...prevInputValue,
                    name: e.target.value,
                  }))
                }
                value={inputValue.name ? inputValue.name : team.name}
              />
              <Input
                label="Division"
                style={{ marginBottom: "24px" }}
                onInput1={(e: ChangeEvent<HTMLInputElement>) => {
                  setValue("division", e.target.value);
                }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInputValue((prevInputValue) => ({
                    ...prevInputValue,
                    division: e.target.value,
                  }))
                }
                value={
                  inputValue.division ? inputValue.division : team.division
                }
              />
              <Input
                label="Conference"
                style={{ marginBottom: "24px" }}
                onInput1={(e: ChangeEvent<HTMLInputElement>) => {
                  setValue("conference", e.target.value);
                }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInputValue((prevInputValue) => ({
                    ...prevInputValue,
                    conference: e.target.value,
                  }))
                }
                value={
                  inputValue.conference
                    ? inputValue.conference
                    : team.conference
                }
              />
              <Input
                label="Year of foundation"
                style={{ marginBottom: "24px" }}
                onInput1={(e: ChangeEvent<HTMLInputElement>) => {
                  setValue("foundationYear", Number(e.target.value));
                }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInputValue((prevInputValue) => ({
                    ...prevInputValue,
                    foundationYear: Number(e.target.value),
                  }))
                }
                value={
                  inputValue.foundationYear
                    ? inputValue.foundationYear
                    : team.foundationYear
                }
              />
              <div className="NewTeam_field_add_content_inputDatas_buttons">
                <Button
                  style={customStyles.cancel}
                  label="Cancel"
                  type='button'
                  onKeyDown={(event: any) => {
                    if (event.keyCode === 13) {
                      event.preventDefault();
                    }
                  }}
                  onClick={() => {
                    navigate("/CardTeams");
                  }}
                />
                <Button style={customStyles.save} label="Save" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewTeam;

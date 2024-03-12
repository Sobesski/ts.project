import React from "react";
import Input from "../ui/Input";
import Input_eye from "../ui/Input_eye";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/button";
import { Link } from "react-router-dom";
import Api from "../api/Api";
import store from "../core/store";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
const SignUp: React.FC = () => {
  type FormData = {
    userName: string;
    login: string;
    password: string;
  };
  const navigate = useNavigate();
  const [sameAcc, setSameAcc] = useState("");
  const schema = yup
    .object({
      login: yup
        .string()
        .required()
        .matches(/[a-zA-Z]/, "Login must contain Latin letters."),
      password: yup
        .string()
        .required()
        .min(8, "Password is too short - Please, should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password must contain Latin letters."),
      userName: yup
        .string()
        .required()
        .matches(/[a-zA-Z]/, "Username must contain Latin letters."),
    })
    .required();
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: any) => {
    await Api.registration(data)
      .then((r: any) => {
        console.log(r);
        navigate("/AddNewTeam");
      })
      .catch((e) => {
        console.log(e);
        e instanceof SyntaxError &&
          setSameAcc(
            "Such account already exsist. Please choose another name."
          );
        console.error(e);
      });
    await Api.login({
      login: data.login,
      password: data.password,
    }).then((r: any) => {
      console.log(r);
      const token = r.token;
      console.log(token);
      const name: string = r.name;
      localStorage.auth = JSON.stringify(r.data);
      console.log(localStorage.auth);
      store.dispatch({
        type: "auth/loaded",
        payload: { name: name, token: token },
      });
    });
  };
  return (
    <div className="SignUp">
      <div className="registration">
        <form onSubmit={handleSubmit(onSubmit)} className="registration_form">
          <div className="registration_title">Sign Up</div>
          <div className="registration_input1">
            <Input
              label="Name"
              onInput1={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue("userName", e.target.value);
              }}
            />
            <p className="registration_input_error">
              {errors.userName?.message} {sameAcc}
            </p>
          </div>

          <div className="registration_input2">
            <Input
              label="Login"
              onInput1={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue("login", e.target.value);
              }}
            />
            <p className="registration_input_error">{errors.login?.message}</p>
          </div>
          <div className="registration_input_eye1">
            <Input_eye
              label="Password"
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue("password", e.target.value);
              }}
            />
            <p className="registration_input_error">
              {errors.password?.message}
            </p>
          </div>
          <div className="registration_input_eye2">
            <Input_eye label="Enter your password again" />
            <p className="registration_input_error">
              {errors.password?.message}
            </p>
          </div>

          <div className="registration_flex">
            <input type="checkbox" className="registration_checkbox" />
            <div className="registration_accept">I accept the agreement</div>
          </div>
          <div className="registration_button">
            <Button label="Sign up" />
          </div>
          <div className="signup_flex">
            <div className="signup">Not a member yet?</div>
            <Link to="/signin" className="signin_redirect">
              Sign In
            </Link>
          </div>
        </form>
      </div>
      <div className="SignUp_Poster">
        {sameAcc ? (
          <div className="SignIn_poster_error" role="alert">
            <p>{sameAcc}</p>
          </div>
        ) : null}
        <img src="assets/images/7873 1.png" className="SignUp_Poster_img" />
      </div>
    </div>
  );
};

export default SignUp;

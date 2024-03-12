import React from "react";
import Input from "../ui/Input";
import Input_eye from "../ui/Input_eye";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/button";
import { Link } from "react-router-dom";
import Api from "../api/Api";
import { useNavigate } from "react-router-dom";
import store from "../core/store";
const SignIn: React.FC = () => {
  type FormData = {
    login: string;
    password: string;
  };
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit(
    async (data) =>
      await Api.login(data)
        .then((r: any) => {
          console.log(r);
          const token = r.token;
          console.log(token);
          console.log(JSON.stringify(r.token));
          const name: string = r.name;
          localStorage.auth = JSON.stringify({ token: r.token, name: r.name });
          console.log(localStorage.auth);
          store.dispatch({
            type: "auth/loaded",
            payload: { name: name, token: token },
          });
          if (r.status === 401) {
            setError("Wrong login or password. Please, try again");
          } else {
            navigate("/AddNewTeam");
          }
        })
        .catch(function (e) {
          console.log(e);
        })
  );

  return (
    <div className="SignIn">
      <div className="autorisation">
        <div className="autorisation_title">Sign In</div>
        <form onSubmit={onSubmit}>
          <div className="autorisation_titleButton1">
            <Input
              label="Login"
              onInput1={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue("login", e.target.value);
              }}
            />
            <div className="autorisation_error">{error}</div>
          </div>

          <div className="autorisation_titleButton2">
            <Input_eye
              label="Password"
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue("password", e.target.value);
              }}
            />
            <div className="autorisation_error">{error}</div>
          </div>
          <div className="autorisation_titleButton3">
            <Button label="Sign in" />
          </div>
          <div className="signin_flex">
            <div className="signin">Not a member yet?</div>
            <Link to="/signup" className="signup_redirect">
              Sign up
            </Link>
          </div>
        </form>
      </div>
      <div className="SignIn_poster">
        {error ? (
          <div className="SignIn_poster_error" role="alert">
            <p>{error}</p>
          </div>
        ) : null}
        <img src="assets/images/Group.png" className="posterimg" />
      </div>
    </div>
  );
};

export default SignIn;

import { useState } from "react";
interface Input_eyeProps {
  seePassword?: string;
  label?: string;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}
type eyeOn = boolean;
const Input_eye: React.FC<Input_eyeProps> = (props) => {
  const [eyeOn, setEyeOn] = useState<eyeOn>(false);
  function onEyeClick() {
    setEyeOn(!eyeOn);
  }
  return (
    <span className="inpute_type">
      <div className={"input " + (props.seePassword ? "seePassword" : "")}>
        <div className="login">{props.label}</div>
        <div className="input_flex">
          <input
            type={eyeOn ? "text" : "password"}
            className="logininput_eye"
            onInput={props.onInput}
          />
          {
            <span
              className={
                "seePasswordEye" + (eyeOn ? " seePasswordEye--on" : "")
              }
              onClick={onEyeClick}
            ></span>
          }
        </div>
      </div>
    </span>
  );
};
export default Input_eye;

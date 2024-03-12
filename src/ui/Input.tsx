import { type } from "os";

interface props {
  label?: string;
  onInput1?: any;
  value?: any;
  type?: any;
  style?: any;
  onChange?: any;
  styles?: any;
}

const Input: React.FC<props> = (props) => {
  return (
    <div className="input" style={props.style}>
      <span>
        <p className="login" style={props.style}>
          {props.label}
        </p>
        <input
          onInput={props.onInput1}
          type={props.type || "text"}
          className="logininput"
          style={props.style}
          value={props.value}
          onChange={props.onChange}
        />
      </span>
    </div>
  );
};

export default Input;

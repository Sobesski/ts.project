import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
interface DatePickProps {
  player?: Date | string;
  style?: React.CSSProperties;
  label: string;
  onChange?: (date: Date) => void;
  onSecondChange?: (date: Date) => void;
  selected: Date;
}
const DatePick:React.FC<DatePickProps> = (props) => {
  const [startDate, setStartDate] = useState(
    props.player ? new Date(props.player) : new Date()
  );
  return (
    <div style={props.style}>
      <p className="login">{props.label}</p>
      <DatePicker
        showIcon
        selected={startDate}
        onChange={(date: any) => {
          setStartDate(new Date(date));
          props.onChange && props.onChange(date);
          props.onSecondChange && props.onSecondChange(date);
        }}
        className="DatePickerUnset"
      />
    </div>
  );
};

export default DatePick;

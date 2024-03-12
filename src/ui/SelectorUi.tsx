import Select from 'react-select'
import React from 'react';
import { GroupBase } from 'react-select';
import { StylesConfig } from 'react-select';
// label,  onInput, value, multiple, options
// interface selectorProps {
//   options:(number | GroupBase<number>)[]
//   style?: React.CSSProperties
//   p?:React.CSSProperties
//   onChange:() => void;
//   multiple:any;
//   value:number;
//   controlShouldRenderValue:Boolean;
//   styles:StylesConfig<number, any, GroupBase<number> > | string
//   label:string;
// }
const SelectorUi =  (props:any) => {
  
 return (

 <div className="selector" style={props.style}>
  <p className="login" style={props.p}>{props.label}</p>
      <Select options={props.options} onChange={props.onChange} isMulti={props.multiple} value={props.value} controlShouldRenderValue={true} styles={props.styles}/>  
    </div>
    )
};

// Select.defaultProps = {
//   label: '',
//   options: [],
//   multiple: false,
//   // value:''
// }


export default SelectorUi
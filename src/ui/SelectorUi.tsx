import Select from 'react-select'
import React from 'react';
import { GroupBase } from 'react-select';
import { StylesConfig } from 'react-select';
const SelectorUi =  (props:any) => {
  
 return (

 <div className="selector" style={props.style}>
  <p className="login" style={props.p}>{props.label}</p>
      <Select options={props.options} onChange={props.onChange} isMulti={props.multiple} value={props.value} controlShouldRenderValue={true} styles={props.styles}/>  
    </div>
    )
};


export default SelectorUi
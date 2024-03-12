import React from "react";

interface InputSearchProps {
  style?: React.CSSProperties;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputSearch: React.FC<InputSearchProps> = (props) => {
  return (
    <div className="InputSearch" style={props.style}>
      <input
        type="search"
        className="InputSearch_search"
        onChange={props.onChange}
        placeholder="Search..."
        aria-label="Search"
        aria-describedby="search-addon"
      />
      <img src="assets/icons/search.png" />
    </div>
  );
};

export default InputSearch;

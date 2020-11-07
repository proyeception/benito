import React from "react";

import "./Options.css";

interface Option {
  name:String,
  handler:any,
  id: number
}

const Options = (props:any) => {
  return (
    <div className="options">
      <h1 className="options-header">{props.title}</h1>
      <div className="options-container">
        {props.options.map((option : Option) => {
          return (
            <div
              className="option-item"
              onClick={() => option.handler(option.name)}
              key={option.id}
            >
              {option.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Options;

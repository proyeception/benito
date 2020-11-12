import React from "react";

import "./Options.css";

interface Option {
  name:String,
  handler:any,
  id: number,
  color: string,
  crooped: boolean
}

const Options = (props:any) => {
  return (
    <div className="options">
      <h1 className="options-header">{props.title}</h1>
      <div className="options-container">
        {props.options.map((option : Option) => {
          let styles: any = {color:props.color, borderColor: props.color, marginLeft: "auto"}
          if(props.cropped){
            styles = {color:props.color, borderColor: props.color, marginLeft: "auto", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}
          } 
          return (
            <div
              className="option-item"
              onClick={() => option.handler(option.name, option.id)}
              key={option.id}
              style={styles}
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

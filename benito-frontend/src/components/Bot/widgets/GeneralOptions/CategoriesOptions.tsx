import React from "react";

import Options from "../Options/Options";

const GeneralOptions = (props:any) => {
  const options = [
    {
      name: "Bioinformatica",
      handler: props.actionProvider.handleFlightsChoice,
      id: 1
    },
    {
      name: "Inteligencia Artificial",
      handler: props.actionProvider.handleParkingOptions,
      id: 3
    },
    {
      name: "Vinos",
      handler: props.actionProvider.handleAirport,
      id: 5
    } 
  ];
  return <Options options={options} {...props} />;
};

export default GeneralOptions;

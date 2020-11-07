import React from "react";

import Options from "../Options/Options";

const GeneralOptions = (props:any) => {
  const options = [
    {
      name: "Estoy buscando un proyecto",
      handler: props.actionProvider.handleCategoriesChoice,
      id: 1
    },
    {
      name: "¿Qué es proyectate?",
      handler: props.actionProvider.handleProyectateQuestion,
      id: 2
    },
    {
      name: "¿Qué es proyectabot?",
      handler: props.actionProvider.handleProyectabotQuestion,
      id: 3
    },
    {
      name: "Quiero reportar un error",
      handler: props.actionProvider.handleBugNotification,
      id: 4
    },
    {
      name: "¿Cómo cargo un proyecto?",
      handler: props.actionProvider.handleProjectUploadQuestion,
      id: 5
    } 
  ];
  return <Options options={options} {...props} />;
};

export default GeneralOptions;

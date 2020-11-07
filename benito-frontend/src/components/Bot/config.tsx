import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import GeneralOptions from "./widgets/GeneralOptions/GeneralOptions";
import CategoriesOptions from "./widgets/GeneralOptions/CategoriesOptions";
import ProjectOptions from "./widgets/GeneralOptions/ProjectOptions";

const botName = "Proyectabot";

const config = {
  botName: botName,
  lang: "es",
  initialMessages: [
    createChatBotMessage(`Hola, soy ${botName}. ¿En qué te puedo ayudar?`,
    {
      widget: "generalOptions",
      delay: 500,
    }
    ),
  ],
  widgets: [
    {
      widgetName: "generalOptions",
      widgetFunc: (props:any) => <GeneralOptions {...props} />,
    },
    {
      widgetName: "categoriesOptions",
      widgetFunc: (props:any) => <CategoriesOptions {...props} />,
    },
    {
      widgetName: "ProjectOptions",
      widgetFunc: (props:any) => <ProjectOptions {...props} />,
    },
  ],
};

export default config;

import React, { useState } from "react"
//import { ConditionallyRender } from "react-util-kit";
import {Chatbot} from "react-chatbot-kit"
import ActionProvider from "./ActionProvider"
import MessageParser from "./MessageParser"
import Fab from '@material-ui/core/Fab';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';

import "../../assets/scss/bot/bot.scss"
import { RootState } from "../../reducers"
import { hot } from "react-hot-loader"
import { connect } from "react-redux"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { SessionState } from "../../store/session/types"
import { createChatBotMessage } from "react-chatbot-kit";
import GeneralOptions from "./widgets/GeneralOptions/GeneralOptions";
import CategoriesOptions from "./widgets/GeneralOptions/CategoriesOptions";
import ProjectOptions from "./widgets/GeneralOptions/ProjectOptions";
import MoreHelpOptions from "./widgets/GeneralOptions/MoreHelpOptions"
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import ReportErrorOption from "./widgets/GeneralOptions/ReportErrorOption";

interface ProyectabotProps extends RouteComponentProps {
  session?: SessionState;
}

const Proyectabot = (props: ProyectabotProps) => {


  const [showChatbot, toggleChatbot] = useState(true);


    const handleClick = () => {
      toggleChatbot((showChatbot) => !showChatbot);
    };

    let color: string = "#c41234"
  if(props.session && props.session.isLoggedIn  && props.session.selectedOrganization){
    color = props.session.selectedOrganization.color
  }

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: color,
        main: color,
        dark: color,
        contrastText: "#fff",
      },
    },
  });

  const botName = "Proyectabot";

  const config = {
    botName: botName,
    lang: "es",
    customStyles: {
      botMessageBox: {
        backgroundColor: color,
      },
      chatButton: {
        backgroundColor: color,
      },
    },
    initialMessages: [
      createChatBotMessage(`Hola, soy ${botName}. ¿En qué te puedo ayudar?`,
      {
        withAvatar: false,
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
        widgetName: "moreHelpOptions",
        widgetFunc: (props:any) => <MoreHelpOptions {...props} />,
      },
      {
        widgetName: "ProjectOptions",
        widgetFunc: (props:any) => <ProjectOptions {...props} />,
      },
      {
        widgetName: "reportErrorOption",
        widgetFunc: (props:any) => <ReportErrorOption {...props} />,
      },
    ],
  };


    return(
    <div> 
      <div className = "app-chatbot-button" style={{backgroundColor: color}}>
      <ThemeProvider theme={theme}>
        <Fab color="primary" aria-label= "expand" onClick = {handleClick}>
          <UpIcon />
        </Fab>
      </ThemeProvider>
      </div>
      <Collapse in = {!showChatbot} className = "app-chatbot-container">
                <Chatbot
                  config={config}
                  messageParser={MessageParser}
                  actionProvider={ActionProvider}            
                />
        </Collapse>
  </div>
);
}
  
const mapStateToProps = (rootState: RootState) => {
  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(Proyectabot)));


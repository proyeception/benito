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
import UploadOptions from "./widgets/GeneralOptions/UploadOptions";
import MoreHelpOptions from "./widgets/GeneralOptions/MoreHelpOptions"
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import ReportErrorOption from "./widgets/GeneralOptions/ReportErrorOption";
import { EmojiEmotions } from "@material-ui/icons";
import QuestionOptions from "./widgets/GeneralOptions/QuestionOptions";
import InitialOptions from "./widgets/GeneralOptions/InitialOptions";
import store from "../../store";
import { updateSessionState, updateSessionStateChatbot } from "../../actions/session";
import OtherDoubt from "./widgets/GeneralOptions/OtherDoubt";

interface ProyectabotProps extends RouteComponentProps {
  session?: SessionState;
}

const Proyectabot = (props: ProyectabotProps) => {


    const handleClick = () => {
      store.dispatch(updateSessionStateChatbot(!props.session!.chatBotOpen))
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
    state: {canWrite:false},
    initialMessages: [
      createChatBotMessage(`Hola, soy ${botName}`,
      {
        withAvatar: true,
        loading: true,
        terminateLoading: true,
        widget: "initial"
      }
      ),
    ],
    widgets: [
      {
        widgetName: "initial",
        widgetFunc: (props:any) => <InitialOptions {...props} />,
      },
      {
        widgetName: "generalOptions",
        widgetFunc: (props:any) => <GeneralOptions {...props} />,
      },
      {
        widgetName: "questionOptions",
        widgetFunc: (props:any) => <QuestionOptions {...props} />,
      },
      {
        widgetName: "categoriesOptions",
        widgetFunc: (props:any) => <CategoriesOptions {...props} />,
      },
      {
        widgetName: "projectOptions",
        widgetFunc: (props:any) => <ProjectOptions {...props} />,
      },
      {
        widgetName: "uploadOptions",
        widgetFunc: (props:any) => <UploadOptions {...props} />,
      },
      {
        widgetName: "moreHelpOptions",
        widgetFunc: (props:any) => <MoreHelpOptions {...props} />,
      },
      {
        widgetName: "reportErrorOption",
        widgetFunc: (props:any) => <ReportErrorOption {...props} />,
      },
      {
        widgetName: "otherDoubt",
        widgetFunc: (props:any) => <OtherDoubt {...props} />,
      },
    ],
  };


    return(
    <div> 
      <div className = "app-chatbot-button" style={{backgroundColor: color}}>
      <ThemeProvider theme={theme}>
        <Fab color="primary" aria-label= "expand" onClick = {handleClick}>
          <EmojiEmotions />
        </Fab>
      </ThemeProvider>
      </div>
      <Collapse in = {props.session!.chatBotOpen} className = "app-chatbot-container">
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


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
import { RouteComponentProps, withRouter, Redirect } from "react-router-dom"
import { SessionState } from "../../store/session/types"
import { createChatBotMessage } from "react-chatbot-kit";
import GeneralOptions from "./widgets/GeneralOptions/GeneralOptions";
import CategoriesOptions from "./widgets/GeneralOptions/CategoriesOptions";
import ProjectOptions from "./widgets/GeneralOptions/ProjectOptions";
import UploadOptions from "./widgets/GeneralOptions/UploadOptions";
import MoreHelpOptions from "./widgets/GeneralOptions/MoreHelpOptions"
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import ReportErrorOption from "./widgets/GeneralOptions/ReportErrorOption";
import CategoryProjectsOption from "./widgets/GeneralOptions/CategoryProjectsOption";
import { CategoryReference } from "../../types";
import { EmojiEmotions, Sms } from "@material-ui/icons";
import QuestionOptions from "./widgets/GeneralOptions/QuestionOptions";
import InitialOptions from "./widgets/GeneralOptions/InitialOptions";
import store from "../../store";
import { updateSessionState, updateSessionStateChatbot } from "../../actions/session";
import OtherDoubt from "./widgets/GeneralOptions/OtherDoubt";
import RedirectToProject from "./widgets/GeneralOptions/RedirectToProject";
import ProyectabotAvatar from "./components/ProyectabotAvatar"

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
    /*customComponents: {
      botAvatar: (props:any) => <ProyectabotAvatar {...props} />,
    },*/
    state: {canWrite:false, selectedCategory: "", selectedProject: ""},
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
        mapStateToProps: ["selectedCategory"],
      },
      {
        widgetName: "questionOptions",
        widgetFunc: (props:any) => <QuestionOptions {...props} />,
      },
      {
        widgetName: "categoriesOptions",
        widgetFunc: (props:any) => <CategoriesOptions {...props} />,
        mapStateToProps: ["selectedCategory"],
      },
      {
        widgetName: "projectOptions",
        widgetFunc: (props:any) => <ProjectOptions {...props} />,
        mapStateToProps: ["selectedCategory", "selectedProject"],
      },
      {
        widgetName: "uploadOptions",
        widgetFunc: (props:any) => <UploadOptions {...props} />,
        mapStateToProps: ["selectedCategory"],
      },
      {
        widgetName: "moreHelpOptions",
        widgetFunc: (props:any) => <MoreHelpOptions {...props} />,
        mapStateToProps: ["selectedCategory"],
      },
      {
        widgetName: "reportErrorOption",
        widgetFunc: (props:any) => <ReportErrorOption {...props} />,
        mapStateToProps: ["selectedCategory"],
      },
      {
        widgetName: "categoryProjectsOption",
        widgetFunc: (props:any) => <CategoryProjectsOption {...props} />,
        mapStateToProps: ["selectedCategory", "selectedProject"],
      },
      {
        widgetName: "otherDoubt",
        widgetFunc: (props:any) => <OtherDoubt {...props} />,
      },
      {
        widgetName: "redirectToProject",
        widgetFunc: (props:any) => <RedirectToProject {...props} />,
        mapStateToProps: ["selectedCategory", "selectedProject"],
      },
    ],
  };


    return(
    <div> 
      <div className = "app-chatbot-button" style={{backgroundColor: color}}>
      <ThemeProvider theme={theme}>
        <Fab color="primary" aria-label= "expand" onClick = {handleClick}>
          <Sms />
        </Fab>
      </ThemeProvider>
      </div>
      <Collapse in = {props.session!.chatBotOpen} className = "app-chatbot-container">
                <Chatbot
                  headerText="Conversación con Proyectabot" 
                  placeholderText="Escribí acá para conversar"
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


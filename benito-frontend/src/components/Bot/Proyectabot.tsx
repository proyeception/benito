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
import CategoryProjectsOption from "./widgets/GeneralOptions/CategoryProjectsOption";
import { CategoryReference } from "../../types";

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
    state: {canWrite:false, selectedCategory: ""},
    initialMessages: [
      createChatBotMessage(`Hola, soy ${botName}`,
      {
        withAvatar: true,
        loading: true,
        terminateLoading: true,
        delay: 500
      }
      ),
      createChatBotMessage(`¿En qué te puedo ayudar?`,
      {
        withAvatar: true,
        loading: true,
        terminateLoading: true,
        delay: 1500,
        widget: "generalOptions",
      }
      ),
    ],
    widgets: [
      {
        widgetName: "generalOptions",
        widgetFunc: (props:any) => <GeneralOptions {...props} />,
        mapStateToProps: ["selectedCategory"],
      },
      {
        widgetName: "categoriesOptions",
        widgetFunc: (props:any) => <CategoriesOptions {...props} />,
        mapStateToProps: ["selectedCategory"],
      },
      {
        widgetName: "projectOptions",
        widgetFunc: (props:any) => <ProjectOptions {...props} />,
        mapStateToProps: ["selectedCategory"],
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
        mapStateToProps: ["selectedCategory"],
      }
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


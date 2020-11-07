import React, { useState } from "react"
//import { ConditionallyRender } from "react-util-kit";
import {Chatbot} from "react-chatbot-kit"
import config from "./config"
import ActionProvider from "./ActionProvider"
import MessageParser from "./MessageParser"
import Fab from '@material-ui/core/Fab';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';

import "../../assets/scss/bot/bot.scss"

const Proyectabot = (props: any) => {

    const [showChatbot, toggleChatbot] = useState(true);

    const handleClick = () => {
      toggleChatbot((showChatbot) => !showChatbot);
    };

    return(
    <div> 
      <div className = "app-chatbot-button">
      <Fab color = "secondary" aria-label= "expand" onClick = {handleClick}>
        <UpIcon />
      </Fab>
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

export default Proyectabot
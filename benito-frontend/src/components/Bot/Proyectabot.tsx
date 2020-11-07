import React, { useState } from "react"
//import { ConditionallyRender } from "react-util-kit";
import {Chatbot} from "react-chatbot-kit"
import config from "./config"
import ActionProvider from "./ActionProvider"
import MessageParser from "./MessageParser"

import "../../assets/scss/bot/bot.scss"

const Proyectabot = (props: any) => {

    const [showChatbot, toggleChatbot] = useState(true);

    return(<div> <div className="app-chatbot-container">
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
              
            />
      </div>

      <button
        className="app-chatbot-button"
        onClick={() => toggleChatbot((prev) => !prev)}
      >asdasdasd
      </button>
  </div>
);
        }

export default Proyectabot
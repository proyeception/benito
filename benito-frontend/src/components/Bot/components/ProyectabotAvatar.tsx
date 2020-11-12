import React from "react";
import avatar from "../../../assets/img/proyectate/proyectabot.png"

import { ReactComponent as ProyectabotIcon } from "../../../assets/img/proyectate/ProyectabotAvatar.svg";

const FlightBotAvatar = () => {
  return (
    <div className="react-chatbot-kit-chat-bot-avatar">
      <div className="react-chatbot-kit-chat-bot-avatar-container" style={{backgroundColor: "white"}}>
        <img src={avatar} alt="Proyectabot" style={{width: "inherit", height: "-webkit-fill-available"}}/>
      </div>
    </div>
  );
};

export default FlightBotAvatar;
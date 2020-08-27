import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Person } from "../../types";

type Props = {
  user: Person;
};

const Picture = (props: Props) => (
  <div>
    <div className="qui-user-profile-picture-container">
      <img
        src={
          props.user.profilePicUrl?.valueOf() ||
          "http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
        }
        alt="avatar"
        className="w-100 img-circle"
      />
    </div>
    <div className="font-weight-bold mt-3 font-size-24-md">
      {props.user.fullName}
    </div>
    <div className="text-muted font-size-20-md">{props.user.username}</div>
    <div className="font-size-14-md mt-md-3">carlitosmarx@proyectate.com</div>
  </div>
);

export default hot(module)(Picture);

import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Person } from "../../types";
import Contact from "./Contact";
import { faPhone, faMailBulk } from "@fortawesome/free-solid-svg-icons";

type Props = {
  user: Person;
};

const Profile = (props: Props) => (
  <div>
    <div className="w-100 center-horizontally">
      <div className="qui-user-profile-picture-container">
        <img
          src={
            props.user.profilePicUrl?.valueOf() ||
            "http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
          }
          alt="avatar"
          className="w-100 img-circle text-center"
        />
      </div>
    </div>
    <div className="font-weight-bold mt-3 font-size-24-md center-horizontally">
      {props.user.fullName}
    </div>
    <div className="text-muted font-size-18-md center-horizontally">
      {props.user.username}
    </div>
    {props.user.contact?.email && (
      <Contact icon={faMailBulk} text={props.user.contact.email} />
    )}
    {props.user.contact?.phone && (
      <Contact icon={faPhone} text={props.user.contact.phone} />
    )}
  </div>
);

export default hot(module)(Profile);

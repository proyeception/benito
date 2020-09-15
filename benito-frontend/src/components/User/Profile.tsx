import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Person } from "../../types";
import Contact from "./Contact";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

type Props = {
  user: Person;
  userId?: String;
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
    <div className="font-weight-bold mt-3 font-size-24 center-horizontally">
      {props.user.fullName}
    </div>
    <div className="text-muted font-size-18 center-horizontally">
      {props.user.username}
    </div>
    {props.userId == props.user.id ? (
      <Link to="/settings/profile">
        <button
          className="btn btn-primary btn-block font-weight-bolder mt-3"
          type="button"
        >
          Editar perfil
        </button>
      </Link>
    ) : (
      <div />
    )}
    <div className="mt-4">
      {props.user.contact?.mail && (
        <Contact icon={faEnvelope} text={props.user.contact.mail} />
      )}
      {props.user.contact?.phone && (
        <Contact icon={faPhone} text={props.user.contact.phone} />
      )}
    </div>
  </div>
);

const mapStateToProps = (rootState: RootState) => {
  return {
    userId: rootState.session?.userId,
  };
};

export default hot(module)(connect(mapStateToProps)(Profile));

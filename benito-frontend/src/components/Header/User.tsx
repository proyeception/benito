import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import { clearSession, startLogin } from "../../functions/session";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import { googleClientId } from "../../config";
import { LoginData } from "../../types";

interface Props extends RouteComponentProps {
  token?: String;
  userId?: String;
  profilePicture?: String;
  isLoggedIn?: Boolean;
  fetching: Boolean;
}

const googleIcon =
  "https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_1/v1533665793/ogdensdorg/p6ckkwxkxi8zd03ja8h0/GoogleButton.png";
const noProfilePicture = "https://simpleicon.com/wp-content/uploads/user1.png";

const User = (props: Props) => {
  if (props.fetching) {
    return <div className="qui-header-user"></div>;
  }

  if (props.isLoggedIn) {
    return (
      <div className="qui-header-user center-vertically justify-content-end pr-md-5">
        <div
          data-tip
          data-for="header-user-menu"
          data-event="click"
          className="qui-user-icon-container"
        >
          <img
            className="img-circle"
            src={props.profilePicture?.valueOf() || noProfilePicture}
          />
        </div>
        <ReactTooltip
          id="header-user-menu"
          clickable={true}
          place="bottom"
          effect="solid"
          type="light"
          globalEventOff="click"
        >
          <Link
            to={`/students/${props.userId}`}
            style={{ textDecoration: "none" }}
          >
            <div className="qui-text font-size-18-md">Mi perfil</div>
          </Link>
          <div
            className="qui-text font-size-18-md cursor-pointer"
            onClick={() => {
              clearSession(props.token);
              props.history.go(0);
            }}
          >
            Cerrar sesión
          </div>
        </ReactTooltip>
      </div>
    );
  }

  return (
    <GoogleLogin
      clientId={googleClientId}
      render={(renderProps) => (
        <div
          onClick={renderProps.onClick}
          className="qui-header-user center-vertically justify-content-end pr-md-5 cursor-pointer"
        >
          <div className="qui-user-icon-container">
            <img className="img-circle" src={googleIcon} />
          </div>
        </div>
      )}
      onSuccess={(res) => {
        let googleInfo = res as GoogleLoginResponse;
        let loginData: LoginData = {
          googleUserId: googleInfo.googleId,
          fullName: googleInfo.profileObj.name,
          profilePictureUrl: googleInfo.profileObj.imageUrl,
          mail: googleInfo.profileObj.email,
          token: googleInfo.tokenId,
        };
        startLogin(loginData, props.history);
      }}
      onFailure={console.log}
    ></GoogleLogin>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return rootState.session;
};

export default hot(module)(withRouter(connect(mapStateToProps)(User)));

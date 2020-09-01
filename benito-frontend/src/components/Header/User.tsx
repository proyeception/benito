import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import { clearSession, startLogin } from "../../functions/session";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props extends RouteComponentProps {
  token?: String;
  userId?: String;
  profilePicture?: String;
  isLoggedIn?: Boolean;
  fetching: Boolean;
}

const googleIcon =
  "https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_1/v1533665793/ogdensdorg/p6ckkwxkxi8zd03ja8h0/GoogleButton.png";
googleIcon;
const noProfilePicture = "https://simpleicon.com/wp-content/uploads/user1.png";

const User = (props: Props) => {
  if (props.fetching) {
    return <div className="qui-header-user"></div>;
  }

  if (props.isLoggedIn) {
    return (
      <div
        onClick={() => {
          clearSession(props.token);
          props.history.go(0);
        }}
        className="qui-header-user center-vertically justify-content-end pr-md-5"
      >
        <div className="qui-user-icon-container">
          <img
            className="img-circle"
            src={props.profilePicture?.valueOf() || noProfilePicture}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => startLogin()}
      className="qui-header-user center-vertically justify-content-end pr-md-5"
    >
      <div className="qui-user-icon-container">
        <img className="img-circle" src={googleIcon} />
      </div>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return rootState.session;
};

export default hot(module)(withRouter(connect(mapStateToProps)(User)));

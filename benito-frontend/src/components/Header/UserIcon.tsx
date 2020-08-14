import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import store from "../../store";
import { Link } from "react-router-dom";

const userNotLoggedInIcon =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png";

const UserIcon = (props: { isLoggedIn: Boolean }) => {
  if (props.isLoggedIn) {
    return (
      <div className="qui-user-image-crop center">
        <img
          className="qui-user-image"
          src={store.getState().user.data.profilePicUrl.valueOf()}
        />
      </div>
    );
  } else {
    return (
      <Link to="/login" className="center">
        <img
          className="qui-user-image invert-colors"
          src={userNotLoggedInIcon}
        />
      </Link>
    );
  }
};

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.login.isLoggedIn,
});

export default hot(module)(connect(mapStateToProps)(UserIcon));

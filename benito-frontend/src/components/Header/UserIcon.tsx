import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import store from "../../store";
import { Link } from "react-router-dom";

const userNotLoggedInIcon =
  "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png";

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

import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { mapRoleToCollection } from "../../../functions/user";
import withUser from "../../../hooks/withUser";
import { RootState } from "../../../reducers";
import { Role } from "../../../types";
import Loader from "../../Common/Loader";
import LoginRequired from "../../Common/LoginRequired";
import "./styles.scss";

type Props = {
  userId: String;
  role: Role;
};

const Settings = (props: Props) => {
  const render = () => {
    const [user, fetching, isError] = withUser(
      props.userId,
      mapRoleToCollection(props.role)
    );

    if (isError) {
      console.warn("No, loco pará!!");
    }

    if (fetching) {
      return (
        <div className="center">
          <Loader />
        </div>
      );
    }
    return <div>{user.fullName} </div>;
  };

  return <LoginRequired render={render} />;
};

const mapStateToProps = (rootState: RootState) => {
  return {
    userId: rootState.session.userId,
    role: rootState.session.role,
  };
};

export default hot(module)(connect(mapStateToProps)(Settings));

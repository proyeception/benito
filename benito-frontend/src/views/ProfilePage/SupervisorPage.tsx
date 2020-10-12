import React from "react";
import { hot } from "react-hot-loader";
import ProfilePage from "./ProfilePage";

const SupervisorPage = (props: any) => (
  <ProfilePage role={"SUPERVISOR"} {...props} />
);

export default hot(module)(SupervisorPage);

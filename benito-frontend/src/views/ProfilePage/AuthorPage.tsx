import React from "react";
import { hot } from "react-hot-loader";
import ProfilePage from "./ProfilePage";

const AuthorPage = (props: any) => <ProfilePage role={"AUTHOR"} {...props} />;

export default hot(module)(AuthorPage);

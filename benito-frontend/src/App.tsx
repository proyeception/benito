import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Redirect } from "react-router-dom";

const App = (_: any) => <Redirect to="/login" />;

export default hot(module)(App);

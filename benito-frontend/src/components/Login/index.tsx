import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { googleClientId } from "../../config";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import { LoginData } from "../../types";
import { startLogin } from "../../functions/session";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props extends RouteComponentProps {
  render?(props: { onClick: () => void; disabled?: Boolean }): JSX.Element;
  loginPath: String;
}

const Login = (props: Props) => (
  <GoogleLogin
    clientId={googleClientId}
    render={props.render}
    onSuccess={(res) => {
      let googleInfo = res as GoogleLoginResponse;
      let loginData: LoginData = {
        googleUserId: googleInfo.googleId,
        fullName: googleInfo.profileObj.name,
        profilePictureUrl: googleInfo.profileObj.imageUrl,
        mail: googleInfo.profileObj.email,
        token: googleInfo.tokenId,
      };
      startLogin(loginData, props.history, props.loginPath);
    }}
    onFailure={console.log}
  ></GoogleLogin>
);

export default hot(module)(withRouter(Login));

import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import Social from "./Social";

const githubLogo = "https://image.flaticon.com/icons/png/512/37/37318.png";
const twitterLogo = "https://image.flaticon.com/icons/png/512/23/23931.png";
const facebookLogo = "https://image.flaticon.com/icons/png/512/20/20673.png";
const instagramLogo =
  "https://cdn.icon-icons.com/icons2/1898/PNG/512/instagram_121064.png";

const Footer = (_: any) => (
  <div className="qui-footer mt-3 pb-3 pt-3 text-muted">
    <div className="container-fluid container-md">
      <div className="row justify-content-around">
        <div className="col-6 col-md-9 center-vertically">
          ©Proyectate 2020-2020
        </div>
        <div className="mt-3 mt-sm-0 col-12 col-md-3">
          <div className="row justify-content-between">
            <Social
              iconUrl={githubLogo}
              alt="Github"
              socialUrl="https://github.com/proyeception"
            />
            <Social
              iconUrl={twitterLogo}
              alt="Twitter"
              socialUrl="https://twitter.com/proyectate"
            />
            <Social
              iconUrl={facebookLogo}
              alt="Facebook"
              socialUrl="https://facebook.com/proyectate"
            />
            <Social
              iconUrl={instagramLogo}
              alt="Instagram"
              socialUrl="https://instagram.com/proyectate"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default hot(module)(Footer);

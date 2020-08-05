import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

const githubLogo = "https://image.flaticon.com/icons/png/512/37/37318.png";
const twitterLogo = "https://image.flaticon.com/icons/png/512/23/23931.png";
const facebookLogo = "https://image.flaticon.com/icons/png/512/20/20673.png";
const instagramLogo =
  "https://cdn.icon-icons.com/icons2/1898/PNG/512/instagram_121064.png";

const Footer = (_: any) => (
  <div className="qui-footer mt-3 pb-3 pt-3 text-muted">
    <div className="container">
      <div className="row justify-content-around">
        <div className="col-5 col-md-9 center-vertically">
          ©Proyectate 2020-2020
        </div>
        <div className="col-7 col-md-3">
          <div className="row justify-content-between">
            <div className="col-3">
              <img
                src={githubLogo}
                alt="Github"
                className="qui-footer-social"
              />
            </div>
            <div className="col-3">
              <img
                src={twitterLogo}
                alt="Twitter"
                className="qui-footer-social"
              />
            </div>
            <div className="col-3">
              <img
                src={facebookLogo}
                alt="Facebook"
                className="qui-footer-social"
              />
            </div>
            <div className="col-3">
              <img
                src={instagramLogo}
                alt="Instagram"
                className="qui-footer-social"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default hot(module)(Footer);

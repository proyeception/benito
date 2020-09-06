import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import Social from "./Social";
import { socialMedia } from "../../constants";

const { twitter, facebook, instagram, github } = socialMedia;

const Footer = (_: any) => (
  <div className="bg-white font-size-11 font-size-14-md pb-3 pt-3 text-muted border-top">
    <div className="container-fluid container-md">
      <div className="row justify-content-around">
        <div className="col-6 col-md-8 center-vertically">
          ©Proyectate 2020-2020
        </div>
        <div className="mt-3 mt-sm-0 col-12 col-md-4">
          <div className="row justify-content-between">
            <Social
              iconUrl={github.logo}
              alt="Github"
              socialUrl="https://github.com/proyeception"
            />
            <Social
              iconUrl={twitter.logo}
              alt="Twitter"
              socialUrl="https://twitter.com/proyectate"
            />
            <Social
              iconUrl={facebook.logo}
              alt="Facebook"
              socialUrl="https://facebook.com/proyectate"
            />
            <Social
              iconUrl={instagram.logo}
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

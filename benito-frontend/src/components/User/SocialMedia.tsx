import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

type Props = {};

const SocialMedia = (_: Props) => (
  <div>
    <div className="font-weight-bold font-size-18-md">Social Media</div>
    <a href="https://twitter.com" target="_blank">
      <img
        src="https://image.flaticon.com/icons/png/512/23/23931.png"
        alt="Twitter"
        className="qui-footer-social"
      />
    </a>
  </div>
);

export default hot(module)(SocialMedia);

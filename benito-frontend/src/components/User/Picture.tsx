import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

type Props = {};

const Picture = (_: Props) => (
  <div>
    <img
      src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
      alt="avatar"
      className="w-100 img-circle"
    />
    <div className="font-weight-bold mt-3 font-size-24-md">Carlos Marx</div>
    <div className="text-muted font-size-20-md">carlitosmarx</div>
    <div className="font-size-14-md mt-md-3">carlitosmarx@proyectate.com</div>
  </div>
);

export default hot(module)(Picture);

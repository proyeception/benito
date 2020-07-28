import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { benitoHost } from "../../config";
import { Project } from "../../types";

type Props = {};
type State = {};

class Remarkable extends React.Component<Props, State> {
  constructor(props: Props, ctx: any) {
    super(props, ctx);
    this.state = {};
  }

  componentDidMount() {
    let config: AxiosRequestConfig = {
      method: "GET",
      url: `${benitoHost}/benito/projects/top-10`,
    };

    axios(config).then((_: AxiosResponse<Array<Project>>) => {});
  }

  render() {
    return <div></div>;
  }
}

export default hot(module)(Remarkable);

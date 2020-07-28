import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { benitoHost } from "../../config";
import { Project } from "../../types";
import store from "../../store";
import { updateRemarkableProjects } from "../../actions/home/index";

type Props = {};
type State = {};

class RemarkableProjects extends React.Component<Props, State> {
  constructor(props: Props, ctx: any) {
    super(props, ctx);
    this.state = {};
  }

  componentDidMount() {
    let config: AxiosRequestConfig = {
      method: "GET",
      url: `${benitoHost}/benito/projects/top-10`,
    };

    axios(config)
      .then((response: AxiosResponse<Array<Project>>) => response.data)
      .then((projects) => store.dispatch(updateRemarkableProjects(projects)))
      .catch(console.error);
  }

  render() {
    return <div></div>;
  }
}

export default hot(module)(RemarkableProjects);

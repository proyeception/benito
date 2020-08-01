import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { benitoHost } from "../../config";
import store from "../../store";
import { Project } from "../../types";
import { updateRemarkableProjects } from "../../actions/home";

type Props = {};

const FeaturedGallery = (props: Props) => {
  useEffect(() => {
    let config: AxiosRequestConfig = {
      method: "GET",
      url: `${benitoHost}/benito/projects/top-10`,
    };

    axios(config)
      .then((response: AxiosResponse<Array<Project>>) => response.data)
      .then((projects) => store.dispatch(updateRemarkableProjects(projects)))
      .catch(console.error);
  }, []);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number, _: any) => {
    setIndex(selectedIndex);
  };
};

export default hot(module)(FeaturedGallery);

import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { benitoHost } from "../../config";
import { Project } from "../../types";
import store from "../../store";
import { updateRemarkableProjects } from "../../actions/home/index";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import RemarkableProject from "./FeaturedProject";

type Props = {
  remarkableProjects: Array<Project>;
};

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

  return (
    <div className="container mt-3">
      <div className="text-center pt-3 pb-3 text-uppercase font-weight-bold qui-remarkable-title">
        Los más destacados
      </div>
      {props.remarkableProjects.length > 0 && (
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {props.remarkableProjects.map((project, index) => (
            <Carousel.Item key={index}>
              <RemarkableProject project={project} />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    remarkableProjects: state.home.remarkableProjects,
  };
};

export default hot(module)(connect(mapStateToProps)(FeaturedGallery));

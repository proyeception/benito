import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import Separator from "../Project/Separator";
import Profile from "./Profile";
import Organizations from "./Organizations";
import SocialMedia from "./SocialMedia";
import ProjectsTab from "./ProjectsTab";
import FadeIn from "../Common/FadeIn";
import { RouteChildrenProps } from "react-router-dom";
import { Person } from "../../types";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { benitoHost } from "../../config";
import Loader from "../Common/Loader";

type MatchParams = {
  userId: string;
};

interface Props extends RouteChildrenProps<MatchParams> {
  collection: String;
}

const User = (props: Props) => {
  const [user, setUser] = useState<Person>(null);
  const [isError, setIsError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  setNotFound;

  useEffect(() => {
    let config: AxiosRequestConfig = {
      method: "GET",
      url: `${benitoHost}/benito/${props.collection}/${props.match.params.userId}`,
    };

    axios
      .request<Person>(config)
      .then((res) => res.data)
      .then(setUser)
      .catch((e: { response: AxiosResponse }) => {
        setIsError(true);
        if (e.response.status == 404) {
          setNotFound(true);
        }
        console.error(e.response);
      });
  }, []);

  if (isError) {
    if (notFound) {
      return (
        <div className="container mt-5 mb-5">
          <div className="alert alert-danger font-size-32-md text-center">
            No se encontró el usuario que estabas buscando.
          </div>
        </div>
      );
    }
    return (
      <div className="container mt-5 mb-5">
        <div className="alert alert-danger font-size-32-md text-center">
          Hubo un error buscando este usuario, intentá de nuevo más tarde.
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="qui-min-height center">
        <Loader />
      </div>
    );
  }

  return (
    <FadeIn className="qui-min-height">
      <div className="container-fluid un-mb-md-1">
        <div className="row">
          <div className="col-12 col-md-3 pl-md-4 pr-md-4 pt-5 pt-md-5 bg-white border-right qui-min-height">
            <Profile user={user} />
            <Separator
              display="d-block"
              color="light"
              marginRight={1}
              marginLeft={1}
            />
            <Organizations user={user} />
            <Separator
              color="light"
              display={user.socials.length > 0 ? "d-block" : "d-none"}
              marginRight={1}
              marginLeft={1}
            />
            <SocialMedia user={user} />
          </div>
          <div className="qui-user-profile-projects col-12 col-md-9 pt-md-5">
            <ProjectsTab user={user} />
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default hot(module)(User);

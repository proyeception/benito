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
import axios, { AxiosRequestConfig } from "axios";
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

  useEffect(() => {
    let config: AxiosRequestConfig = {
      method: "GET",
      url: `${benitoHost}/benito/${props.collection}/${props.match.params.userId}`,
    };

    axios
      .request<Person>(config)
      .then((res) => res.data)
      .then(setUser)
      .catch((e) => {
        setIsError(true);
        console.error(e);
      });
  }, []);

  if (isError) {
    return <div>Pará, loco, no existe ese chabón!!</div>;
  }

  if (!user) {
    return (
      <div className="center">
        <Loader />
      </div>
    );
  }

  return (
    <FadeIn className="qui-user-profile">
      <div className="qui-user-profile">
        <div className="container-fluid un-mb-md-1">
          <div className="row">
            <div className="col-12 col-md-3 pl-md-4 pr-md-4 pt-5 pt-md-5 bg-white border-right qui-user-profile">
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
      </div>
    </FadeIn>
  );
};

export default hot(module)(User);

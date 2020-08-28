import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import Separator from "../Project/Separator";
import Picture from "./Picture";
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
    <FadeIn className="bg-white qui-user-profile">
      <div className="bg-white qui-user-profile">
        <div className="container pl-0 pr-0 pt-md-5 un-mb-md-1">
          <div className="row">
            <div className="col-12 col-md-3">
              <Picture user={user} />
              <Separator display="d-block" marginRight={1} marginLeft={1} />
              <Organizations user={user} />
              <Separator
                display={user.socials.length > 0 ? "d-block" : "d-none"}
                marginRight={1}
                marginLeft={1}
              />
              <SocialMedia user={user} />
            </div>
            <div className="col-12 col-md-9">
              <ProjectsTab user={user} />
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default hot(module)(User);

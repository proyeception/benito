import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import Separator from "../Common/Separator";
import Profile from "./Profile";
import Organizations from "./Organizations";
import SocialMedia from "./SocialMedia";
import ProjectsTab from "./ProjectsTab";
import FadeIn from "../Common/FadeIn";
import { RouteChildrenProps } from "react-router-dom";
import Loader from "../Common/Loader";
import SlideUp from "../Common/SlideUp";
import withUser from "../../hooks/withUser";

type MatchParams = {
  userId: string;
};

interface Props extends RouteChildrenProps<MatchParams> {
  collection: "authors" | "supervisors";
}

const User = (props: Props) => {
  const [user, fetching, isError, isNotFound] = withUser(
    props.match.params.userId,
    props.collection
  );

  if (isError) {
    if (isNotFound) {
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

  if (fetching) {
    return (
      <div className="center h-100">
        <Loader />
      </div>
    );
  }

  return (
    <FadeIn className="pb-3">
      <div className="container-fluid un-mb-md-1">
        <div className="row">
          <div className="col-12 col-md-3 pl-md-4 pr-md-4 pt-5 pt-md-5 bg-white border-right">
            <SlideUp className="container">
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
            </SlideUp>
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

import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Parallax from "../../components/Parallax/Parallax";

import styles from "../../assets/jss/material-kit-react/views/landingPage";

// Sections for this page
import ProductSection from "./Sections/ProductSection";
import TeamSection from "./Sections/TeamSection";
import DocumentsSection from "./Sections/DocumentsSection";
import { hot } from "react-hot-loader";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import withProject from "../../hooks/withProject";
import { PENDING, ERROR } from "../../hooks/withFetch";
import { Divider, Hidden } from "@material-ui/core";
import Recommendations from "./Sections/Recommendations";
import Spinner from "../../components/Spinner/Spinner";
import image from "../../assets/img/proyectate/pattern-big.jpg";
import Button from "@material-ui/core/Button/Button";
import { ArrowBackIos } from "@material-ui/icons";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { SessionState } from "../../store/session/types";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import GoBack from "../../components/GoBack/GoBack";
import { Helmet } from "react-helmet";

const dashboardRoutes: any = [];

const useStyles = makeStyles(styles);

type Any = any;

type MatchParams = {
  id: string;
};

interface Props extends RouteComponentProps<MatchParams>, Any {
  session?: SessionState;
}

const ProjectPage = (props: Props) => {
  const classes = useStyles();
  const { ...rest } = props;

  const project = withProject(
    props.match.params.id,
    () => {},
    props.match.params.id
  );

  if (project.type == PENDING) {
    let color: string = "#c41234";
    if (
      props.session &&
      props.session.isLoggedIn &&
      props.session.selectedOrganization
    ) {
      color = props.session.selectedOrganization.color;
    }
    return <Spinner color={color} />;
  }

  if (project.type == ERROR) {
    return <Redirect to={{ pathname: "/error" }} />;
  }

  const url = new URL(document.URL);

  const shareUrl = `${url.protocol}://${url.hostname}/projects/${project.value.id}`;
  const shareBrief =
    project.value.description.length > 100
      ? project.value.description.slice(0, 97) + "..."
      : project.value.description;

  return (
    <div>
      <Helmet>
        <title>{project.value.title}</title>
      </Helmet>
      <Header
        color="darkGray"
        routes={dashboardRoutes}
        rightLinks={<HeaderLinks />}
        fixed
        {...rest}
      />
      <Parallax
        filter
        image={project.value.organization.header || image}
        style={{ backgroundPosition: "70% 50%" }}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classNames(classes.title, classes.longTitle)}>
                {project.value.title}
              </h1>
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  fontSize: "14px",
                }}
              >
                <FacebookShareButton
                  url={shareUrl}
                  quote={shareBrief}
                  hashtag={"#" + project.value.title}
                >
                  <FacebookIcon round size={32} />
                </FacebookShareButton>
                <TwitterShareButton
                  url={shareUrl}
                  title={project.value.title}
                  hashtags={[project.value.title]
                    .concat(project.value.tags)
                    .concat("Proyectate")}
                >
                  <TwitterIcon round size={32} />
                </TwitterShareButton>
                <LinkedinShareButton
                  url={shareUrl}
                  title={project.value.title}
                  summary={shareBrief}
                  source="Proyectate"
                >
                  <LinkedinIcon round size={32} />
                </LinkedinShareButton>
                <TelegramShareButton url={shareUrl} title={project.value.title}>
                  <TelegramIcon round size={32} />
                </TelegramShareButton>
                <WhatsappShareButton
                  url={shareUrl}
                  title={"Proyectate: " + project.value.title}
                  separator={`

`}
                >
                  <WhatsappIcon round size={32} />
                </WhatsappShareButton>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={9} className={classes.project}>
            <ProductSection project={project.value} />
            <TeamSection project={project.value} />
            <DocumentsSection project={project.value} />
            <div></div>
          </GridItem>
          <Divider orientation="vertical" flexItem />
          <GridItem xs={12} sm={12} md={2} className={classes.recommendations}>
            <Recommendations project={project.value} />
          </GridItem>
          <Hidden only={["xs", "sm"]}>
            <GridItem
              xs={12}
              sm={12}
              md={12}
              className={classNames(classes.project, classes.actions)}
            >
              <GoBack color={project.value.organization.color} />
            </GridItem>
          </Hidden>
        </GridContainer>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(ProjectPage)));

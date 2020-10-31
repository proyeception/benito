import React from "react";
import { hot } from "react-hot-loader";
import { RouteChildrenProps, withRouter } from "react-router-dom";
import { ERROR, PENDING } from "../../../hooks/withFetch";
import withProjects from "../../../hooks/withProjects";
import { Project, SearchParams } from "../../../types";
import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/recommendationStyles";
import { Hidden, makeStyles } from "@material-ui/core";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import qs from "qs";
import { syncParamsToState } from "../../../functions/search";
import { RootState } from "../../../reducers";
import { connect } from "react-redux";
import { Fetch, NOTHING, REFRESH } from "../../../store/search/types";
import store from "../../../store";
import { updateFetchStatus } from "../../../actions/search";
import ProjectLink from "../../../components/Links/ProjectLink";
import { RouteComponentProps } from "react-router-dom";
import withRecommendations from "../../../hooks/withRecommendations";
import Spinner from "../../../components/Spinner/Spinner";
import pictureNotFound from "../../../assets/img/proyectate/picture.svg";

const useStyles = makeStyles(styles);

type RecommendationSectionProps = {
  project: Project;
};

const SearchResultsSection = ({ project }: RecommendationSectionProps) => {

  console.error(project.organization.color)

  const recommendations = withRecommendations(project.id);

  const classes = useStyles();

  if (recommendations.type == ERROR) {
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <div className={classes.subtitle}> Proyectos similares</div>
          <div className={classes.text}>
            {" "}
            No pudimos encontrar proyectos similares a este
          </div>
        </GridItem>
      </GridContainer>
    );
  }

  if (recommendations.type == PENDING) {
    return <Spinner />;
  }

  if (recommendations.value.length == 0) {
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <div className={classes.subtitle}> Proyectos similares</div>
          <div className={classes.text}>
            {" "}
            No pudimos encontrar proyectos similares a este. Es único!
          </div>
        </GridItem>
      </GridContainer>
    );
  }

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <div className={classes.subtitle}> Proyectos similares</div>
        {recommendations.value.map((p, idx) => (
          <GridItem key={idx} xs={12} sm={12} md={12}>
            <GridContainer className={classes.result}>
              <ProjectLink id={p.id}>
                <div>
                  <img
                    src={p.pictureUrl?.valueOf() || pictureNotFound}
                    alt={p.title.valueOf()}
                    className={classes.picture}
                  />
                </div>
                <div className={classes.title + " underline-hover"} style={{color: project.organization.color}}>
                  {p.title}
                </div>
              </ProjectLink>
            </GridContainer>
          </GridItem>
        ))}
      </GridContainer>
    </div>
  );
};

export default hot(module)(SearchResultsSection);
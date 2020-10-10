import React from "react";
import { hot } from "react-hot-loader";
import { RouteChildrenProps, withRouter } from "react-router-dom";
import { ERROR, PENDING } from "../../../hooks/withFetch";
import withProjects from "../../../hooks/withProjects";
import { SearchParams } from "../../../types";
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
import withRecommendations from '../../../hooks/withRecommendations';
import Spinner from "../../../components/Spinner/Spinner";

type Any = any;

type MatchParams = {
  id: string;
};

interface Props extends RouteComponentProps<MatchParams>, Any {}

const useStyles = makeStyles(styles);

const SearchResultsSection = (props: Props) => {
  let queryParams: SearchParams = qs.parse(props.location.search, {
    ignoreQueryPrefix: true,
  });

  syncParamsToState(queryParams);

  const recommendations = withRecommendations(props.match.params.id);

  if (props.status == REFRESH) {
    store.dispatch(updateFetchStatus(NOTHING));
  }

  const classes = useStyles();

  if (recommendations.type == ERROR) {
    return  <GridContainer spacing={3}>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.title}> No pudimos encontrar proyectos similares a este</div>
              </GridItem>
            </GridContainer>
  }

  if (recommendations.type == PENDING) {
    return <Spinner/>;
  }

  if (recommendations.value.length == 0) {
    return <div>no hay nada capo</div>;
  }

  return (
    <div className={classes.section}>
      <GridContainer spacing={3}>
        <div className={classes.subtitle}> Proyectos similares</div>
        {recommendations.value.map((p, idx) => (
          <GridItem key={idx} xs={12} sm={12} md={12}>
            <GridContainer className={classes.result}>
                <ProjectLink id={p.id}>
                  <Hidden only={["xs", "sm"]}>
                    <div>
                      <img
                        src={p.pictureUrl?.valueOf()}
                        alt={p.title.valueOf()}
                        className={classes.picture}
                      />
                    </div>
                    <div className={classes.title + " underline-hover"}>
                      {p.title}
                    </div>
                  </Hidden>
                </ProjectLink>
            </GridContainer>
          </GridItem>
        ))}
      </GridContainer>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    status: rootState.search.status,
  };
};

export default hot(module)(
  withRouter(connect(mapStateToProps)(SearchResultsSection))
);

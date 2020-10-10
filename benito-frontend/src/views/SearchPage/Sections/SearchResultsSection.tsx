import React from "react";
import { hot } from "react-hot-loader";
import { RouteChildrenProps, withRouter } from "react-router-dom";
import { ERROR, PENDING } from "../../../hooks/withFetch";
import withProjects from "../../../hooks/withProjects";
import { SearchParams } from "../../../types";
import styles from "../../../assets/jss/material-kit-react/views/searchSections/searchResultsStyle";
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
import Spinner from "../../../components/Header/Spinner";

interface SearchResultsSectionProps extends RouteChildrenProps<SearchParams> {
  status: Fetch;
}

const useStyles = makeStyles(styles);

const SearchResultsSection = (props: SearchResultsSectionProps) => {
  let queryParams: SearchParams = qs.parse(props.location.search, {
    ignoreQueryPrefix: true,
  });

  syncParamsToState(queryParams);

  const [projects, refresh] = withProjects(queryParams);

  if (props.status == REFRESH) {
    store.dispatch(updateFetchStatus(NOTHING));
    refresh(queryParams);
  }

  const classes = useStyles();

  if (projects.type == ERROR) {
    return <div>mmmm rompiste algo kpo</div>;
  }

  if (projects.type == PENDING) {
    return <Spinner/>;
  }

  if (projects.value.length == 0) {
    return <div>no hay nada capo</div>;
  }

  return (
    <div className={classes.section}>
      <GridContainer spacing={3}>
        {projects.value.map((p, idx) => (
          <GridItem key={idx} xs={12} sm={12} md={12}>
            <GridContainer className={classes.result}>
              <GridItem xs={12} sm={12} md={9}>
                <ProjectLink id={p.id}>
                  <div className={classes.title + " underline-hover"}>
                    {p.title}
                  </div>
                  <Hidden mdUp>
                    <img
                      src={p.pictureUrl?.valueOf()}
                      alt={p.title.valueOf()}
                      className={classes.picture}
                    />
                  </Hidden>
                </ProjectLink>
                <div className={classes.description}>{p.description}</div>
                <div className={classes.authors}>
                  {p.authors.map((a) => a.fullName).join(", ")}{" "}
                </div>
              </GridItem>
              <GridItem md={3}>
                <ProjectLink id={p.id}>
                  <Hidden only={["xs", "sm"]}>
                    <img
                      src={p.pictureUrl?.valueOf()}
                      alt={p.title.valueOf()}
                      className={classes.picture}
                    />
                  </Hidden>
                </ProjectLink>
              </GridItem>
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

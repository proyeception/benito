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

interface SearchResultsSectionProps extends RouteChildrenProps<SearchParams> {}

const useStyles = makeStyles(styles);

const SearchResultsSection = (props: SearchResultsSectionProps) => {
  const projects = withProjects(props.match?.params || {});
  const classes = useStyles();

  if (projects.type == ERROR) {
    return <div>mmmm rompiste algo kpo</div>;
  }

  if (projects.type == PENDING) {
    return <div>pará flaco, calmate un poco que esto toma un ratito</div>;
  }

  return (
    <div className={classes.section}>
      <GridContainer spacing={3}>
        {projects.value.map((p, idx) => (
          <GridItem key={idx} xs={12} sm={12} md={12}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={9}>
                <div className={classes.title}>{p.title}</div>
                <Hidden mdUp>
                  <img
                    src={p.pictureUrl?.valueOf()}
                    alt={p.title.valueOf()}
                    className={classes.picture}
                  />
                </Hidden>
                <div className={classes.description}>{p.description}</div>
              </GridItem>
              <GridItem md={3}>
                <Hidden only={["xs", "sm"]}>
                  <img
                    src={p.pictureUrl?.valueOf()}
                    alt={p.title.valueOf()}
                    className={classes.picture}
                  />
                </Hidden>
              </GridItem>
            </GridContainer>
          </GridItem>
        ))}
      </GridContainer>
    </div>
  );
};

export default hot(module)(withRouter(SearchResultsSection));

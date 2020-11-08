import {
  Button,
  createMuiTheme,
  Hidden,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { RootState } from "../../reducers";
import { Route } from "../../store/routes";

interface GoBackProps extends RouteComponentProps<any> {
  color: string;
  visitedRoutes: Route[];
}

const goback = {
  marginBottom: "25px",
  color: "#c41234",
  background: "#FFFFFF",
};

const useStyles = makeStyles({ goback });

const EXCLUDED_ROUTES = [
  /\/projects\/create/,
  /\/login/,
  /\/projects\/(\w|\d)+\/edit/,
];

const GoBack = (props: GoBackProps) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.goback}
      onClick={() => {
        const route = props.visitedRoutes
          .reverse()
          .filter(
            (r) =>
              !EXCLUDED_ROUTES.some((er) => er.test(r.path)) &&
              !new RegExp(props.history.location.pathname).test(r.path)
          )[0];
        props.history.push(route?.path || "/");
      }}
      variant="outlined"
      size="large"
      style={{ color: props.color }}
      startIcon={<ArrowBackIos style={{ color: props.color }} />}
    >
      Volver
    </Button>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    visitedRoutes: rootState.routes.routes,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(GoBack)));

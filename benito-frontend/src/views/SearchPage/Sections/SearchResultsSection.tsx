import React from "react";
import { hot } from "react-hot-loader";
import { Redirect, RouteChildrenProps, withRouter } from "react-router-dom";
import { ERROR, PENDING } from "../../../hooks/withFetch";
import withProjects from "../../../hooks/withProjects";
import { SearchParams } from "../../../types";
import styles from "../../../assets/jss/material-kit-react/views/searchSections/searchResultsStyle";
import {
  Hidden,
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
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
import Spinner from "../../../components/Spinner/Spinner";
import image from "../../../assets/img/proyectate/nothing.jpg";
import pictureNotFound from "../../../assets/img/proyectate/picture.svg";
import Pagination from "@material-ui/lab/Pagination";
import { Alert, AlertTitle } from "@material-ui/lab";
import classNames from "classnames";
import { SessionState } from "../../../store/session/types";

interface SearchResultsSectionProps extends RouteChildrenProps<SearchParams> {
  status: Fetch;
  keywordSearch?: boolean;
  session?: SessionState;
}

const useStyles = makeStyles(styles);

const SearchResultsSection = (props: SearchResultsSectionProps) => {

  let color: string = "#c41234"
  if(props.session && props.session.isLoggedIn){
    color = props.session.selectedOrganization.color
  }

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: color,
        main: color,
        dark: color,
        contrastText: "#fff",
      },
    },
  });

  const itemsPerPage = 10;
  const [page, setPage] = React.useState(1);

  const [noOfPages, setNoOfPages] = React.useState(1);

  let queryParams: SearchParams = {
    ...qs.parse(props.location.search, {
      ignoreQueryPrefix: true,
    }),
    page: "0",
  };

  syncParamsToState(queryParams);

  const [search, refresh] = withProjects(queryParams, (s) => {
    setNoOfPages(Math.ceil(s.count / itemsPerPage));
    if (queryParams.page != undefined) {
      setPage(parseInt(queryParams.page) + 1);
    }
  });

  const handleChange = (_event: any, value: React.SetStateAction<number>) => {
    console.log(value.valueOf());
    queryParams = {
      ...queryParams,
      page: ((value.valueOf() as number) - 1).toString(),
    };
    refresh(queryParams);
  };

  if (props.status == REFRESH) {
    store.dispatch(updateFetchStatus(NOTHING));
    queryParams = {
      ...queryParams,
      page: "0",
    };
    refresh(queryParams);
  }

  const classes = useStyles();

  if (search.type == ERROR) {
    return <Redirect to={{ pathname: "/error" }} />;
  }

  if (search.type == PENDING) {
    return <Spinner color={color}/>;
  }

  if (search.value.projects.length == 0) {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div className={classes.text}>
            <div className={classes.message} style={{color:color}}> NO SE ENCONTRARON PROYECTOS</div>
            <div className={classes.submessage}>
              {" "}
              Probá con otros criterios de búsqueda!
            </div>
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <img src={image} className={classes.image} />
        </GridItem>
      </GridContainer>
    );
  }

  return (
    <div className={classes.section}>
      <GridContainer spacing={3}>
        {search.value.projects.map((p, idx) => (
          <GridItem key={idx} xs={12} sm={12} md={12}>
            <GridContainer className={classes.result}>
              <GridItem xs={12} sm={12} md={9}>
                <div className={classes.contentContainer}>
                  <ProjectLink id={p.id}>
                    <div
                      style={{color:color}}
                      className={classNames(classes.title, " underline-hover")}
                    >
                      {p.title}
                    </div>
                    <Hidden mdUp>
                      <img
                        src={p.pictureUrl?.valueOf() || pictureNotFound}
                        alt={p.title.valueOf()}
                        className={classes.pictureMobile}
                      />
                    </Hidden>
                  </ProjectLink>
                  <div className={classes.description}>{p.description}</div>
                </div>
                <br />
                <div className={classes.authors}>
                  {p.authors.map((a) => a.fullName).join(", ")}{" "}
                </div>
              </GridItem>
              <GridItem md={3}>
                <ProjectLink id={p.id}>
                  <Hidden only={["xs", "sm"]}>
                    <img
                      src={p.pictureUrl?.valueOf() || pictureNotFound}
                      alt={p.title.valueOf()}
                      className={classes.picture}
                    />
                  </Hidden>
                </ProjectLink>
              </GridItem>
            </GridContainer>
            {props.keywordSearch && (
              <Alert
                severity="info"
                icon={false}
                style={{
                  marginBottom: "30px",
                  marginTop: "10px",
                  backgroundColor: "#ececec",
                }}
              >
                <AlertTitle style={{ color: "#3c4858" }}>
                  Los siguientes documentos son relevantes para tu búsqueda:
                </AlertTitle>
                {p.keywordMatchingDocs.length > 0 && (
                  <ul>
                    {p.keywordMatchingDocs.map((d, idx) => (
                      <li style={{ color: "#3c4858" }} key={idx}>{d.fileName}</li>
                    ))}
                  </ul>
                )}
              </Alert>
            )}
          </GridItem>
        ))}
        <GridContainer justify="center" xs={12} sm={12} md={12}>
          <ThemeProvider theme={theme}>
            <Pagination
              count={noOfPages}
              page={page}
              onChange={handleChange}
              defaultPage={1}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
              classes={{ ul: classes.paginator }}
            />
          </ThemeProvider>
        </GridContainer>
      </GridContainer>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    status: rootState.search.status,
    keywordSearch: rootState.search.keywordSearch,
    session: rootState.session,
  };
};

export default hot(module)(
  withRouter(connect(mapStateToProps)(SearchResultsSection))
);

import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "@material-ui/core/Button/Button";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Parallax from "../../components/Parallax/Parallax";

import styles from "../../assets/jss/material-kit-react/views/profilePage";
import { hot } from "react-hot-loader";
import { Role } from "../../types";
import withUser from "../../hooks/withUser";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import { ERROR, PENDING } from "../../hooks/withFetch";
import { Link } from "react-router-dom";
import { Card, ThemeProvider, createMuiTheme, Hidden } from "@material-ui/core";
import CardBody from "../../components/Card/CardBody";
import { cardTitle } from "../../assets/jss/material-kit-react";
import Spinner from "../../components/Spinner/Spinner";
import image from "../../assets/img/proyectate/pattern.jpg";
import pictureNotFound from "../../assets/img/proyectate/picture.svg";
import { ArrowBackIos, Edit } from "@material-ui/icons";
import Pagination from "@material-ui/lab/Pagination";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { connect } from "react-redux";
import { RootState } from "../../reducers";
import { SessionState } from "../../store/session/types";
import GoBack from "../../components/GoBack/GoBack";
import { Helmet } from "react-helmet";

const useStyles = makeStyles({
  ...styles,
  cardTitle,
  textMuted: {
    color: "#6c757d",
  },
});

interface ProfilePageProps extends RouteComponentProps<MatchParams> {
  role: Role;
  session?: SessionState;
}

type MatchParams = {
  id: string;
};

const ProfilePage = (props: ProfilePageProps) => {
  let color: string = "#c41234";
  if (
    props.session &&
    props.session.isLoggedIn &&
    props.session.selectedOrganization
  ) {
    color = props.session.selectedOrganization.color;
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

  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid,
    classes.imgWhiteBackground
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  const itemsPerPage = 4;
  const [page, setPage] = React.useState(1);

  const [noOfPages, setNoOfPages] = React.useState(1);

  const handleChange = (_event: any, value: React.SetStateAction<number>) => {
    setPage(value);
  };

  const organizationImageClasses = classNames(
    classes.organization,
    classes.imgRoundedCircle
  );

  const user = withUser(props.role, props.match.params.id, (p) => {
    const pageNumbers = Math.ceil(p.projects.length / itemsPerPage);
    setNoOfPages(pageNumbers);
  });

  const noProfilePic = "https://image.flaticon.com/icons/png/512/16/16363.png";

  if (user.type == PENDING) {
    return <Spinner color={color} />;
  }

  if (user.type == ERROR) {
    return <Redirect to={{ pathname: "/error" }} />;
  }

  let showEdit = false 
  if( props.session ) {
    showEdit = props.session.isLoggedIn &&
    user.value.id == props.session.userId;
  } 

  return (
    <div>
      <Helmet>
        <title>{user.value.fullName}</title>
      </Helmet>
      <Header color="darkGray" rightLinks={<HeaderLinks />} fixed {...rest} />
      <Parallax small filter image={image} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src={user.value.profilePicUrl?.valueOf() || noProfilePic}
                      alt={user.value.fullName.valueOf()}
                      className={imageClasses}
                      style={{
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title} style={{ color: color}}>
                      {user.value.fullName}
                      {showEdit ? (
                        <span>
                          <ThemeProvider theme={theme}>
                          <Link to={`/me/profile`}>
                            <Button
                              type="button"
                              endIcon
                              >
                              <Edit /> Editar
                            </Button>
                          </Link>
                          </ThemeProvider>
                        </span>
                      ) : (
                        <div></div>
                        )}
                    </h3>
                    <br />
                    {user.value.socials.twitter &&
                      user.value.socials.twitter !=
                        "https://www.twitter.com/" && (
                        <a
                          target="_blank"
                          href={user.value.socials.twitter}
                          style={{ display: "contents" }}
                        >
                          <Button style={{ display: "contents" }}>
                            <TwitterIcon
                              style={{ marginRight: "5px", marginLeft: "5px" }}
                            />
                          </Button>
                        </a>
                      )}
                    {user.value.socials.linkedin &&
                      user.value.socials.linkedin !=
                        "https://www.linkedin.com/" && (
                        <a
                          target="_blank"
                          href={user.value.socials.linkedin}
                          style={{ display: "contents" }}
                        >
                          <Button style={{ display: "contents" }}>
                            <LinkedInIcon
                              style={{ marginRight: "5px", marginLeft: "5px" }}
                            />
                          </Button>
                        </a>
                      )}
                    {user.value.socials.facebook &&
                      user.value.socials.facebook !=
                        "https://www.facebook.com/" && (
                        <a
                          target="_blank"
                          href={user.value.socials.facebook}
                          style={{ display: "contents" }}
                        >
                          <Button style={{ display: "contents" }}>
                            <FacebookIcon
                              style={{ marginRight: "5px", marginLeft: "5px" }}
                            />
                          </Button>
                        </a>
                      )}
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>{user.value.about}</p>
            </div>
            <GridContainer justify="center" className={classes.description}>
              <GridItem xs={12} sm={12} md={12}>
                <h3>Miembro de estas organizaciones</h3>
              </GridItem>
              {user.value.organizations.length == 0 && (
                <h4 style={{ color: "#3c4858" }}>
                  Parece que este usuario no pertenece a ninguna organización :(
                </h4>
              )}
              {user.value.organizations.map((o, idx) => (
                <GridItem key={idx} xs={12} md={4}>
                  <Link
                    to={`/search?organizationName=${o.name.valueOf()}`}
                    className="normalize-link"
                  >
                    <img
                      className={organizationImageClasses}
                      src={o.iconUrl.valueOf()}
                      alt={o.displayName.valueOf()}
                    />
                    <h6 className="underline-hover">{o.displayName}</h6>
                  </Link>
                </GridItem>
              ))}
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12} style={{ textAlign: "center" }}>
                <h3 className={classes.description}>
                  Autor de estos proyectos
                </h3>
              </GridItem>
              {user.value.projects.length == 0 && (
                <h4 style={{ color: "#3c4858" }}>
                  Parece que este usuario no participó en ningún proyecto :(
                </h4>
              )}
              {user.value.projects
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((p, idx) => (
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    className={classes.navWrapper}
                    key={idx}
                  >
                    <Card style={{ textAlign: "left" }}>
                      <Link to={`/projects/${p.id}`} className="normalize-link">
                        <img
                          src={p.pictureUrl?.valueOf() || pictureNotFound}
                          alt={p.title.valueOf()}
                          className={classNames(
                            classes.imgCardTop,
                            classes.projectCard
                          )}
                        />
                      </Link>
                      <CardBody style={{ height: "192px" }}>
                        <Link
                          to={`/projects/${p.id}`}
                          className="normalize-link"
                        >
                          <h4
                            className={classNames(
                              classes.imgCardTop,
                              "underline-hover",
                              classes.longTitle
                            )}
                          >
                            {p.title}
                          </h4>
                        </Link>
                        <p
                          style={{
                            height: "64px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {p.description}
                        </p>
                        <p>
                          <small className={classes.textMuted}>
                            {p.organization.displayName}
                          </small>
                        </p>
                      </CardBody>
                    </Card>
                  </GridItem>
                ))}
              {user.value.projects.length == 0 ? (
                <GridContainer></GridContainer>
              ) : (
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
              )}
            </GridContainer>
            <Hidden only={["xs", "sm"]}>
              <ThemeProvider theme={theme}>
                <GoBack color={color} />
              </ThemeProvider>
            </Hidden>
          </div>
        </div>
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

export default hot(module)(connect(mapStateToProps)(withRouter(ProfilePage)));

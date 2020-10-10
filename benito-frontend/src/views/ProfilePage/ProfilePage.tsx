import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/CustomButtons/Button";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Parallax from "../../components/Parallax/Parallax";

import styles from "../../assets/jss/material-kit-react/views/profilePage";
import { hot } from "react-hot-loader";
import { Role } from "../../types";
import withUser from "../../hooks/withUser";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { ERROR, PENDING } from "../../hooks/withFetch";
import { socialToIcon } from "../../functions/user";
import { Link } from "react-router-dom";
import { Card } from "@material-ui/core";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import { cardTitle, title } from "../../assets/jss/material-kit-react";
import Spinner from "../../components/Spinner/Spinner";

const useStyles = makeStyles({
  ...styles,
  cardTitle,
  textMuted: {
    color: "#6c757d",
  },
});

type Props = { role: Role };

type MatchParams = {
  id: string;
};

interface ProfilePageProps extends Props, RouteComponentProps<MatchParams> {}

const ProfilePage = (props: ProfilePageProps) => {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid,
    classes.imgWhiteBackground
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  const organizationImageClasses = classNames(
    classes.organization,
    classes.imgRoundedCircle
  );

  const user = withUser(props.role, props.match.params.id);

  if (user.type == PENDING) {
    return <Spinner/>;
  }

  if (user.type == ERROR) {
    return <Redirect to={{pathname: "/error"}}/>
  }

  return (
    <div>
      <Header
        color="darkGray"
        rightLinks={<HeaderLinks />}
        fixed
        {...rest}
      />
      <Parallax
        small
        filter
        image={require("../../assets/img/profile-bg.jpg")}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src={user.value.profilePicUrl?.valueOf()}
                      alt={user.value.fullName.valueOf()}
                      className={imageClasses}
                    />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{user.value.fullName}</h3>
                    <h6>{user.value.username}</h6>
                    {user.value.socials.map((s, idx) => (
                      <a
                        target="_blank"
                        href={s.socialProfileUrl.valueOf()}
                        key={idx}
                      >
                        <Button justIcon link>
                          {socialToIcon(s)}
                        </Button>
                      </a>
                    ))}
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
              {user.value.organizations.map((o, idx) => (
                <GridItem key={idx}>
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
              {user.value.projects.map((p, idx) => (
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
                        src={p.pictureUrl?.valueOf()}
                        alt={p.title.valueOf()}
                        className={classNames(
                          classes.imgCardTop,
                          classes.projectCard
                        )}
                      />
                    </Link>
                    <CardBody style={{ height: "192px" }}>
                      <Link to={`/projects/${p.id}`} className="normalize-link">
                        <h4 className={classes.imgCardTop + "underline-hover"}>
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
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default hot(module)(ProfilePage);

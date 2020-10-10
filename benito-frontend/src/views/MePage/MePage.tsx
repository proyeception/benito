import { Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import styles from "../../assets/jss/material-kit-react/views/mePage";
import { RootState } from "../../reducers";
import { SessionState } from "../../store/session/types";
import classNames from "classnames";
import withUser from "../../hooks/withUser";
import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Parallax from "../../components/Parallax/Parallax";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import { ERROR, PENDING } from "../../hooks/withFetch";
import NavPills from "../../components/NavPills/NavPills";
import Face from "@material-ui/icons/Face";
import Business from "@material-ui/icons/Business";
import Build from "@material-ui/icons/Build";
import ProfileSection from "./Sections/ProfileSection";
import OrganizationsSection from "./Sections/OrganizationsSection";
import SettingsSection from "./Sections/SettingsSection";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/Header/Spinner";

const useStyles = makeStyles(styles);

type MatchParams = {
  tab: string;
};

interface MePageProps extends RouteComponentProps<MatchParams> {
  session: SessionState;
}

const MePage = (props: MePageProps) => {
  if (!props.session.isLoggedIn) {
    return <Redirect to="/login" />;
  }

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

  const user = withUser(props.session.role, props.session.userId);

  if (user.type == PENDING) {
    return <Spinner/>;
  }

  if (user.type == ERROR) {
    return <div>Uh loco rompiste algo eh</div>;
  }

  const tabs = [
    {
      tabButton: "Perfil",
      tabIcon: Face,
      tabContent: (
        <ProfileSection user={user.value} role={props.session.role} />
      ),
      key: "profile",
    },
    {
      tabButton: "Organizaciones",
      tabIcon: Business,
      tabContent: (
        <OrganizationsSection user={user.value} role={props.session.role} />
      ),
      key: "organizations",
    },
    {
      tabButton: "Configuración",
      tabIcon: Build,
      tabContent: (
        <SettingsSection user={user.value} role={props.session.role} />
      ),
      key: "settings",
    },
  ];

  const activeTab =
    tabs.findIndex((t) => t.key === props.match.params.tab) || 0;

  return (
    <div>
      <Header color="darkGray" rightLinks={<HeaderLinks />} fixed {...rest} />

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
                      className={imageClasses + " cursor-pointer"}
                    />
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          </div>
          <GridContainer className={classes.description} justify="left">
            <GridItem xs={12} sm={12} md={12}>
              <NavPills
                onChange={(_: any, s: any) => {
                  props.history.push(`/me/${tabs[s].key}`);
                }}
                active={activeTab}
                color="primary"
                alignCenter={true}
                tabs={tabs}
              />
            </GridItem>
          </GridContainer>
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

export default hot(module)(connect(mapStateToProps)(withRouter(MePage)));

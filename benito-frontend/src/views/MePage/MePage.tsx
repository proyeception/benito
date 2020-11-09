import { Button, createMuiTheme, makeStyles } from "@material-ui/core";
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
import Spinner from "../../components/Spinner/Spinner";
import image from "../../assets/img/proyectate/pattern.jpg"
import { grey } from "@material-ui/core/colors";
import { mapRoleToCollection, updateUserPicture } from "../../functions/user";
import { Role } from "../../types";
import { Edit } from "@material-ui/icons";
import { Helmet } from "react-helmet";
import store from "../../store";

const useStyles = makeStyles(styles);

type MatchParams = {
  tab: string;
};

interface MePageProps extends RouteComponentProps<MatchParams> {
  session: SessionState;
  loading: boolean;
}

const MePage = (props: MePageProps) => {

  const [isLoading, setIsLoading] = React.useState(false);
  
  if (props.loading) {
    return <div></div>
  }
  if (!props.session.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  let role = ""
  
  if(props.session.role == "SUPERVISOR"){
    role = "supervisors";
  } else {
    role = "authors";
  }
  
  let color: string = "#c41234"
  if (props.session.selectedOrganization){
    color = props.session.selectedOrganization.color
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
    
  const [newPicture, setNewPicture] = React.useState<string | undefined>("");
  const [invalidImageFormat, setInvalidImageFormat] = useState<boolean>(false);
  const user = withUser(props.session.role, props.session.userId, (u) => {
    setNewPicture(u.profilePicUrl?.valueOf())
  });
  
  if (user.type == PENDING || isLoading) {
    return <Spinner color={color}/>;
  }
  
  if (user.type == ERROR) {
    return <Redirect to={{pathname: "/error"}}/>
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
  ];

  const activeTab =
    tabs.findIndex((t) => t.key === props.match.params.tab) || 0;

    const noProfilePic = "https://image.flaticon.com/icons/png/512/16/16363.png";

  return (
    <div>
      <Helmet>
        <title>Proyectate</title>
      </Helmet>
      <Header color="darkGray" rightLinks={<HeaderLinks />} fixed {...rest} />

      <Parallax
        small
        filter
        image={image}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                  <input
                    accept="image/*"
                    id="contained-button-image"
                    type="file"
                    style={{display: "none", filter: "brightness(0.5)"}}
                    onChange={(e) => {
                      if((e.target.files![0].type == "image/jpg" || e.target.files![0].type == "image/jpeg" || e.target.files![0].type == "image/png") && e.target.files![0].size < 26214400){
                        setInvalidImageFormat(false)
                        setIsLoading(true)
                        updateUserPicture(user.value.id, role, e.target.files![0]).then((h)=> {
                        setNewPicture(h.data.profilePicUrl)
                        setIsLoading(false)
                        })
                      } else {
                        setInvalidImageFormat(true)
                      }  
                    }}
                  />
                  <label htmlFor="contained-button-image">
                  <img
                  style={{position: "relative"}}
                      src={newPicture || noProfilePic}
                      alt={user.value.fullName.valueOf()}
                      className={imageClasses + " cursor-pointer"}
                      onClick={() => {

                      }}
                    />
                     <Edit style={{position: "absolute", top: "0", left: "0", marginLeft: "49%", color: "white"}} className={"cursor-pointer"}/>
                  </label>
                    
                  </div>
                  {invalidImageFormat ? (<div style={{color: "red"}}>
                    No se pueden subir archivos del tipo seleccionado
                  </div>) : (<div style={{display: "none"}}></div>)}
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
                color={color}
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
    loading: rootState.common.loading
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(MePage)));

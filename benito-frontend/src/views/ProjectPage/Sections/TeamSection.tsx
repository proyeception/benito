import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";

// @material-ui/icons

// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Button from "../../../components/CustomButtons/Button";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardFooter from "../../../components/Card/CardFooter";

import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/teamStyle";

import { Person, Project, Role } from "../../../types";
import { Link } from "react-router-dom";
import GithubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedinIcon from "@material-ui/icons/LinkedIn";
import { Face } from "@material-ui/icons";
import { mapRoleToCollection } from "../../../functions/user";

const noProfilePic = "https://image.flaticon.com/icons/png/512/16/16363.png";

const useStyles = makeStyles(styles);

type TeamSectionProps = {
  project: Project;
};

export default function TeamSection({ project }: TeamSectionProps) {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const UserRef = (props: { user: Person; role: Role }) => (
    <GridItem xs={12} sm={12} md={4}>
      <Card plain>
        <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
          <img
            src={props.user.profilePicUrl?.valueOf() || noProfilePic}
            alt={props.user.fullName.valueOf()}
            className={imageClasses}
          />
        </GridItem>
        <h4 className={classes.cardTitle}>
          <Link
            to={`/${mapRoleToCollection(props.role)}/${props.user.id}`}
            className="normalize-link underline-hover"
          >
            {props.user.fullName}
          </Link>
          <br />
          <Link
            to={`/${mapRoleToCollection(props.role)}/${props.user.id}`}
            className="normalize-link underline-hover"
          >
            <small className={classes.smallTitle}>
              {props.role == "AUTHOR" ? "Autor" : "Supervisor"}
            </small>
          </Link>
        </h4>
        <CardFooter className={classes.justifyCenter}>
          {props.user.socials.twitter && props.user.socials.twitter != "https://www.twitter.com/" && (
            <a
              target="_blank"
              href={props.user.socials.twitter}
              style={{ display: "contents" }}
            >
              <Button justIcon link style={{ display: "contents" }}>
                <TwitterIcon />
              </Button>
            </a>
          )}
          {props.user.socials.linkedin && props.user.socials.linkedin != "https://www.linkedin.com/" && (
            <a
              target="_blank"
              href={props.user.socials.linkedin}
              style={{ display: "contents" }}
            >
              <Button justIcon link style={{ display: "contents" }}>
                <LinkedinIcon />
              </Button>
            </a>
          )}
          {props.user.socials.facebook && props.user.socials.facebook != "https://www.facebook.com/" && (
            <a
              target="_blank"
              href={props.user.socials.facebook}
              style={{ display: "contents" }}
            >
              <Button justIcon link style={{ display: "contents" }}>
                <FacebookIcon />
              </Button>
            </a>
          )}
        </CardFooter>
      </Card>
    </GridItem>
  );

  return (
    <div className={classes.section}>
      <h2 className={classes.subtitle}>Conocé al equipo</h2>
      <div>
        <GridContainer>
          {project.authors.map((a, idx) => (
            <UserRef user={a} key={idx} role="AUTHOR" />
          ))}
          {project.supervisors.map((s, idx) => (
            <UserRef user={s} key={idx} role="SUPERVISOR" />
          ))}
        </GridContainer>
      </div>
    </div>
  );
}

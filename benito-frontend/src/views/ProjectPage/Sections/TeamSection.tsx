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

import { Project } from "../../../types";
import { Link } from "react-router-dom";
import GithubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedinIcon from "@material-ui/icons/LinkedIn";
import { Face } from "@material-ui/icons";

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
  return (
    <div className={classes.section}>
      <h2 className={classes.subtitle}>Conocé al equipo</h2>
      <div>
        <GridContainer>
          {project.authors.map((a, idx) => (
            <GridItem xs={12} sm={12} md={4}>
              <Card plain key={idx}>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img
                    src={a.profilePicUrl?.valueOf() || noProfilePic}
                    alt={a.fullName.valueOf()}
                    className={imageClasses}
                  />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  <Link
                    to={`/authors/${a.id}`}
                    className="normalize-link underline-hover"
                  >
                    {a.fullName}
                  </Link>
                  <br />
                  <Link
                    to={`/authors/${a.id}`}
                    className="normalize-link underline-hover"
                  >
                    <small className={classes.smallTitle}>{a.username}</small>
                  </Link>
                </h4>
                <CardFooter className={classes.justifyCenter}>
                  {a.socials.twitter && (
                    <a
                      target="_blank"
                      href={a.socials.twitter}
                      style={{ display: "contents" }}
                    >
                      <Button justIcon link style={{ display: "contents" }}>
                        <TwitterIcon />
                      </Button>
                    </a>
                  )}
                  {a.socials.linkedin && (
                    <a
                      target="_blank"
                      href={a.socials.linkedin}
                      style={{ display: "contents" }}
                    >
                      <Button justIcon link style={{ display: "contents" }}>
                        <LinkedinIcon />
                      </Button>
                    </a>
                  )}
                  {a.socials.facebook && (
                    <a
                      target="_blank"
                      href={a.socials.facebook}
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
          ))}
        </GridContainer>
      </div>
    </div>
  );
}

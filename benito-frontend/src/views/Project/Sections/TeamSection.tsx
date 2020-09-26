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
      <h2 className={classes.title}>Conocé al equipo</h2>
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
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <i className={classes.socials + " fab fa-twitter"} />
                  </Button>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <i className={classes.socials + " fab fa-instagram"} />
                  </Button>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <i className={classes.socials + " fab fa-facebook"} />
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      </div>
    </div>
  );
}

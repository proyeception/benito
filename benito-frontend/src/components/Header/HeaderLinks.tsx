/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { ExitToApp } from "@material-ui/icons";

// core components
import Button from "../CustomButtons/Button";

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle";
import { hot } from "react-hot-loader";

const useStyles = makeStyles(styles);

const HeaderLinks = (props: any) => {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link to="/login" className="normalize-link">
          <Button color="transparent" className={classes.navLink}>
            <ExitToApp className={classes.socialIcons} /> Iniciar sesión
          </Button>
        </Link>
      </ListItem>
    </List>
  );
};

export default hot(module)(HeaderLinks);

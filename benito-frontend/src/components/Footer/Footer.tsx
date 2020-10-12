/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "../../assets/jss/material-kit-react/components/footerStyle";
import { Facebook, GitHub, Instagram, Twitter } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function Footer(props: any) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://twitter.com/proyeception"
                className={classes.block}
                target="_blank"
              >
                <Twitter />
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.github.com/proyeception"
                className={classes.block}
                target="_blank"
              >
                <GitHub />
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="http://www.facebook.com/proyectate"
                className={classes.block}
                target="_blank"
              >
                <Facebook />
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.instagram.com/proyeception/"
                className={classes.block}
                target="_blank"
              >
                <Instagram />
              </a>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          &copy; {new Date().getFullYear()}, Proyectate
        </div>
      </div>
    </footer>
  );
}

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
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import utnFrba from "../../assets/img/proyectate/utnba.png"

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
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <div className={classes.title}>Contacto</div>
            <div className={classes.text}><a href="mailto:proyeception@gmail.com" style={{color: "#2f3336"}}><div style={{color: "#2f3336"}}>proyeception@gmail.com</div></a></div>
            <br/>
            <div className={classes.title}>Encontranos en</div>
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
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <div className={classes.title}>En colaboración con</div>
              <img
                src={utnFrba}
                alt="Logo UTN FRBA"
                style={{float:"right"}}
              />
            </GridItem>
        </GridContainer>
      </div>
    </footer>
  );
}

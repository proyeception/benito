import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import styles from "../../assets/jss/material-kit-react/views/landingPageSections/productStyle";
import spinner from '../../assets/img/proyectate/spinner.gif';

const useStyles = makeStyles(styles);


export default function Spinner(props: any) {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <img src={spinner} className="spinner" />
        </GridItem>
      </GridContainer>
    </div>
  );
}
import React from "react";
import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import lost from "../../assets/img/proyectate/lost.jpg"
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-kit-react/views/errorPage";
import { Helmet } from "react-helmet";

const useStyles = makeStyles(styles);

export default function NotFoundPage(props: any) {
  const { ...rest } = props;
  const classes = useStyles();
  return (
    <div className={classes.white}>
        <Helmet>
          <title>Proyectate</title>
        </Helmet>
        <Header color="darkGray" rightLinks={<HeaderLinks />} fixed {...rest} />
        <div className={classes.main}>
        <GridContainer>
            <GridItem
                xs={12}
                sm={12}
                md={6}
                id="search-box"
            >
                <div className={classes.text}>
                    <div className={classes.message}> LA PÁGINA NO EXISTE</div>
                    <div className={classes.submessage}> :(</div>
                </div>
            </GridItem>
            <GridItem
                xs={12}
                sm={12}
                md={5}
                id="results"
            >
                <img src={lost} className={classes.image} alt="Pagina no existe"/>
            </GridItem>
        </GridContainer>
        </div>
    </div>
  );
}
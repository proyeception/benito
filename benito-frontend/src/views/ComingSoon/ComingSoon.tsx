import React from "react";
import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import developer from "../../assets/img/proyectate/developer2.jpg"
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-kit-react/views/errorPage";

const useStyles = makeStyles(styles);

export default function ComingSoon(props: any) {
  const { ...rest } = props;
  const classes = useStyles();
  return (
    <div className={classes.white}>
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
                    <div className={classes.message}> ESTA PÁGINA ESTÁ EN CONSTRUCCIÓN</div>
                    <div className={classes.submessage}> Dentro de poco vas a poder acceder!</div>
                </div>
            </GridItem>
            <GridItem
                xs={12}
                sm={12}
                md={5}
                id="results"
            >
                <img src={developer} className={classes.image}/>
            </GridItem>
        </GridContainer>
        </div>
    </div>
  );
}
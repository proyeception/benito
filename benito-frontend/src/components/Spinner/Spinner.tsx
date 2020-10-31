import React from "react";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import styles from "../../assets/jss/material-kit-react/views/landingPageSections/productStyle";
import spinner from '../../assets/img/proyectate/spinner.gif';
import CircularProgress from '@material-ui/core/CircularProgress';
import { hot } from "react-hot-loader";

const useStyles = makeStyles(styles);

type SpinnerProps = {
  color?: string;
};

const Spinner = ({ color }: SpinnerProps ) => {
  const classes = useStyles();

  let newColor = color ? color : "#c41234"
  
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: newColor,
        main: newColor,
        dark: newColor,
        contrastText: "#fff",
      },
    },
  });

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <ThemeProvider theme={theme}><div style={{ display: "flex", alignContent: "center", placeContent: "center"}}><CircularProgress disableShrink style={{height:"3vw", width:"3vw"}}/></div></ThemeProvider>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default hot(module)(Spinner);
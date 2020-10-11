import { title, subtitle } from "../../../material-kit-react";
import { createStyles, Theme } from "@material-ui/core/styles";

const searchResultsStyle = (theme: Theme) =>
  createStyles({
    section: {
      [theme.breakpoints.up("md")]: {
        padding: "70px 0",
      },
      textAlign: "left",
    },
    title: {
      ...title,
      marginBottom: "1rem",
      marginTop: "30px",
      minHeight: "32px",
      textDecoration: "none",
    },
    description: {
      color: "#999",
    },
    picture: {
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
    authors: {
      color: "#999",
      textAlign: "right",
      fontSize: "13px",
    },
    result: {
      [theme.breakpoints.up("md")]: {
        height: "240px",
      },
    },
    text: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      verticalAlign: "middle",
      height:"90%",
    },

    white: {
      background: "#FFFFFF",
      height:"100%",
      width:"100%",
      position:"absolute",
      left:"0",
      top:"0",
      overflow: "hidden",
    },

    image: {
      width: "70%",
      marginLeft: "auto",
      marginRight: "auto",
      display: "block"
    },

    message: {
      ...title,
      fontSize: "40px",
      lineHeight: "50px",
      font: '"Roboto", "Helvetica", "Arial", sans-serif',
      textAlign: "center",
      verticalAlign: "middle",
    },

    submessage: {
      ...subtitle,
      fontSize: "25px",
      lineHeight: "30px",
      font: '"Roboto", "Helvetica", "Arial", sans-serif',
      textAlign: "center",
      marginTop: "0",
      verticalAlign: "middle",
    }
  });

export default searchResultsStyle;

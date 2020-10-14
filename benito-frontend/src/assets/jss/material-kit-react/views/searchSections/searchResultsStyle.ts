import { title, subtitle } from "../../../material-kit-react";
import { createStyles, Theme } from "@material-ui/core/styles";

const searchResultsStyle = (theme: Theme) =>
  createStyles({
    section: {
      [theme.breakpoints.up("md")]: {
        padding: "70px 0",
      },
      [theme.breakpoints.down("md")]: {
        paddingRight: "30px",
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
      color: "#3c4858",
      textOverflow: "ellipsis",
      lineClamp: 5,
      display: "-webkit-box",
      boxOrient: "vertical",
      overflow: "hidden"
    },
    picture: {
      display: "block",
      width: "100%",
      height: "-webkit-fill-available",
      objectFit: "cover",
    },
    pictureMobile: {
      display: "block",
      width: "-webkit-fill-available",
      height: "auto",
    },
    authors: {
      color: "#3c4858",
      textAlign: "right",
      fontSize: "13px",
      verticalAlign: "bottom",
      position: "absolute",
      bottom: 0,
      right: 0,
    },
    result: {
      [theme.breakpoints.up("md")]: {
        height: "240px",
      },
      display: "flex",
      flexGrow: 1,
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
    },

    paginator: {
      justifyContent: "center",
      padding: "10px"
    }
  });

export default searchResultsStyle;

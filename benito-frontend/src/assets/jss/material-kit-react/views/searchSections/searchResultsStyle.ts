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
      textOverflow: "ellipsis",
      overflow: "hidden",
      lineClamp: 1,
      whiteSpace: "nowrap",
    },
    description: {
      color: "#3c4858",
      textOverflow: "ellipsis",
      lineClamp: 4,
      display: "-webkit-box",
      boxOrient: "vertical",
      overflow: "hidden",
    },
    picture: {
      display: "block",
      width: "100%",
      objectFit: "cover",
      height: "100%",
    },
    pictureMobile: {
      display: "block",
      width: "100%",
      height: "320px",
    },
    authors: {
      [theme.breakpoints.down("md")]: {
        textAlign: "right",
      },
      [theme.breakpoints.up("md")]: {
        color: "#3c4858",
        textAlign: "right",
        fontSize: "13px",
        bottom: 0,
        right: 0,
      },
    },
    result: {
      [theme.breakpoints.down("sm")]: {
        height: "592px",
      },
      [theme.breakpoints.up("md")]: {
        height: "300px",
      },
      display: "flex",
      flexGrow: 1,
      overflow: "hidden",
    },
    text: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      verticalAlign: "middle",
      height: "90%",
    },
    image: {
      width: "70%",
      marginLeft: "auto",
      marginRight: "auto",
      display: "block",
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
      padding: "10px",
    },
    contentContainer: {
      [theme.breakpoints.up("md")]: {
        height: "192px",
      },
      [theme.breakpoints.down("sm")]: {
        height: "480px",
      },
    },
  });

export default searchResultsStyle;

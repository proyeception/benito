import { title } from "../../../material-kit-react";
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
  });

export default searchResultsStyle;

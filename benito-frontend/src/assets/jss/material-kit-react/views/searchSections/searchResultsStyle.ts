import { title } from "../../../material-kit-react";
import { createStyles, Theme } from "@material-ui/core/styles";

const productStyle = (theme: Theme) =>
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
    },
  });

export default productStyle;

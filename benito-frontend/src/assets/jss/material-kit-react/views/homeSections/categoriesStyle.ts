import { createStyles, Theme } from "@material-ui/core";
import { container, title } from "../../../material-kit-react";

const categoriesStyle = (theme: Theme) =>
  createStyles({
    container: {
      ...container,
      padding: "30px",
    },
    img: {
      filter: "blur(3px) grayscale(80%)",
      [theme.breakpoints.down("sm")]: {
        width: "240px",
        height: "160px",
      },
      [theme.breakpoints.up("md")]: {
        width: "640px",
        height: "480px",
      },
    },
    title: {
      ...title,
      [theme.breakpoints.down("sm")]: {
        fontSize: "24px",
      },
    },
    cardText:{
      position: "absolute",
      right: "30%",
      bottom: "60px",
      left: "30%",
      zIndex: 10,
      paddingTop: "0px",
      paddingBottom: "0px",
      textAlign: "center",
      display: "none",
      backgroundColor: "white",
      borderRadius: "6px"
    }
  });

export default categoriesStyle;

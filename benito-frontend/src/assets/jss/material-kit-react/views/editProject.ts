import { createStyles, Theme } from "@material-ui/core";
import { container } from "../../material-kit-react";

const editProjectStyle = (theme: Theme) =>
  createStyles({
    container,
    main: {
      background: "#FFFFFF",
      position: "relative",
      zIndex: 3,
    },
    mainRaised: {
      margin: "-60px 30px 0px",
      borderRadius: "6px",
      boxShadow:
        "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    },
    readme: {
      overflow: "auto",
      [theme.breakpoints.down("sm")]: {
        height: "160px",
      },
      [theme.breakpoints.up("md")]: {
        height: "480px",
      },
    },
    picture: {
      [theme.breakpoints.down("sm")]: {
        height: "120px",
      },
      [theme.breakpoints.up("md")]: {
        height: "480px",
      },
    },
    bullet: {
      display: "flex",
    },
  });

export default editProjectStyle;

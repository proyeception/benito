import { createStyles, Theme } from "@material-ui/core/styles";
import { title, subtitle } from "../../material-kit-react";

const errorPageStyle = (theme: Theme) =>
  createStyles({
    main: {
      background: "#FFFFFF",
      zIndex: 3,
      paddingTop:"100px",
      position: "relative",
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
      height: "35%"
    },

    message: {
      ...title,
      paddingTop: "200px",
      fontSize: "50px",
      font: '"Roboto", "Helvetica", "Arial", sans-serif',
      textAlign: "center",
    },

    submessage: {
      ...subtitle,
      fontSize: "30px",
      font: '"Roboto", "Helvetica", "Arial", sans-serif',
      textAlign: "center",
    }
  });

export default errorPageStyle;

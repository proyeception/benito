import { createStyles, Theme } from "@material-ui/core/styles";
import { title, subtitle, container } from "../../material-kit-react";

const legalPageStyle = (theme: Theme) =>
  createStyles({
    main: {
      background: "#FFFFFF",
      zIndex: 3,
      paddingTop: "100px",
      position: "relative",
    },

    text: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      verticalAlign: "middle",
      height: "90%",
    },

    container,
    white: {
      background: "#FFFFFF",
      height: "100%",
      width: "100%",
      position: "absolute",
      left: "0",
      top: "0",
      overflow: "hidden",
    },

    image: {
      width: "30%",
    },

    message: {
      ...title,
      fontSize: "50px",
      lineHeight: "50px",
      font: '"Roboto", "Helvetica", "Arial", sans-serif',
      textAlign: "center",
      verticalAlign: "middle",
    },

    submessage: {
      ...subtitle,
      fontSize: "30px",
      lineHeight: "30px",
      font: '"Roboto", "Helvetica", "Arial", sans-serif',
      textAlign: "center",
      marginTop: "0",
      verticalAlign: "middle",
    },
    imageContainer: {
      display: "flex",
      justifyContent: "center",
    },
  });

export default legalPageStyle;

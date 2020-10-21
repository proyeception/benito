import { title, subtitle } from "../../../material-kit-react";
import { Theme, createStyles } from "@material-ui/core/styles";

const documentsStyle = (theme: Theme) => createStyles({
  section: {
    textAlign: "left"
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
  subtitle: {
    ...subtitle,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    [theme.breakpoints.down("md")]: {
      fontSize: "6vw"
  }
  },
  description: {
    color: "#999",
  },
  documentsContainer: {
    maxHeight: "360px",
    overflow: "scroll",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "20px"
  }
  },
  document: {
    display: "flex",
  },
});

export default documentsStyle;

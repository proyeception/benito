import { title, subtitle } from "../../../material-kit-react";
import { createStyles, Theme } from "@material-ui/core/styles";

const recommendationStyle = (theme: Theme) => createStyles({
  section: {
    padding: "70px 0",
    paddingRight:"30px",
    paddingLeft:"20px",
    textAlign: "center",
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "1px",
    textDecoration: "none",
    textAlign: "center"
  },
  text: {
    ...subtitle,
    marginBottom: "1rem",
    marginTop: "1px",
    textDecoration: "none",
    textAlign: "center"
  },
  subtitle: {
    ...subtitle,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    fontSize: "26px",
    textAlign: "center"
  },
  description: {
    color: "#999",
  },
  picture: {
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  result: {
    [theme.breakpoints.up("md")]: {
      height: "210px",
    },
  },
});

export default recommendationStyle;
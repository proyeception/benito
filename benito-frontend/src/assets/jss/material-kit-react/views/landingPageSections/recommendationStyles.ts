import { title, subtitle } from "../../../material-kit-react";
import { createStyles, Theme } from "@material-ui/core/styles";

const recommendationStyle = (theme: Theme) => createStyles({
  section: {
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
    textAlign: "center",
    paddingBottom: "10px"
  },
  subtitle: {
    ...subtitle,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    fontSize: "26px",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      paddingRight: "30px"
  }
  },
  description: {
    color: "#999",
  },
  picture: {
    display: "block",
    width: "100%",
    height: "170px",
    objectFit: "cover",
  },
  result: {
    [theme.breakpoints.down("md")]: {
      paddingRight: "30px"
  }
  },
});

export default recommendationStyle;
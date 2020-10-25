import { container, title } from "../../material-kit-react";
import { createStyles, Theme } from '@material-ui/core/styles';

const homePage = (theme: Theme) => createStyles({
  container,
  brand: {
    color: "#FFFFFF",
    textAlign: "left"
  },
  title: {
    fontSize: "4.2rem",
    fontWeight: 600,
    display: "inline-block",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      fontSize: "6vw"
    },
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px 0 0",
    [theme.breakpoints.down("sm")]: {
      fontSize: "4vw"
    },
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: 3,
    paddingBottom: "170px",
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  link: {
    textDecoration: "none"
  },
  textCenter: {
    textAlign: "center"
  },
  section: {
    background: "#EEEEEE",
    padding: "70px 0"
  },
  bigTitle: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    overflow: "hidden",
    overflowWrap: "anywhere",
    textAlign: "center",
    lineHeight: "initial",
    [theme.breakpoints.down("md")]: {
        fontSize: "5vw"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "7vw"
    },
  },
});

export default homePage;

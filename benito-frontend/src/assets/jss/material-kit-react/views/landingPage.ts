import { container, title } from "../../material-kit-react";
import { Theme, createStyles } from '@material-ui/core/styles';

const landingPageStyle = (theme: Theme) => createStyles({
  container: {
    zIndex: 12,
    color: "#FFFFFF",
    ...container
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none",
    [theme.breakpoints.down("sm")]: {
      fontSize: "7vw"
    }
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: 3,
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  project: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "90px",
      paddingRight: "90px"
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: "30px",
      paddingRight: "30px"
    }
    
  },
  recommendations: {
    paddingTop: "60px",
    paddingRight: "0",
    marginRight: "0",
    paddingLeft: "40px"
  },
  actions: {
    paddingBottom: "60px",
    paddingTop: "30px",
    paddingRight: "0",
    marginRight: "0",
    paddingLeft: "160px"
  },
  goback: {
    marginBottom: "25px",
    color: "#c41234"
  },
  longTitle:{
    textOverflow: "ellipsis",
    lineClamp: 4,
    display: "-webkit-box",
    boxOrient: "vertical",
    overflow: "hidden"
  }
});

export default landingPageStyle;

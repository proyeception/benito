import { container } from "../../material-kit-react";
import { createStyles, Theme } from "@material-ui/core/styles";

const signupPageStyle = (theme: Theme) => createStyles({
  container: {
    ...container,
    zIndex: 2,
    position: "relative",
    paddingTop: "20vh",
    color: "#FFFFFF",
    paddingBottom: "200px",
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)",
  },
  pageHeader: {
    minHeight: "100vh",
    height: "auto",
    display: "inherit",
    position: "relative",
    margin: "0",
    padding: "0",
    border: "0",
    alignItems: "center",
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)",
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""',
    },
    "& footer li a,& footer li a:hover,& footer li a:active": {
      color: "#FFFFFF",
    },
    "& footer": {
      position: "absolute",
      bottom: "0",
      width: "100%",
    },
  },
  form: {
    margin: "0",
  },
  cardHeader: {
    width: "auto",
    textAlign: "center",
    backgroundColor: "#c41234",
  },
  socialIcons: {
    maxWidth: "24px",
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
  },
  divider: {
    marginTop: "30px",
    marginBottom: "0px",
    textAlign: "center",
  },
  cardFooter: {
    paddingTop: "0rem",
    border: "0",
    borderRadius: "6px",
    justifyContent: "center !important",
  },
  socialLine: {
    marginTop: "1rem",
    textAlign: "center",
    padding: "0",
  },
  inputIconsColor: {
    color: "#495057",
  },
  background:{
    [theme.breakpoints.down("md")]: {
      backgroundImage: "url('/src/assets/img/proyectate/mobile-login.png') !important",
      backgroundColor: "whitesmoke"
    },
  }
});

export default signupPageStyle;

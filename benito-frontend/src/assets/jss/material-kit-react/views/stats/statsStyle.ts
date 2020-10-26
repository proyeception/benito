import { darkGrayColor, title, subtitle } from "../../../material-kit-react";
import { Theme, createStyles } from "@material-ui/core/styles";

const productStyle = (theme: Theme) => createStyles({
  section: {
    padding: "70px 0",
    [theme.breakpoints.down("md")]: {
      padding: "20px 0"
    },
    textAlign: "justify",
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    overflow: "hidden",
    overflowWrap: "anywhere",
    fontSize: "30px",
    textAlign: "center",
    lineHeight: "initial",
    [theme.breakpoints.up("md")]: {
        height: "90px"
    },
    [theme.breakpoints.down("md")]: {
        fontSize: "4vw"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "6vw",  
    },
  }, 
  subtitle: {
    ...subtitle,
    marginBottom: "1rem",
    marginTop: "0px",
    minHeight: "auto",
    textDecoration: "none",
    overflow: "hidden",
    overflowWrap: "anywhere",
    fontSize: "15px",
    textAlign: "center",
    lineHeight: "initial",
    [theme.breakpoints.up("md")]: {
        height: "60px"
    },
    [theme.breakpoints.down("md")]: {
        fontSize: "2vw"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "4vw",
    },
  },
  numbers: {
    ...title,
    marginBottom: "1rem",
    textDecoration: "none",
    overflow: "hidden",
    marginTop: "0px",
    minHeight: "auto",
    overflowWrap: "anywhere",
    fontSize: "40px",
    textAlign: "center",
    lineHeight: "initial",
    [theme.breakpoints.up("md")]: {
        height: "60px"
    },
    [theme.breakpoints.down("md")]: {
        fontSize: "4vw"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "6vw",
    },
  },
  description: {
    color: "#999",
    overflow: "auto",
    fontSize: "100%",
  },
  longTitle:{
    textOverflow: "ellipsis",
    lineClamp: 4,
    display: "-webkit-box",
    boxOrient: "vertical",
    overflow: "hidden",
    color: darkGrayColor,
    fontSize: "15px",
    fontWeight: "bold"
  },
  bullet: {
    display: "flex",
  },
  card: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "5px",
      paddingRight: "5px"
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: "5px",
      paddingRight: "5px"
    },
  },
  fiveColumns: {
    [theme.breakpoints.up("md")]: {
        width: "20% !important"
    },
    [theme.breakpoints.down("md")]: {
        width: "100% !important"
    },
  },
  gridList: {
    width: "100%",
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54) !important',
  },
});

export default productStyle;

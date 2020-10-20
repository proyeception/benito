import { cardTitle, title, subtitle } from "../../../material-kit-react";
import imagesStyle from "../../imagesStyles";
import { Theme, createStyles } from "@material-ui/core/styles";

const teamStyle = (theme: Theme) => createStyles({
  section: {
    padding: "70px 0",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      paddingBottom: "20px"
    },
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
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
  ...imagesStyle,
  itemGrid: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  cardTitle,
  smallTitle: {
    color: "#6c757d"
  },
  description: {
    color: "#999"
  },
  justifyCenter: {
    justifyContent: "center !important"
  },
  socials: {
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
    color: "#999"
  },
  margin5: {
    margin: "5px"
  }
});

export default teamStyle;

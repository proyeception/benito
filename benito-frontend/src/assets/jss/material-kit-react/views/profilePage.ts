import { container, title } from "../../material-kit-react";

import imagesStyle from "../imagesStyles";
import { createStyles } from "@material-ui/core/styles";

const profilePageStyle = createStyles({
  container,
  profile: {
    textAlign: "center",
    "& img": {
      maxWidth: "160px",
      width: "100%",
      margin: "0 auto",
      transform: "translate3d(0, -50%, 0)",
    },
  },
  description: {
    margin: "1.071rem auto 0",
    maxWidth: "600px",
    color: "#999",
    textAlign: "center !important" as any,
  },
  name: {
    marginTop: "-80px",
  },
  ...imagesStyle,

  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: 3,
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
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
    color: "#999",
  },
  navWrapper: {
    margin: "20px auto 50px auto",
    textAlign: "center",
  },
  organization: {
    height: "72px",
    width: "72px",
  },
  projectCard: {
    height: "320px",
  },
  paginator: {
    justifyContent: "center",
    padding: "10px",
  },
  longTitle: {
    textOverflow: "ellipsis",
    lineClamp: 2,
    display: "-webkit-box",
    boxOrient: "vertical",
    overflow: "hidden",
  },
});

export default profilePageStyle;

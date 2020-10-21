import { title } from "../../../material-kit-react";
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
    textTransform: "uppercase",
    [theme.breakpoints.down("md")]: {
        fontSize: "4vw"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "6vw"
  },
  },
  description: {
    color: "#999",
    overflow: "auto"
  },
  longTitle:{
    textOverflow: "ellipsis",
    lineClamp: 4,
    display: "-webkit-box",
    boxOrient: "vertical",
    overflow: "hidden"
  }
});

export default productStyle;

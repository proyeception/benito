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
    [theme.breakpoints.down("md")]: {
        fontSize: "6vw"
    }
  },
  description: {
    color: "#999",
    overflow: "auto"
  },
});

export default productStyle;

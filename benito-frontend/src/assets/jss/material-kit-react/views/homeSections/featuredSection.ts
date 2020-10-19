import { createStyles, Theme } from "@material-ui/core";
import { title } from "../../../material-kit-react";

const featuredStyle = (theme: Theme) =>
  createStyles({
    title: {
      ...title,
      [theme.breakpoints.down("sm")]: {
        fontSize: "24px",
      },
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
  });

export default featuredStyle;

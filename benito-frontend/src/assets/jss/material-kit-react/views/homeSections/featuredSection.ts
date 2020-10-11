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
  });

export default featuredStyle;

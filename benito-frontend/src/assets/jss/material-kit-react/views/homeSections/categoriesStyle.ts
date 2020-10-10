import { createStyles, Theme } from "@material-ui/core";
import { container } from "../../../material-kit-react";

const categoriesStyle = (theme: Theme) =>
  createStyles({
    container: {
      ...container,
      padding: "30px",
    },
    img: {
      filter: "blur(8px)",
      [theme.breakpoints.down("sm")]: {
        width: "240px",
        height: "160px",
      },
      [theme.breakpoints.up("md")]: {
        width: "640px",
        height: "480px",
      },
    },
  });

export default categoriesStyle;

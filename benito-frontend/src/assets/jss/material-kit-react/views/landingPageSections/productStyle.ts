import { title } from "../../../material-kit-react";
import { createStyles } from "@material-ui/core/styles";

const productStyle = createStyles({
  section: {
    padding: "70px 0",
    textAlign: "left",
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
  description: {
    color: "#999",
  },
});

export default productStyle;

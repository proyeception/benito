import { container } from "../../../material-kit-react";
import { createStyles } from "@material-ui/core/styles";

const searchBoxStyle = createStyles({
  section: {
    background: "#EEEEEE",
    padding: "70px 0",
    borderRadius: "6px",
  },
  container,
  textCenter: {
    textAlign: "center",
  },
  searchBox: {
    background: "#FFFFFF",
    borderRadius: "16px",
    padding: "16px",
  },
  row: {
    marginTop: "15px",
    marginBottom: "15px",
  },
});

export default searchBoxStyle;

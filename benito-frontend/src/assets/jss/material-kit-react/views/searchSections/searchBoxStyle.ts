import { title } from "../../../material-kit-react";
import { createStyles } from "@material-ui/core/styles";

const searchBoxStyle = createStyles({
  section: {
    padding: "70px 0",
    position: "sticky",
  },
  title: {
    ...title,
    marginBottom: "50px",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    textAlign: "center",
  },
  description: {
    color: "#999",
    textAlign: "center",
  },
  textCenter: {
    textAlign: "center",
  },
  textArea: {
    marginRight: "15px",
    marginLeft: "15px",
  },
  fullWidth: {
    width: "100%",
  },
});

export default searchBoxStyle;

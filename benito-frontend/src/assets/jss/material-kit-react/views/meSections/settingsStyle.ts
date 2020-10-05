import { container, title } from "../../../material-kit-react";
import { createStyles } from "@material-ui/core/styles";

const settingsStyle = createStyles({
  container,
  section: {
    padding: "70px 0",
  },
  title: {
    ...title,
    marginBottom: "50px",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
  description: {
    color: "#999",
    textAlign: "center",
  },
  textCenter: {
    textAlign: "center",
  },
  subtitle: {
    color: "#000000",
  },
  textArea: {
    marginRight: "15px",
    marginLeft: "15px",
  },
  fullWidth: {
    width: "100%",
  },
  rowItem: {
    paddingTop: "15px",
    paddingBottom: "15px",
  },
  apiKey: {
    display: "flex",
    justifyContent: "space-evenly",
  },
});

export default settingsStyle;

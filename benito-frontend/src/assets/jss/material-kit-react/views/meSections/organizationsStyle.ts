import { container, title } from "../../../material-kit-react";
import { createStyles } from "@material-ui/core/styles";

const organizationsStyle = createStyles({
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
  rowItem: {
    paddingTop: "15px",
    paddingBottom: "15px",
  },
  orgIcon: {
    height: "32px",
    width: "32px",
  },
  orgHeader: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default organizationsStyle;

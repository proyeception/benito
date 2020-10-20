import { container, title } from "../../../material-kit-react";
import customCheckboxRadioSwitch from "../../../material-kit-react/customCheckboxRadioSwitch";
import { Theme, createStyles } from '@material-ui/core/styles';

const basicsStyle = (theme: Theme) => createStyles({
  sections: {
    padding: "70px 0",
    [theme.breakpoints.down("md")]: {
      padding: "20px 0"
    }
  },
  container,
  title: {
    ...title,
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  space50: {
    height: "50px",
    display: "block"
  },
  space70: {
    height: "70px",
    display: "block"
  },
  icons: {
    width: "17px",
    height: "17px",
    color: "#FFFFFF"
  },
  ...customCheckboxRadioSwitch
});

export default basicsStyle;

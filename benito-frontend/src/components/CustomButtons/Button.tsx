import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";

// core components

import buttonStyle from "../../assets/jss/material-kit-react/components/buttonStyle";

const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) => obj[key];

const makeComponentStyles = makeStyles(() => ({
  ...buttonStyle
}));

const RegularButton = React.forwardRef((props: any, ref) => {
  const {
    color,
    round,
    children,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    ...rest
  } = props;

  const classes = makeComponentStyles();

  console.error("voy al if")
  console.error(color)

  if(color == undefined || !color.startsWith("#")){
    const btnClasses = classNames({
      [classes.button]: true,
      [getKeyValue(classes)(size)]: size,
      [getKeyValue(classes)(color)]: color,
      [classes.round]: round,
      [classes.fullWidth]: fullWidth,
      [classes.disabled]: disabled,
      [classes.simple]: simple,
      [classes.block]: block,
      [classes.link]: link,
      [classes.justIcon]: justIcon,
      [className]: className
    });
    return (
      <Button {...rest} ref={ref} className={btnClasses}>
        {children}
      </Button>
    );
  } else {
    const btnClasses = classNames({
      [classes.button]: true,
      [getKeyValue(classes)(size)]: size,
      [classes.round]: round,
      [classes.fullWidth]: fullWidth,
      [classes.disabled]: disabled,
      [classes.simple]: simple,
      [classes.block]: block,
      [classes.link]: link,
      [classes.justIcon]: justIcon,
      [className]: className
    });
    return (
      <Button {...rest} ref={ref} className={btnClasses} style={{backgroundColor:color, boxShadow:
        "0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"}}>
        {children}
      </Button>
    );
  }
});

export default RegularButton;

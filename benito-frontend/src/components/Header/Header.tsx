import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import styles from "../../assets/jss/material-kit-react/components/headerStyle";
import { hot } from "react-hot-loader";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import logo from "../../assets/img/proyectate/proyectate-logo-nombre.png";
import utnLogo from "../../assets/img/proyectate/utn-logo-transparent.png";
import HeaderSearchBox from "./HeaderSearchBox";
import { Divider } from "@material-ui/core";
import HeaderLinks from "./HeaderLinks";

const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) =>
  obj[key];

const useStyles = makeStyles(styles);

type Any = any;

interface HeaderProps extends RouteComponentProps, Any {}

const Header = (props: HeaderProps) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const brand = (
    <span className={classes.logoContainer}>
      <img src={logo} className={classes.brandLogo} alt="Logo Proyectate" />
    </span>
  );

  const { color, rightLinks, leftLinks, fixed, absolute } = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [getKeyValue(classes)(color)]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  });
  const brandComponent = <Link to={"/"}>{brand}</Link>;
  return (
    <AppBar className={appBarClasses}>
      <Toolbar
        style={{
          marginLeft: "30px",
          marginRight: "30px",
          width: "-webkit-fill-available",
        }}
      >
        {leftLinks !== undefined ? brandComponent : null}
        <div className={classes.flex}>
          {leftLinks !== undefined ? (
            <Hidden smDown implementation="css">
              {leftLinks}
            </Hidden>
          ) : (
            brandComponent
          )}
        </div>
        <Hidden smDown implementation="css">
          <span style={{ color: "white" }}>
            <HeaderLinks />
          </span>
        </Hidden>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          style={{ color: "black" }}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            {leftLinks}
            {rightLinks}
          </div>
          <Divider variant="fullWidth" />
          <div className={classes.container} style={{ paddingTop: "15px" }}>
            <HeaderSearchBox />
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
};

Header.defaultProp = {
  color: "primary",
};

export default hot(module)(withRouter(Header));

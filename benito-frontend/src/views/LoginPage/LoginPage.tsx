import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Footer from "../../components/Footer/Footer";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CardFooter from "../../components/Card/CardFooter";
import CustomInput from "../../components/CustomInput/CustomInput";

import styles from "../../assets/jss/material-kit-react/views/loginPage";

const image =
  "https://res.cloudinary.com/proyectate/image/upload/v1600383533/proyectate_90e388a10b.jpg";
import { hot } from "react-hot-loader";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import { googleClientId } from "../../config";
import { LoginData } from "../../types";
import { startLogin } from "../../functions/session";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import Primary from "../../components/Typography/Primary";
import { primaryColor } from "../../assets/jss/material-kit-react";

const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) =>
  obj[key];

const useStyles = makeStyles(styles);

interface LoginPageProps extends RouteComponentProps {
  isLoggedIn: boolean;
}

const LoginPage = (props: LoginPageProps) => {
  if (props.isLoggedIn) {
    return <Redirect to="/" />;
  }

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        absolute
        color="darkGray"
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card
                className={getKeyValue(classes)(
                  cardAnimaton as keyof typeof styles
                )}
              >
                <form className={classes.form}>
                  <CardHeader className={classes.cardHeader}>
                    <h4><b>Login</b></h4>
                    <div className={classes.socialLine}>
                      <GoogleLogin
                        clientId={googleClientId}
                        render={(renderProps) => (
                          <Button
                            onClick={renderProps.onClick}
                            justIcon
                            color="transparent"
                          >
                            <i className={"fab fa-google-plus-g"} />
                          </Button>
                        )}
                        onSuccess={(res) => {
                          let googleInfo = res as GoogleLoginResponse;
                          let loginData: LoginData = {
                            googleUserId: googleInfo.googleId,
                            fullName: googleInfo.profileObj.name,
                            profilePictureUrl: googleInfo.profileObj.imageUrl,
                            mail: googleInfo.profileObj.email,
                            token: googleInfo.tokenId,
                          };
                          startLogin(loginData, props.history, "author");
                        }}
                        onFailure={console.warn}
                      />

                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e: any) => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e: any) => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>O podés ir por la opción tradicional</p>
                  <CardBody>
                    <CustomInput
                      labelText="Nombre..."
                      id="first"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Contraseña"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg">
                      Entrar
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    isLoggedIn: rootState.session.isLoggedIn,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(LoginPage)));

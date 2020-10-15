import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Footer from "../../components/Footer/Footer";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/CustomButtons/Button";
import image from "../../assets/img/proyectate/login.svg";

import styles from "../../assets/jss/material-kit-react/views/loginPage";

import { hot } from "react-hot-loader";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import { googleClientId } from "../../config";
import { LoginData, Organization } from "../../types";
import { startLogin } from "../../functions/session";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import { Book, Close, SupervisorAccount } from "@material-ui/icons";
import { Snackbar, Divider, IconButton, TextField, ThemeProvider, createMuiTheme } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { requestSupervisorAccount } from "../../functions/user";
import { Alert } from "@material-ui/lab";
import { grey } from "@material-ui/core/colors";

const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) =>
  obj[key];

const useStyles = makeStyles(styles);

interface LoginPageProps extends RouteComponentProps {
  isLoggedIn: boolean;
  organizations: Array<Organization>;
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

  const [organization, setOrganization] = useState<Organization | null>(null);
  const [hasError, setHasError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [activeTab, setActiveTab] = useState(0);

  const theme = createMuiTheme({
    palette: {
      primary: grey,
    },
  });

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
              <div
                id="123"
                className={getKeyValue(classes)(
                  cardAnimaton as keyof typeof styles
                )}
              >
                <form className={classes.form}>
                  <CustomTabs
                    headerColor="primary"
                    onChange={(_: any, a: any) => setActiveTab(a)}
                    activeTab={activeTab}
                    tabs={[
                      {
                        tabName: "Autor",
                        tabIcon: Book,
                        tabContent: (
                          <GridContainer align="center">
                            <GridItem>
                              Iniciá sesión con alguna de estas opciones
                            </GridItem>
                            <GridItem>
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
                                    profilePictureUrl:
                                      googleInfo.profileObj.imageUrl,
                                    mail: googleInfo.profileObj.email,
                                    token: googleInfo.tokenId,
                                  };
                                  startLogin(
                                    loginData,
                                    props.history,
                                    "author"
                                  );
                                }}
                                onFailure={console.warn}
                              />
                            </GridItem>
                          </GridContainer>
                        ),
                      },
                      {
                        tabName: "Supervisor",
                        tabIcon: SupervisorAccount,
                        tabContent: (
                          <GridContainer align="center">
                            <GridItem>
                              Iniciá sesión con alguna de estas opciones
                            </GridItem>
                            <GridItem>
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
                                    profilePictureUrl:
                                      googleInfo.profileObj.imageUrl,
                                    mail: googleInfo.profileObj.email,
                                    token: googleInfo.tokenId,
                                  };
                                  startLogin(
                                    loginData,
                                    props.history,
                                    "supervisor"
                                  );
                                }}
                                onFailure={console.warn}
                              />
                            </GridItem>
                            <GridItem>
                              <Divider variant="fullWidth" />
                            </GridItem>
                            <GridItem style={{ paddingTop: "15px" }}>
                              <div>
                                O solicitá una cuenta de supervisor para tu
                                organización
                              </div>
                              <ThemeProvider theme={theme}>
                              <Autocomplete
                                fullWidth
                                options={props.organizations}
                                getOptionLabel={(option) => option.displayName}
                                onChange={(e, o) => setOrganization(o)}
                                renderInput={(params) => (
                                  <TextField
                                    error={hasError}
                                    label="Organización"
                                    {...params}
                                    fullWidth
                                    helperText={
                                      hasError
                                        ? "Por favor, elegí una organización"
                                        : undefined
                                    }
                                    onBlur={() => setHasError(false)}
                                  />
                                )}
                              />
                              </ThemeProvider>
                              <GoogleLogin
                                clientId={googleClientId}
                                render={(renderProps) => (
                                  <Button
                                    style={{ marginTop: "15px" }}
                                    disabled={disabled}
                                    onClick={() => {
                                      if (organization == null) {
                                        setHasError(true);
                                      } else {
                                        renderProps.onClick();
                                        setDisabled(true);
                                      }
                                    }}
                                    fullWidth
                                    color="primary"
                                  >
                                    Solicitar
                                  </Button>
                                )}
                                onSuccess={(res) => {
                                  let googleInfo = res as GoogleLoginResponse;
                                  if (organization == null) {
                                    setDisabled(false);
                                  } else {
                                    requestSupervisorAccount(
                                      organization.id,
                                      googleInfo.googleId,
                                      googleInfo.profileObj.name,
                                      googleInfo.profileObj.email,
                                      googleInfo.profileObj.imageUrl
                                    )
                                      .then(() => setDisabled(false))
                                      .then(() => setSuccess(true))
                                      .catch(() => setError(true));
                                  }
                                }}
                                onFailure={console.warn}
                              />
                              <Snackbar
                                open={success}
                                autoHideDuration={6000}
                                onClose={() => setSuccess(false)}
                              >
                                <Alert
                                  onClose={() => setSuccess(false)}
                                  severity="success"
                                >
                                  ¡Listo! Un administrador revisará tu solicitud
                                  y te llegará un mail a la casilla con la que
                                  te registraste.
                                </Alert>
                              </Snackbar>
                              <Snackbar
                                open={error}
                                autoHideDuration={6000}
                                onClose={() => {
                                  setError(false);
                                  setDisabled(false);
                                }}
                              >
                                <Alert
                                  onClose={() => {
                                    setError(false);
                                    setDisabled(false);
                                  }}
                                  severity="error"
                                >
                                  ¡Lo sentimos! Salió algo mal procesando tu
                                  solicitud y nuestros ingenieros ya están
                                  resolviéndolo.
                                </Alert>
                              </Snackbar>
                            </GridItem>
                          </GridContainer>
                        ),
                      },
                    ]}
                    centered
                  />
                </form>
              </div>
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
    organizations: rootState.common.organizations,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(LoginPage)));

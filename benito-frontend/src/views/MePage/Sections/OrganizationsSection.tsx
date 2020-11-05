import { Card, CircularProgress, createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core";
import React, { useState } from "react";
import { hot } from "react-hot-loader";
import GridContainer from "../../../components/Grid/GridContainer";
import { Organization, Person, Role } from "../../../types";
import organizationsStyle from "../../../assets/jss/material-kit-react/views/meSections/organizationsStyle";
import GridItem from "../../../components/Grid/GridItem";
import {
  cardTitle,
  cardLink,
  cardSubtitle,
} from "../../../assets/jss/material-kit-react";
import CardBody from "../../../components/Card/CardBody";
import CustomButton from "../../../components/CustomButtons/Button";
import classNames from "classnames";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import {
  leaveOrganization,
  mapRoleToCollection,
} from "../../../functions/user";
import { grey } from "@material-ui/core/colors";
import { RootState } from "../../../reducers";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { SessionState } from "../../../store/session/types";
import { updateSessionState } from "../../../actions/session";
import store from "../../../store";

const styles = {
  ...organizationsStyle,
  cardTitle,
  cardLink,
  cardSubtitle,
};

interface OrganizationsSectionProps extends RouteComponentProps {
  user: Person;
  role: Role;
  session?: SessionState;
}

const theme = createMuiTheme({
  palette: {
    primary: grey,
  },
});

const useStyles = makeStyles(styles);

const OrganizationsSection = (props: OrganizationsSectionProps) => {

  let color: string = "#c41234"
  if(props.session && props.session.isLoggedIn && props.session.selectedOrganization){
    color = props.session.selectedOrganization.color
  }

  const classes = useStyles();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [
    selectedOrganization,
    setSelectedOrganization,
  ] = useState<Organization | null>(null);
  const [organizations, setOrganizations] = useState(props.user.organizations);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setIsModalOpen(false);
  const handleOpen = () => setIsModalOpen(true);

  console.log(organizations)

  if (organizations.length == 0) {
    
    return (
      <GridContainer justify="center" className={classes.container}>
        <h4>Parece que no pertenecés a ninguna organización :(</h4>
      </GridContainer>
    );
  }

  return (
    <div>
      <GridContainer justify="left" className={classes.container}>
        {organizations.map((o, idx) => (
          <GridItem
            key={idx}
            xs={12}
            sm={12}
            md={6}
            className={classes.rowItem}
          >
            <Card style={{ width: "13rem", backgroundColor: "lightgrey" }}>
              <CardBody>
                <div
                  className={classNames(classes.cardTitle, classes.orgHeader)}
                >
                  <img src={o.iconUrl} className={classes.orgIcon} alt="Logo organizacion"/>{" "}
                  <h4 className={classes.cardTitle}>{o.displayName}</h4>
                </div>

                <CustomButton
                  type="button"
                  color={color}
                  className={classes.cardLink}
                  onClick={() => {
                    handleOpen();
                    setSelectedOrganization(o);
                  }}
                >
                  Abandonar
                </CustomButton>
              </CardBody>
            </Card>
          </GridItem>
        ))}
      </GridContainer>
      <ThemeProvider theme={theme}>
      <Dialog
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Abandonar organización
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {loading ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              `¿Estás seguro de que querés abandonar ${selectedOrganization?.displayName}? Mirá que esta acción no se
              puede deshacer, si querés volver a formar parte de la organización,
              tendrás que contactarte con alguno de los encargados de la misma.
              `
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No, quiero quedarme
          </Button>
          <Button
            onClick={() => {
              setLoading(true);
              leaveOrganization(
                props.user.id,
                mapRoleToCollection(props.role),
                selectedOrganization?.id!
              )
                .then((res) => res.data)
                .then((p) => {
                  setOrganizations(p.organizations)
                  if(props.session && props.session.isLoggedIn){
                    if(p.organizations.includes(props.session.selectedOrganization)){
                      store.dispatch(
                        updateSessionState({
                          ...props.session,
                          organizations: p.organizations
                        })
                      ) 
                    } else {
                      store.dispatch(
                        updateSessionState({
                          ...props.session,
                          organizations: p.organizations,
                          selectedOrganization: p.organizations[0]
                        })
                      ) 
                    }
                  }
                })
                .catch(console.error)
                .then(() => handleClose())
                .then(() => setLoading(false));
            }}
            color="primary"
            autoFocus
          >
            Sí, estoy seguro
          </Button>
        </DialogActions>
      </Dialog>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(OrganizationsSection)));
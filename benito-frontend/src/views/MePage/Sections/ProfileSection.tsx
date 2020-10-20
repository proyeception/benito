import {
  Button,
  createMuiTheme,
  FormControlLabel,
  InputLabel,
  makeStyles,
  TextField,
  ThemeProvider,
  withStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { hot } from "react-hot-loader";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { Person, Role, Social } from "../../../types";
import styles from "../../../assets/jss/material-kit-react/views/meSections/profileStyle";
import CustomButton from "../../../components/CustomButtons/Button";
import { mapRoleToCollection, updateUser } from "../../../functions/user";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { grey } from "@material-ui/core/colors";
import Switch from "@material-ui/core/Switch";
import Spinner from "../../../components/Spinner/Spinner";

const useStyles = makeStyles(styles);

interface ProfileSectionProps extends RouteComponentProps {
  user: Person;
  role: Role;
}

const ProfileSection = (props: ProfileSectionProps) => {
  const classes = useStyles();

  const [socials, setSocials] = useState(props.user.socials);
  const [username, setUsername] = useState(props.user.username);
  const [fullName, setFullName] = useState(props.user.fullName);
  const [phone, setPhone] = useState(props.user.contact?.phone);
  const [mail, setMail] = useState(props.user.contact?.mail);
  const [twitter, setTwitter] = useState(props.user.socials.twitter);
  const [linkedin, setLinkedin] = useState(props.user.socials.linkedin);
  const [facebook, setFacebook] = useState(props.user.socials.facebook);

  const [twitterEnabled, setTwitterEnabled] = useState(
    socials.twitter != undefined
  );
  const [linkedinEnabled, setLinkedinEnabled] = useState(
    socials.linkedin != undefined
  );
  const [facebookEnabled, setFacebookEnabled] = useState(
    socials.facebook != undefined
  );

  const [lastTwitter, setLastTwitter] = useState(props.user.socials.twitter);
  const [lastLinkedin, setLastLinkedin] = useState(props.user.socials.linkedin);
  const [lastFacebook, setLastFacebook] = useState(props.user.socials.facebook);

  const theme = createMuiTheme({
    palette: {
      primary: grey,
    },
  });

  console.error(socials);

  const RedSwitch = withStyles({
    switchBase: {
      color: "#999",
      "&$checked": {
        color: "#c41234",
      },
      "&$checked + $track": {
        backgroundColor: "#c41234",
      },
    },
    checked: {},
    track: {},
  })(Switch);

  return (
    <GridContainer justify="left" className={classes.container}>
      <GridItem xs={12} sm={12} md={6} className={classes.rowItem}>
        <ThemeProvider theme={theme}>
          <TextField
            variant="outlined"
            label="Nombre"
            fullWidth
            value={fullName}
            onChange={(e) => setFullName(e.currentTarget.value)}
          />
        </ThemeProvider>
      </GridItem>
      <GridItem xs={12} sm={12} md={6} className={classes.rowItem}>
        <ThemeProvider theme={theme}>
          <TextField
            InputProps={{
              readOnly: true,
            }}
            disabled
            variant="outlined"
            label="Mail"
            fullWidth
            value={mail}
          />
        </ThemeProvider>
      </GridItem>
      <GridItem
        xs={12}
        sm={12}
        md={12}
        className={classes.rowItem}
        style={{ textAlign: "left" }}
      >
        <InputLabel>Sociales</InputLabel>
      </GridItem>
      <GridItem
        xs={12}
        sm={12}
        md={12}
        className={classes.rowItem}
        align="left"
      >
        <FormControlLabel
          control={
            <RedSwitch
              checked={twitterEnabled}
              onChange={() => {
                if(!lastTwitter){
                  setLastTwitter("https://www.twitter.com/")
                }
                if (twitterEnabled) {
                  setLastTwitter(twitter);
                  setTwitter(undefined);
                  setTwitterEnabled(false);
                } else {
                  setTwitter(lastTwitter);
                  setTwitterEnabled(true);
                }
              }}
              value="checkedA"
            />
          }
          label="Twitter"
        />
        <TextField
          variant="outlined"
          fullWidth
          disabled={!twitterEnabled}
          value={twitter || lastTwitter}
          onChange={(e) => {
            if(e.currentTarget.value.startsWith("https://www.twitter.com/")){
              setTwitter(e.currentTarget.value)
              }
            }}
          id="twitterField"
        />
      </GridItem>
      <GridItem
        xs={12}
        sm={12}
        md={12}
        className={classes.rowItem}
        align="left"
      >
        <FormControlLabel
          control={
            <RedSwitch
              checked={linkedinEnabled}
              color="primary"
              onChange={() => {
                if(!lastLinkedin){
                  setLastLinkedin("https://www.linkedin.com/")
                }
                if (linkedinEnabled) {
                  setLastLinkedin(linkedin);
                  setLinkedin(undefined);
                  setLinkedinEnabled(false);
                } else {
                  setLinkedin(lastLinkedin);
                  setLinkedinEnabled(true);
                }
              }}
              value="checkedA"
            />
          }
          label="Linkedin"
        />
        <TextField
          variant="outlined"
          fullWidth
          disabled={!linkedinEnabled}
          value={linkedin || lastLinkedin}
          onChange={(e) => {
            if(e.currentTarget.value.startsWith("https://www.linkedin.com/")){
              setLinkedin(e.currentTarget.value)
            }
            }}
        />
      </GridItem>
      <GridItem
        xs={12}
        sm={12}
        md={12}
        className={classes.rowItem}
        align="left"
      >
        <FormControlLabel
          control={
            <RedSwitch
              checked={facebookEnabled}
              onChange={() => {
                if(!lastFacebook){
                  setLastFacebook("https://www.facebook.com/")
                }
                if (facebookEnabled) {
                  setLastFacebook(facebook);
                  setFacebook(undefined);
                  setFacebookEnabled(false);
                } else {
                  setFacebook(lastFacebook);
                  setFacebookEnabled(true);
                }
              }}
              value="checkedA"
            />
          }
          label="Facebook"
        />
        <TextField
          variant="outlined"
          fullWidth
          disabled={!facebookEnabled}
          value={facebook || lastFacebook}
          onChange={(e) => {
            if(e.currentTarget.value.startsWith("https://www.facebook.com/")){
              setFacebook(e.currentTarget.value)
            }
            }}
        />
      </GridItem>
      <GridItem
        xs={12}
        sm={12}
        md={12}
        className={classes.rowItem}
        style={{ textAlign: "right" }}
      >
        <CustomButton
          type="button"
          color="primary"
          onClick={() => {
            updateUser(mapRoleToCollection(props.role), props.user.id, {
              socials: {
                twitter: twitter,
                facebook: facebook,
                linkedin: linkedin,
              },
              username: username,
              fullName: fullName,
              phone: phone,
              mail: mail,
            })
              .catch(console.error)
              .then(() => {
                props.history.go(0);
              });
          }}
        >
          Guardar cambios
        </CustomButton>
      </GridItem>
    </GridContainer>
  );
};

export default hot(module)(withRouter(ProfileSection));

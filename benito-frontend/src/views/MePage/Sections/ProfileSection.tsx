import { Button, createMuiTheme, FormControlLabel, InputLabel, makeStyles, TextField, ThemeProvider, withStyles } from "@material-ui/core";
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
  const [twitter, setCheckedTwitter] = React.useState(socials[0].socialProfileUrl != "https://www.twitter.com/");
  const [lastTwitter, setLastTwitter] = React.useState("https://www.twitter.com/");
  const [linkedin, setCheckedLinkedin] = React.useState(socials[1].socialProfileUrl != "https://www.linkedin.com/");
  const [lastLinkedin, setLastLinkedin] = React.useState("https://www.linkedin.com/");
  const [facebook, setCheckedFacebook] = React.useState(socials[2].socialProfileUrl != "https://www.facebook.com/");
  const [lastFacebook, setLastFacebook] = React.useState("https://www.facebook.com/");

  const theme = createMuiTheme({
    palette: {
      primary: grey,
    },
  });

  console.error(socials)

  const RedSwitch = withStyles({
    switchBase: {
      color: "#999",
      '&$checked': {
        color:"#c41234",
      },
      '&$checked + $track': {
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
      <GridItem xs={12} sm={12} md={12} className={classes.rowItem} align="left">
        <FormControlLabel
            control={<RedSwitch
              checked={twitter}
              
              onChange={event => {
                if(twitter){
                  setLastTwitter(socials[0].socialProfileUrl)
                  socials[0].socialProfileUrl = "https://www.twitter.com/"
                  setCheckedTwitter(false)
                } else {
                  console.error(lastTwitter)
                  socials[0].socialProfileUrl = lastTwitter
                  setCheckedTwitter(true)
                }
              }}
              value="checkedA"
            />}
            label="Twitter"
            
          />
            <TextField
              variant="outlined"
              fullWidth
              disabled={!twitter}
              value={socials[0].socialProfileUrl}
              onChange={(e) => {
                if(e.currentTarget.value.startsWith("https://www.twitter.com/")){
                  setSocials([{ socialName: "Twitter", socialProfileUrl: e.currentTarget.value}, socials[1], socials[2]])
                }
                }}
                id="twitterField"
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} className={classes.rowItem} align="left">
        <FormControlLabel
            control={<RedSwitch
              checked={linkedin}
              color="primary"
              onChange={event => {
                if(linkedin){
                  setLastLinkedin(socials[1].socialProfileUrl)
                  socials[1].socialProfileUrl = "https://www.linkedin.com/"
                  setCheckedLinkedin(false)
                } else {
                  console.error(lastLinkedin)
                  socials[1].socialProfileUrl = lastLinkedin
                  setCheckedLinkedin(true)
                }
              }}
              value="checkedA"
            />}
            label="Linkedin"
            
          />
          <TextField
            variant="outlined"
            fullWidth
            disabled={!linkedin}
            value={socials[1].socialProfileUrl}
            onChange={(e) => {
              if(e.currentTarget.value.startsWith("https://www.linkedin.com/")){
                setSocials([socials[0], { socialName: "Linkedin", socialProfileUrl: e.currentTarget.value},  socials[2]])
              }
              }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} className={classes.rowItem} align="left">
        <FormControlLabel
            control={<RedSwitch
              checked={facebook}
              
              onChange={event => {
                if(facebook){
                  setLastFacebook(socials[2].socialProfileUrl)
                  socials[2].socialProfileUrl = "https://www.facebook.com/"
                  setCheckedFacebook(false)
                } else {
                  console.error(lastFacebook)
                  socials[2].socialProfileUrl = lastFacebook
                  setCheckedFacebook(true)
                }
              }}
              value="checkedA"
            />}
            label="Facebook"
            
          />
          <TextField
            variant="outlined"
            fullWidth
            disabled={!facebook}
            value={socials[2].socialProfileUrl}
            onChange={(e) => {
              if(e.currentTarget.value.startsWith("https://www.facebook.com/")){
              setSocials([socials[0], socials[1], { socialName: "Facebook", socialProfileUrl: e.currentTarget.value}])
              }}}
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
              socials: socials.filter((s) => s.socialProfileUrl != ""),
              username: username,
              fullName: fullName,
              phone: phone,
              mail: mail,
            })
              .catch(console.error)
              .then(() => {
                props.history.go(0)})
          }}
        >
          Guardar cambios
        </CustomButton>
      </GridItem>
    </GridContainer>
  );
};

export default hot(module)(withRouter(ProfileSection));

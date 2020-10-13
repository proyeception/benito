import { Button, createMuiTheme, InputLabel, makeStyles, TextField, ThemeProvider } from "@material-ui/core";
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

  const theme = createMuiTheme({
    palette: {
      primary: grey,
    },
  });

  console.error(socials)
  
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
          variant="outlined"
          label="Nombre de usuario"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        </ThemeProvider>
      </GridItem>
      <GridItem xs={12} sm={12} md={6} className={classes.rowItem}>
      <ThemeProvider theme={theme}>
        <TextField
          variant="outlined"
          label="Mail"
          fullWidth
          value={mail}
          onChange={(e) => setMail(e.currentTarget.value)}
        />
        </ThemeProvider>
      </GridItem>
      <GridItem xs={12} sm={12} md={6} className={classes.rowItem}>
        <TextField
          variant="outlined"
          label="Teléfono"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.currentTarget.value)}
        />
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
      <GridItem xs={12} sm={12} md={12} className={classes.rowItem}>
          <TextField
            variant="outlined"
            fullWidth
            value={socials[0].socialProfileUrl}
            onChange={(e) => {
              if(e.currentTarget.value.startsWith("https://twitter.com/")){
                setSocials([{ socialName: "Twitter", socialProfileUrl: e.currentTarget.value}, socials[1], socials[2]])
              }
              }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} className={classes.rowItem}>
          <TextField
            variant="outlined"
            fullWidth
            value={socials[1].socialProfileUrl}
            onChange={(e) => {
              if(e.currentTarget.value.startsWith("https://www.linkedin.com/")){
                setSocials([socials[0], { socialName: "Linkedin", socialProfileUrl: e.currentTarget.value},  socials[2]])
              }
              }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} className={classes.rowItem}>
          <TextField
            variant="outlined"
            fullWidth
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

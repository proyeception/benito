import { Button, createMuiTheme, InputLabel, makeStyles, TextField, ThemeProvider } from "@material-ui/core";
import React, { useState } from "react";
import { hot } from "react-hot-loader";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { Person, Role } from "../../../types";
import styles from "../../../assets/jss/material-kit-react/views/meSections/profileStyle";
import { AddCircle } from "@material-ui/icons";
import CustomButton from "../../../components/CustomButtons/Button";
import { mapRoleToCollection, updateUser } from "../../../functions/user";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { grey } from "@material-ui/core/colors";

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
      {socials.map((s, idx) => (
        <GridItem xs={12} sm={12} md={12} className={classes.rowItem}>
          <TextField
            variant="outlined"
            fullWidth
            value={s.socialProfileUrl}
            key={idx}
          />
        </GridItem>
      ))}
      <Button
        startIcon
        fullWidth
        onClick={() =>
          setSocials(
            socials.concat({
              socialName: "",
              socialProfileUrl: "",
            })
          )
        }
      >
        <AddCircle /> Agregar social
      </Button>
      <GridItem
        xs={12}
        sm={12}
        md={12}
        className={classes.rowItem}
        style={{ textAlign: "left" }}
      >
        <CustomButton
          type="button"
          color="success"
          onClick={() =>
            updateUser(mapRoleToCollection(props.role), props.user.id, {
              socials: socials.filter((s) => s.socialProfileUrl != ""),
              username: username,
              fullName: fullName,
              phone: phone,
              mail: mail,
            })
              .catch(console.error)
              .then(() => props.history.go(0))
          }
        >
          Guardar cambios
        </CustomButton>
      </GridItem>
    </GridContainer>
    
  );
};

export default hot(module)(withRouter(ProfileSection));

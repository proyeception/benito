import { Button, InputLabel, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { hot } from "react-hot-loader";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { Person } from "../../../types";
import styles from "../../../assets/jss/material-kit-react/views/meSections/profileStyle";
import { AddCircle } from "@material-ui/icons";
import CustomButton from "../../../components/CustomButtons/Button";

const useStyles = makeStyles(styles);

type ProfileSectionProps = {
  user: Person;
};

const ProfileSection = (props: ProfileSectionProps) => {
  const classes = useStyles();
  const { ...rest } = props;

  const [socials, setSocials] = useState(
    props.user.socials.map((s, idx) => (
      <GridItem xs={12} sm={12} md={12} className={classes.rowItem}>
        <TextField
          variant="outlined"
          fullWidth
          value={s.socialProfileUrl}
          key={idx}
        />
      </GridItem>
    ))
  );

  return (
    <GridContainer justify="left" className={classes.container}>
      <GridItem xs={12} sm={12} md={6} className={classes.rowItem}>
        <TextField
          variant="outlined"
          label="Nombre"
          fullWidth
          value={props.user.fullName}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={6} className={classes.rowItem}>
        <TextField
          variant="outlined"
          label="Nombre de usuario"
          fullWidth
          value={props.user.username}
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
      {socials}
      <Button
        startIcon
        fullWidth
        onClick={() =>
          setSocials(
            socials.concat(
              <GridItem xs={12} className={classes.rowItem} sm={12} md={12}>
                <TextField variant="outlined" fullWidth key={socials.length} />
              </GridItem>
            )
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
        <CustomButton type="button" color="success">
          Guardar cambios
        </CustomButton>
      </GridItem>
    </GridContainer>
  );
};

export default hot(module)(ProfileSection);

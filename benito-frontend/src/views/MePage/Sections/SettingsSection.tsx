import React, { useState } from "react";
import { hot } from "react-hot-loader";
import GridContainer from "../../../components/Grid/GridContainer";
import { Person, Role } from "../../../types";
import styles from "../../../assets/jss/material-kit-react/views/meSections/settingsStyle";
import { makeStyles, TextField } from "@material-ui/core";
import GridItem from "../../../components/Grid/GridItem";
import classNames from "classnames";
import ClearIcon from "@material-ui/icons/Clear";
import CustomButton from "../../../components/CustomButtons/Button";

type SettingsSectionProps = {
  user: Person;
  role: Role;
};

const useStyles = makeStyles(styles);

const SettingsSection = (props: SettingsSectionProps) => {
  const classes = useStyles();

  const [apiKeyAlias, setApiKeyAlias] = useState("");

  return (
    <GridContainer justify="left" className={classes.container}>
      <GridItem className={classes.rowItem} style={{ textAlign: "left" }}>
        <h3 className={classes.title}>Ajustes de desarrollador</h3>
        <h4 className={classes.subtitle}>Claves de API</h4>
        <div className={classes.subtitle}>
          Para ser usadas con la{" "}
          <a href="https://github.com/proyeception/benito/wiki" target="_blank">
            API pública de Proyectate
          </a>
        </div>
      </GridItem>
      <GridItem className={classes.rowItem}>
        {props.user.apiKeys?.map((a, idx) => (
          <div
            className={classNames(classes.subtitle, classes.apiKey)}
            key={idx}
          >
            <div>
              {a.name}: {a.scopes.join(", ")}
            </div>
            <CustomButton type="danger">
              <ClearIcon /> Borrar
            </CustomButton>
          </div>
        ))}
      </GridItem>
      <GridItem className={classes.rowItem}>
        <div className={classes.subtitle} style={{ paddingBottom: "10px" }}>
          Agregar una clave nueva
        </div>
        <TextField
          fullWidth
          variant="outlined"
          label="Alias"
          onChange={(e) => setApiKeyAlias(e.currentTarget.value)}
        />
      </GridItem>
      <GridItem className={classes.rowItem}>
        <CustomButton color="success">Guardar</CustomButton>
      </GridItem>
    </GridContainer>
  );
};

export default hot(module)(SettingsSection);

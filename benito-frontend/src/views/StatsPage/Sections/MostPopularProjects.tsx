import { InputLabel, makeStyles, Select, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RootState } from "../../../reducers";
import { Category, Organization, OrganizationQuantityType } from "../../../types";
import { ChartOptions } from "chart.js";
import { Pie } from 'react-chartjs-2';
import withProjectxOrganizations from '../../../hooks/withProjectsxOrganizations';
import { updateProjectxQuantity } from "../../../functions/project";
import Spinner from "../../../components/Spinner/Spinner";
import { PENDING } from "../../../hooks/withFetch";
import exclamation from "../../../assets/img/proyectate/exclamation.jpg"
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import styles from "../../../assets/jss/material-kit-react/views/stats/statsStyle";
import moment from "moment"

type OrganizationQuantityProps = {
  categories: Array<Category>;
  organizations: Array<Organization>;
  years: Array<number>;
  category?: Category;
  variant?: "standard" | "outlined" | "filled" | undefined;
};

const useStyles = makeStyles(styles);
  
const OrganizationQuantity = (props: OrganizationQuantityProps) => {

  const classes = useStyles();
  
  const [labels, setLabels] = useState<Array<string>>([]);
  

  const results = withProjectxOrganizations("", (r) => {
  });

  if (results.type == PENDING) {
    return <Spinner />;
  }

  return (
  <div>
    <div className={classes.title} style={{paddingTop: "20px"}}>Proyectos más populares</div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={4} lg={4} id="category-select">
        <Autocomplete
          fullWidth
          options={props.categories}
          getOptionLabel={(option) => option.name}
          defaultValue={props.category}
          onChange={(e, c) => {
            let category = ""
            if(c) {
              category = c!.id
            }
            console.error(category)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Categoría"
              variant={props.variant}
            />
          )}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={4} lg={4} id="year-select">
        <Autocomplete
          fullWidth
          options={props.years}
          getOptionLabel={(option) => option.toString()}
          onChange={(e, a) => {
            console.error(a)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Año"
              variant={props.variant}
            />
          )}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={4} lg={4} id="organization-select">
        <Autocomplete
          fullWidth
          options={props.organizations}
          getOptionLabel={(option) =>
            option.displayName
          }
          onChange={(e, o) => console.error(o)}
          renderInput={(params) => (
            <TextField
              label="Organización"
              {...params}
              fullWidth
            />
          )}
        />
      </GridItem>
      <div style={{paddingTop: "20px", paddingBottom: "20px"}}>
        {labels.length == 0 ? (
          <div>
            <GridContainer >
              <GridItem xs={12} sm={12} md={12} lg={6} id="search-box">
                <div style={{font: '"Roboto", "Helvetica", "Arial", sans-serif', textAlign: "center", verticalAlign: "middle", color: "#c41234", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", fontSize: "30px", lineHeight: "initial", height: "90%"}}> 
                  No se encontraron resultados
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={12} lg={6} id="search-box">
              <img src={exclamation} style={{maxWidth:"100%"}}/>
              </GridItem>
            </GridContainer>
          </div>) : (
            <div>Holi</div>
          )
        }
      </div>
    </GridContainer>
  </div>
  )
}

const mapStateToProps = (rootState: RootState) => {

  const minYear = 2010
  const maxYear = moment().year();

  let years: Array<number> = []
  let counter = maxYear

  while(counter >= minYear){
    years.push(counter)
    counter = counter - 1
  }

  return {
    categories: rootState.common.categories,
    organizations: rootState.common.organizations,
    years: years
  };
};

export default hot(module)(connect(mapStateToProps)(OrganizationQuantity));

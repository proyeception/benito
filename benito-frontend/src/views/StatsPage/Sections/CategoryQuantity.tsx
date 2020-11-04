import { InputLabel, makeStyles, Select, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RootState } from "../../../reducers";
import { Category, CategoryQuantityType, Organization } from "../../../types";
import { ChartOptions } from "chart.js";
import { Pie } from 'react-chartjs-2';
import { updateCategoryxQuantity } from "../../../functions/project";
import Spinner from "../../../components/Spinner/Spinner";
import { PENDING } from "../../../hooks/withFetch";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import styles from "../../../assets/jss/material-kit-react/views/stats/statsStyle";
import withProjectxCategories from "../../../hooks/withProjectsxCategory";
import exclamation from "../../../assets/img/proyectate/exclamation.jpg"
import { SessionState } from "../../../store/session/types";

type CategoryQuantityProps = {
  organizations: Array<Organization>;
  organization?: Organization | undefined;
  variant?: "standard" | "outlined" | "filled" | undefined;
  session?: SessionState;
};

const useStyles = makeStyles(styles);
  
  const CategoryQuantity = (props: CategoryQuantityProps) => {

    let color: string = "#c41234"
    if(props.session && props.session.isLoggedIn  && props.session.selectedOrganization){
      color = props.session.selectedOrganization.color
    }

    const classes = useStyles();
    
    const [labels, setLabels] = useState<Array<string>>([]);
    const [quantity, setQuantity] = useState<Array<number>>([]);
    const [colors, setColors] = useState<Array<string>>([]);

    const results = withProjectxCategories("", (r) => {
      setLabels(r.map((result: CategoryQuantityType) => result.category))
      setQuantity(r.map((result: CategoryQuantityType) => result.quantity))
      var randomColor = require('randomcolor');
      setColors(r.map(() => randomColor({luminosity: 'light'})))
    });

    if (results.type == PENDING) {
      return <Spinner color={color}/>;
    }

    const data = {
      labels: labels,
      datasets: [{
        data: quantity,
        backgroundColor: colors,
        hoverBackgroundColor: colors
        }]
      };
      
      let options: ChartOptions = {
        legend: {
          position: 'bottom',
        }
      };

    return (
    <div>
        <div className={classes.title} style={{paddingTop: "20px", color: color}}>Cantidad de proyectos por categoría</div>
        <Autocomplete
          fullWidth
          options={props.organizations}
          getOptionLabel={(option) => option.name}
          defaultValue={props.organization}
          onChange={(e, o) => {
            let organization = ""
            if(o) {
              organization = o!.id
            }
            updateCategoryxQuantity(organization).then((r) => {
              setLabels(r.data.map((result: CategoryQuantityType) => result.category))
              setQuantity(r.data.map((result: CategoryQuantityType) => result.quantity))
            })
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Organización"
              variant={props.variant}
            />
          )}
        />
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
                    </div>) : (<Pie data={data} options={options} />)}
          </div>
      </div>
      )
}

const mapStateToProps = (rootState: RootState) => {
  return {
    categories: rootState.common.categories,
    organizations: rootState.common.organizations,
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(CategoryQuantity));

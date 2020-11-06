import { InputLabel, makeStyles, Select, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RootState } from "../../../reducers";
import { Category, OrganizationQuantityType } from "../../../types";
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
import { SessionState } from "../../../store/session/types";

type OrganizationQuantityProps = {
  categories: Array<Category>;
  category?: Category;
  variant?: "standard" | "outlined" | "filled" | undefined;
  session?: SessionState;
};

const useStyles = makeStyles(styles);
  
  const OrganizationQuantity = (props: OrganizationQuantityProps) => {

    let color: string = "#c41234"
    if(props.session && props.session.isLoggedIn  && props.session.selectedOrganization){
      color = props.session.selectedOrganization.color
    }

    const classes = useStyles();

    function updateOrganizationxquantity(id: string){
      withProjectxOrganizations(id, (r) => {
        setLabels(r.map((result: OrganizationQuantityType) => result.organization))
        setQuantity(r.map((result: OrganizationQuantityType) => result.quantity))
      });
    }
    
    const [labels, setLabels] = useState<Array<string>>([]);
    const [quantity, setQuantity] = useState<Array<number>>([]);
    const [colors, setColors] = useState<Array<string>>([]);

    const results = withProjectxOrganizations("", (r) => {
      setLabels(r.map((result: OrganizationQuantityType) => result.organization))
      setQuantity(r.map((result: OrganizationQuantityType) => result.quantity))
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
          options={props.categories}
          getOptionLabel={(option) => option.name}
          defaultValue={props.category}
          onChange={(e, c) => {
            let category = ""
            if(c) {
              category = c!.id
            }
            updateProjectxQuantity(category).then((r) => {
              setLabels(r.data.map((result: OrganizationQuantityType) => result.organization))
              setQuantity(r.data.map((result: OrganizationQuantityType) => result.quantity))
            })
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
                        <img src={exclamation} style={{maxWidth:"100%"}} alt="No se encontraron resultados"/>
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
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(OrganizationQuantity));

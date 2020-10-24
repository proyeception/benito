import { InputLabel, Select, TextField } from "@material-ui/core";
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

type OrganizationQuantityProps = {
  categories: Array<Category>;
  category?: Category;
  variant?: "standard" | "outlined" | "filled" | undefined;
};



  
  const OrganizationQuantity = (props: OrganizationQuantityProps) => {
    
    const [labels, setLabels] = useState<Array<string>>([]);
    const [quantity, setQuantity] = useState<Array<number>>([]);
    const [colors, setColors] = useState<Array<string>>([]);

    const results = withProjectxOrganizations("", (r) => {
      setLabels(r.map((result: OrganizationQuantityType) => result.organization))
      setQuantity(r.map((result: OrganizationQuantityType) => result.quantity))
      var randomColor = require('randomcolor');
      setColors(r.map(() => randomColor()))
    });

    if (results.type == PENDING) {
      return <Spinner />;
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
      {labels.length == 0 ? (<h1>Oops</h1>) : (<Pie data={data} options={options} />)}
    </div>
    )
}

const mapStateToProps = (rootState: RootState) => {
  return {
    categories: rootState.common.categories,
  };
};

export default hot(module)(connect(mapStateToProps)(OrganizationQuantity));

import { InputLabel, Select, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RootState } from "../../../reducers";
import { Category } from "../../../types";
import { ChartOptions } from "chart.js";
import { Pie } from 'react-chartjs-2';

type OrganizationQuantityProps = {
  categories: Array<Category>;
  category?: Category;
  variant?: "standard" | "outlined" | "filled" | undefined;
};


const data = {
    labels: [
      'Red',
      'Green',
      'Yellow'
    ],
    datasets: [{
      data: [300, 50, 100, 239, 10000],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#76A2EB',
        '#31A2EB',
        '#36C2EB',
        '#36AFEB',
        '#36A2AB',
        '#32A2E1',
        '#3622E3',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ]
    }]
  };
  
  let options: ChartOptions = {
    legend: {
      position: 'bottom',
    }
  };
  

const OrganizationQuantity = (props: OrganizationQuantityProps) => (
  <div>
    <Autocomplete
      fullWidth
      options={props.categories}
      getOptionLabel={(option) => option.name}
      defaultValue={props.category}
      onChange={(e, c) => {
        
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
  <Pie data={data} options={options} />
  </div>
);

const mapStateToProps = (rootState: RootState) => {
  return {
    categories: rootState.common.categories,
  };
};

export default hot(module)(connect(mapStateToProps)(OrganizationQuantity));

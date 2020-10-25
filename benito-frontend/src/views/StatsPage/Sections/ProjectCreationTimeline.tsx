import { InputLabel, Select, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RootState } from "../../../reducers";
import { Category, ProjectCreationTimelineType } from "../../../types";
import { ChartOptions } from "chart.js";
import { Line } from 'react-chartjs-2';
import withProjectCreationTimeline from "../../../hooks/withProjectCreationTimeline";
import { updateProjectCreationTimeline } from "../../../functions/project";
import Spinner from "../../../components/Spinner/Spinner";
import { PENDING } from "../../../hooks/withFetch";

type ProjectCreationTimelineProps = {
  categories: Array<Category>;
  category?: Category;
  variant?: "standard" | "outlined" | "filled" | undefined;
};

type TimelineData = {
  label: string,
  data: Array<number>
}
  
  const ProjectCreationTimeline = (props: ProjectCreationTimelineProps) => {
    
    const [labels, setLabels] = useState<Array<string>>([]);
    const [categoriesData, setCategoriesData] = useState<Array<TimelineData>>([]);
    const [colors, setColors] = useState<Array<string>>([]);

    function convertToTimelineData(result:ProjectCreationTimelineType) {
      let tl: TimelineData = {
        label: result.category,
        data: result.quantities.map(t => t.quantity)
      }
      console.log("tl: ", tl)
      return tl
    }

    const results = withProjectCreationTimeline("", (r) => {
      console.log("result: ", r)
      setLabels(r[0].quantities.map(tl => tl.year))
      setCategoriesData(r.map((result: ProjectCreationTimelineType) => convertToTimelineData(result)))
      var randomColor = require('randomcolor');
      setColors(r.map(() => randomColor()))
    });

    if (results.type == PENDING) {
      return <Spinner />;
    }

    const data = {
      labels: labels,
      datasets: categoriesData
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
        onChange={(e, c: Category | null) => {

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
      {labels.length == 0 ? (<h1>No se encontraron resultados</h1>) : (<Line data={data} options={options} />)}
    </div>
    )
}

const mapStateToProps = (rootState: RootState) => {
  return {
    categories: rootState.common.categories,
  };
};

export default hot(module)(connect(mapStateToProps)(ProjectCreationTimeline));

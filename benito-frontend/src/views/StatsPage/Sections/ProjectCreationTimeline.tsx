import { InputLabel, Select, TextField, makeStyles } from "@material-ui/core";
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
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { RemoveCircle } from "@material-ui/icons";
import styles from "../../../assets/jss/material-kit-react/views/stats/statsStyle";
import classNames from "classnames";

type ProjectCreationTimelineProps = {
  categories: Array<Category>;
  category?: Category;
  variant?: "standard" | "outlined" | "filled" | undefined;
  hue: string;
};

type TimelineData = {
  label: string,
  data: Array<number>,
  borderColor: string,
  backgroundColor: string,
}

const useStyles = makeStyles(styles);
  
  const ProjectCreationTimeline = (props: ProjectCreationTimelineProps) => {
    const classes = useStyles();
    const [labels, setLabels] = useState<Array<string>>([]);
    const [categoriesData, setCategoriesData] = useState<Array<TimelineData>>([]);
    const [selectedCategories, setSelectedCategories] = useState<Array<string>>([]);

    function convertToTimelineData(result:ProjectCreationTimelineType) {
      
      var randomColor = require('randomcolor');
      var color:string = randomColor({format:"rgb", luminosity: 'light'})
      let tl: TimelineData = {
        label: result.category,
        data: result.quantities.map(t => t.quantity),
        borderColor: color.replace(")", ", 1)"),
        backgroundColor: color.replace(")", ", 0.2)")
      }
      console.log("tl: ", tl)
      return tl
    }

    function convertCategoryNameToId(categoryName:string) {
      return props.categories.filter(c => c.name === categoryName)[0].id
    }

    function convertCategoryIdToName(categoryId:string) {
      return props.categories.filter(c => c.id === categoryId)[0].name
    }

    const results = withProjectCreationTimeline("", (r) => {
      
      setLabels(r[0].quantities.map(tl => tl.year))
      setCategoriesData(r.map((result: ProjectCreationTimelineType) => convertToTimelineData(result)))
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
      <div className={classes.title} style={{paddingTop: "20px"}}>Cantidad de proyectos por categoría</div>
      {selectedCategories.map((s, idx) => (
        <div
          key={idx}
          className={classNames(
            classes.bullet,
            "underline-hover",
            "cursor-pointer"
          )}
          onClick={() => {

            let scids: Array<string> = selectedCategories.map(sc => convertCategoryNameToId(sc))
            if (scids) {
              scids = scids.filter((sc) => sc != convertCategoryNameToId(s))
            }

            updateProjectCreationTimeline(scids).then((r) => {
              console.log(r)
              setSelectedCategories(scids.map(sc => convertCategoryIdToName(sc)))
              setLabels(r.data[0].quantities.map(tl => tl.year))
              setCategoriesData(r.data.map((result: ProjectCreationTimelineType) => convertToTimelineData(result)))
            })
          }}
        >
          <RemoveCircle /> {s}
        </div>
      ))}
      <GridContainer style={{ display: "flex", alignItems: "center", paddingBottom: "20px" }}>
        <GridItem xs={12}>
          <Autocomplete
            fullWidth
            clearOnBlur
            options={props.categories.map(c => c.name).filter(
              (c) => !selectedCategories.includes(c)
            )}
            getOptionLabel={(option) => option}
            onChange={(e, c) => {
              let scids: Array<string> = selectedCategories.map(sc => convertCategoryNameToId(sc))
              if (c) {
                scids = scids.concat(convertCategoryNameToId(c))
              }
 
              updateProjectCreationTimeline(scids).then((r) => {
                console.log(r)
                setSelectedCategories(scids.map(sc => convertCategoryIdToName(sc)))
                setLabels(r.data[0].quantities.map(tl => tl.year))
                setCategoriesData(r.data.map((result: ProjectCreationTimelineType) => convertToTimelineData(result)))
              })
            }}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </GridItem>
      </GridContainer>
      {labels.length == 0 ? (<h1>No se encontraron resultados</h1>) : (<Line data={data} options={options} />)}
    </div>
    
    )
}

const mapStateToProps = (rootState: RootState) => {
  
  var hues = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink']
    const randomHue = hues[Math.floor((Math.random() * 6))]
    console.error(randomHue)

  return {
    categories: rootState.common.categories,
    hue: randomHue
  };
};

export default hot(module)(connect(mapStateToProps)(ProjectCreationTimeline));

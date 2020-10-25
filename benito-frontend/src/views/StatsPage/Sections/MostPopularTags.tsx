import { Card, GridList, GridListTile, GridListTileBar, Icon, IconButton, makeStyles, TextField, Theme } from "@material-ui/core";
import Button from "../../../components/CustomButtons/Button";
import { Link } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RootState } from "../../../reducers";
import { Category, Organization, OrganizationQuantityType, TopProject } from "../../../types";
import { ChartOptions } from "chart.js";
import { Pie } from 'react-chartjs-2';
import withProjectxOrganizations from '../../../hooks/withProjectsxOrganizations';
import { updateProjectxQuantity, updateTopProjects } from "../../../functions/project";
import Spinner from "../../../components/Spinner/Spinner";
import { PENDING } from "../../../hooks/withFetch";
import exclamation from "../../../assets/img/proyectate/exclamation.jpg"
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import statsStyle from "../../../assets/jss/material-kit-react/views/stats/statsStyle";
import moment from "moment"
import withTopProjects from "../../../hooks/withTopProjects";
import pictureNotFound from "../../../assets/img/proyectate/picture.svg"
import CardBody from "../../../components/Card/CardBody";
import imagesStyles from "../../../assets/jss/material-kit-react/imagesStyles";
import classNames from "classnames";
import { cardTitle } from "../../../assets/jss/material-kit-react";
import ReactWordcloud from "react-wordcloud";

type MostPopularTagsProps = {

};

const spiral: "archimedean" | "rectangular" | undefined = "archimedean"
const fontSizes: [number, number] = [30, 60]

const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: true,
    fontStyle: "normal",
    padding: 0,
    rotations: 3,
    spiral: spiral,
    transitionDuration: 1000,
    fontSizes: fontSizes,
  };

const styles = (theme: Theme) => {
  return { ...statsStyle(theme), ...imagesStyles, cardTitle };
};

const useStyles = makeStyles(styles);

const words = [
    {
      text: 'told',
      value: 64000,
    },
    {
      text: 'mistake',
      value: 11000,
    },
    {
      text: 'thought',
      value: 16000,
    },
    {
      text: 'bad',
      value: 17000,
    },
    {
        text: 'cold',
        value: 64000,
      },
      {
        text: 'ristake',
        value: 11000,
      },
      {
        text: 'ghought',
        value: 16000,
      },
      {
        text: 'cad',
        value: 17000,
      },
      {
        text: 'zold',
        value: 64000,
      },
      {
        text: 'ristake',
        value: 11000,
      },
      {
        text: 'xuhought',
        value: 16000,
      },
      {
        text: 'xiad',
        value: 17000,
      },
      {
        text: 'xghought',
        value: 16000,
      },
      {
        text: 'xcad',
        value: 17000,
      },
      {
        text: 'xzold',
        value: 64000,
      },
      {
        text: 'xristake',
        value: 11000,
      },
      {
        text: 'ñuhought',
        value: 16000,
      },
      {
        text: 'xiad',
        value: 17000,
      },
  ]
  
const MostPopularTags = (props: MostPopularTagsProps) => {

  const classes = useStyles();
  
  const [projects, setProjects] = useState<Array<TopProject>>([]);
  const [category, setCategory] = useState<string | null>("");
  const [organization, setOrganization] = useState<string | null>("");
  const [year, setYear] = useState<number | null>();
  

  const results = withTopProjects((r) => {
    setProjects(r)
  });

  if (results.type == PENDING) {
    return <Spinner />;
  }

  return (
  <div>
    <div className={classes.title} style={{paddingTop: "20px"}}>Proyectos más populares</div>
    <ReactWordcloud words={words} options={options}/>
  </div>
  )
}

const mapStateToProps = (rootState: RootState) => {

};

export default hot(module)(connect(mapStateToProps)(MostPopularTags));

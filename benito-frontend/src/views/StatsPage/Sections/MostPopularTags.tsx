import { Card, GridList, GridListTile, GridListTileBar, Icon, IconButton, makeStyles, TextField, Theme } from "@material-ui/core";
import Button from "../../../components/CustomButtons/Button";
import { Link } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RootState } from "../../../reducers";
import { Category, Organization, OrganizationQuantityType, TopProject, TopTag } from "../../../types";
import { ChartOptions } from "chart.js";
import { Pie } from 'react-chartjs-2';
import withProjectxOrganizations from '../../../hooks/withProjectsxOrganizations';
import { updateProjectxQuantity, updateTopProjects } from "../../../functions/project";
import Spinner from "../../../components/Spinner/Spinner";
import { PENDING, ERROR } from "../../../hooks/withFetch";
import exclamation from "../../../assets/img/proyectate/exclamation.jpg"
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import statsStyle from "../../../assets/jss/material-kit-react/views/stats/statsStyle";
import moment from "moment"
import withTopTags from "../../../hooks/withTopTags";
import pictureNotFound from "../../../assets/img/proyectate/picture.svg"
import CardBody from "../../../components/Card/CardBody";
import imagesStyles from "../../../assets/jss/material-kit-react/imagesStyles";
import classNames from "classnames";
import { cardTitle } from "../../../assets/jss/material-kit-react";
import ReactWordcloud from "react-wordcloud";
import ErrorPage from "../../ErrorPage/ErrorPage";

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


const MostPopularTags = (props: MostPopularTagsProps) => {

  const classes = useStyles();
  
  const [tags, setTags] = useState<Array<TopTag>>([]);  

  function convertTagToWord(tag: TopTag) {
      let word = {
        text: tag.tag,
        value: tag.searchCount
      }
      return word
  }

  const results = withTopTags((r) => {
    setTags(r)
  });

  if (results.type == PENDING) {
    return <Spinner />;
  }

  return (
  <div>
    <div className={classes.title} style={{paddingTop: "20px"}}>Tags más populares</div>
    <ReactWordcloud words={tags.map(convertTagToWord)} options={options}/>
  </div>
  )
}

const mapStateToProps = (rootState: RootState) => {

};

export default hot(module)(connect(mapStateToProps)(MostPopularTags));

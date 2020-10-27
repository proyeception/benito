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

type OrganizationQuantityProps = {
  categories: Array<Category>;
  organizations: Array<Organization>;
  years: Array<number>;
  category?: Category;
  variant?: "standard" | "outlined" | "filled" | undefined;
};

const styles = (theme: Theme) => {
  return { ...statsStyle(theme), ...imagesStyles, cardTitle };
};

const useStyles = makeStyles(styles);
  
const OrganizationQuantity = (props: OrganizationQuantityProps) => {

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
    <GridContainer>
      <GridItem xs={12} sm={12} md={4} lg={4} id="category-select">
        <Autocomplete
          fullWidth
          options={props.categories}
          getOptionLabel={(option) => option.name}
          defaultValue={props.category}
          onChange={(e, c) => {
            let cat: string | null | undefined = null
            if(c != null){
              cat = c.id
            } 
            setCategory(cat)
            updateTopProjects(cat, organization, year).then((r) => {
              setProjects(r.data)
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
      </GridItem>
      <GridItem xs={12} sm={12} md={4} lg={4} id="year-select">
        <Autocomplete
          fullWidth
          options={props.years}
          getOptionLabel={(option) => option.toString()}
          onChange={(e, a) => {
            let y: number | null = null
            if(a != null){
              y = a
            } 
            setYear(y)
            updateTopProjects(category, organization, y).then((r) => {
              setProjects(r.data)
            })
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
          onChange={(e, o) => {
            let org: string | null | undefined = null
            if(o != null){
              org = o.id
            } 
            setOrganization(org)
            updateTopProjects(category, org, year).then((r) => {
              setProjects(r.data)
            })
          }}
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
        {projects.length == 0 ? (
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
            <div>
            <GridContainer justify="center" style={{margin:"auto"}}>
            <GridList cellHeight={180} className={classes.gridList}>
              {projects.map((project) => (
                <GridListTile key={project.projectId} className={classes.fiveColumns}>
                    <img src={project.pictureUrl || pictureNotFound} alt={project.title}/>
                    <GridListTileBar
                      title={project.title}
                      subtitle={<p>Vistas: {project.views}</p>}
                      actionIcon={
                        <IconButton aria-label={`info about ${project.title}`} className={classes.icon}>
                          <a href={`/projects/${project.projectId}`}>
                            <Icon className={classes.icon}>read_more</Icon>
                          </a>
                        </IconButton>
                      }
                    />
                </GridListTile>
              ))}
            </GridList>
          </GridContainer>
          </div>
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

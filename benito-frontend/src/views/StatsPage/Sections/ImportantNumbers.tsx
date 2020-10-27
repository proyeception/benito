import { makeStyles } from "@material-ui/core";
import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import styles from "../../../assets/jss/material-kit-react/views/stats/statsStyle";
import ProjectCount from "./ProjectCount";
import SearchCount from "./SearchCount";


const useStyles = makeStyles(styles);
  
  const ImportantNumbers = () => {

    const classes = useStyles();
 
    return (
      <div>
        <div className={classes.title} style={{paddingTop: "20px"}}>Algunos números importantes</div>
        <ProjectCount />
        <SearchCount />
      </div>
    )
}

const mapStateToProps = () => {
  return {
  };
};

export default hot(module)(connect(mapStateToProps)(ImportantNumbers));

import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import Spinner from "../../../components/Spinner/Spinner";
import { PENDING } from "../../../hooks/withFetch";
import styles from "../../../assets/jss/material-kit-react/views/stats/statsStyle";
import withSearchCount from "../../../hooks/withSearchCount";


const useStyles = makeStyles(styles);
  
  const SearchCount = () => {

    const classes = useStyles();
    
    const [number, setNumber] = useState<number>(0);    
    const results = withSearchCount((result) => {
        setNumber(result.total)
    });

    if (results.type == PENDING) {
      return <Spinner />;
    }

    return (
      <div>
        <div className={classes.subtitle} style={{paddingTop: "10px"}}>Cantidad de búsquedas en Proyectate</div>
        <div className={classes.numbers}>
          {number}
        </div>
      </div>
    )
}

const mapStateToProps = () => {
  return {
  };
};

export default hot(module)(connect(mapStateToProps)(SearchCount));

import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import Spinner from "../../../components/Spinner/Spinner";
import { PENDING } from "../../../hooks/withFetch";
import styles from "../../../assets/jss/material-kit-react/views/stats/statsStyle";
import withProjectCount from "../../../hooks/withProjectCount";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { SessionState } from "../../../store/session/types";
import { RootState } from "../../../reducers";

const useStyles = makeStyles(styles);
  
interface Props extends RouteComponentProps {
  session?: SessionState;
}

  const ProjectCount = (props: Props) => {

    let color: string = "#c41234"
    if(props.session && props.session.isLoggedIn  && props.session.selectedOrganization){
      color = props.session.selectedOrganization.color
    }

    const classes = useStyles();

    const [number, setNumber] = useState<number>(0);    
    const results = withProjectCount((result) => {
        setNumber(result.total)
    });

    if (results.type == PENDING) {
      return <Spinner color={color}/>;
    }

    return (
      <div>
        <div className={classes.subtitle} style={{paddingTop: "10px"}}>Cantidad de proyectos en Proyectate</div>
        <div className={classes.numbers} style={{color: color}}>
          {number}
        </div>
      </div>
    )
}

const mapStateToProps = (rootState: RootState) => {
  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(ProjectCount)));

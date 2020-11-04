import { makeStyles } from "@material-ui/core";
import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import styles from "../../../assets/jss/material-kit-react/views/stats/statsStyle";
import { RootState } from "../../../reducers";
import { SessionState } from "../../../store/session/types";
import ProjectCount from "./ProjectCount";
import SearchCount from "./SearchCount";


const useStyles = makeStyles(styles);
  
interface Props extends RouteComponentProps {
  session?: SessionState;
}

  const ImportantNumbers = (props: Props) => {

    let color: string = "#c41234"
    if(props.session && props.session.isLoggedIn  && props.session.selectedOrganization){
      color = props.session.selectedOrganization.color
    }

    const classes = useStyles();
 
    return (
      <div>
        <div className={classes.title} style={{paddingTop: "20px", color:color}}>Algunos números importantes</div>
        <ProjectCount />
        <SearchCount />
      </div>
    )
}

const mapStateToProps = (rootState: RootState) => {
  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(ImportantNumbers)));

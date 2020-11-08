import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { RootState } from "../../../../reducers";
import { SessionState } from "../../../../store/session/types";

interface ReportErrorOptionsProps extends RouteComponentProps {
  session?: SessionState;
}

const ReportErrorOption = (props: ReportErrorOptionsProps | any) => {

  let color: string = "#c41234"
  if(props.session && props.session.isLoggedIn  && props.session.selectedOrganization){
    color = props.session.selectedOrganization.color
  }

  const addLight = function(color: string, amount: number){
    let cc = parseInt(color,16) + amount;
    let c = (cc > 255) ? 255 : (cc);
    return (c.toString(16).length > 1 ) ? c.toString(16) : `0${c.toString(16)}`.toString();
  }

  const lighten = (color: string, amount: number)=> {
    color = (color.indexOf("#")>=0) ? color.substring(1,color.length) : color;
    amount = parseInt(((255*amount)/100).toString());
    return color = `#${addLight(color.substring(0,2), amount)}${addLight(color.substring(2,4), amount)}${addLight(color.substring(4,6), amount)}`;
  }

  color = lighten(color, 20)

  return <div style={{textAlign: "center"}}>
    <a href="mailto:proyeception@gmail.com" style={{color: "#2f3336"}}>
      <button style={{backgroundColor:color, color: "white", borderColor:color, cursor: "pointer", padding: "10px", borderRadius: "6px", margin: "auto"}}>O podes hacer click acá</button>
    </a>
  </div>;
};

const mapStateToProps = (rootState: RootState) => {

  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(ReportErrorOption)));
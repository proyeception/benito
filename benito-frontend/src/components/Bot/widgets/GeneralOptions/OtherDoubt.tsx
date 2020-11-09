import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { RootState } from "../../../../reducers";
import { SessionState } from "../../../../store/session/types";

interface OtherDoubtProps extends RouteComponentProps {
  session?: SessionState;
}

const OtherDoubt = (props: OtherDoubtProps | any) => {

  let color: string = "#c41234"
  if(props.session && props.session.isLoggedIn  && props.session.selectedOrganization){
    color = props.session.selectedOrganization.color
  }

  return <div style={{textAlign: "right"}}>
    <a href="mailto:proyeception@gmail.com" style={{color: "#2f3336"}}>
      <button style={{backgroundColor:"white", color: color, borderColor:color, border: "solid 1px", cursor: "pointer", padding: "10px", borderRadius: "6px", marginLeft: "auto"}}>Enviar mail</button>
    </a>
  </div>;
};

const mapStateToProps = (rootState: RootState) => {

  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(OtherDoubt)));
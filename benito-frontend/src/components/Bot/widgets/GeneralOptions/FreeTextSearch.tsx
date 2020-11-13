import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ERROR, PENDING } from "../../../../hooks/withFetch";
import withTopCategories from "../../../../hooks/withTopCategories";
import { RootState } from "../../../../reducers";
import { SessionState } from "../../../../store/session/types";
import { CategoryReference, ProjectReference, RecommendedProjects } from "../../../../types";
import Spinner from "../../../Spinner/Spinner";

import Options from "../Options/Options";
import ChatBotError from "./ChatBotError";
import withRecommendedProjectsByText from "../../../../hooks/withRecommendedProjectsByText";
import { useStyles } from "@material-ui/pickers/TimePicker/TimePickerToolbar";

interface GeneralOptionsProps extends RouteComponentProps {
  session?: SessionState;
}

const FreeTextSearch = (props: GeneralOptionsProps | any) => {

    const [projects, setProjects] = useState<Array<ProjectReference>>([]);
    const [mappedProjects, setMappedProjects] = useState<Array<any>>([]);
    const [showMessage, setShowMessage] = useState(true);
    const [emptyResult, setEmptyResult] = useState(false);
    const [finished, setFinished] = useState(false);

  function createOptionFromRecommendedProjectsByText(project: ProjectReference){
    return {
      name: project.name,
      handler: props.actionProvider.handleProjectSelected,
      id: project.id
    }
  }  

  let none = {
    name: "Ninguno me interesa",
    handler: props.actionProvider.handleNoProjectSelected,
    id: "1"
  }

  let textSearch: string = props.textSearch
  console.log('text search: ', textSearch)

  const res = withRecommendedProjectsByText(textSearch, (result) => {
    setProjects(result.projects);
    if(result.projects.length == 0) {
      setEmptyResult(true)
    } else {
      setMappedProjects(result.projects.map(
        (p) => createOptionFromRecommendedProjectsByText(p)))  
    }
  })

  let color: string = "#c41234"
  if(props.session && props.session.isLoggedIn  && props.session.selectedOrganization){
    color = props.session.selectedOrganization.color
  }

  if (res.type == PENDING) {
    return <Spinner color={color}/>;
  }

  if ( res.type == ERROR) {
    if(showMessage){
      setShowMessage(false)
      props.actionProvider.error()
    }
    return <div></div>;
  }
  if (!emptyResult) {
    return  <Options options={mappedProjects.concat(none)} color={color} {...props} cropped={true} />;
  } else {
    if(!finished) {
      console.log('no projects found')
      setFinished(true)
      props.actionProvider.handleEmptyProjectResult()  
    }
    return <div></div>;
  }
};

const mapStateToProps = (rootState: RootState) => {

  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(FreeTextSearch)));
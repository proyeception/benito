import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ERROR, PENDING } from "../../../../hooks/withFetch";
import withTopCategories from "../../../../hooks/withTopCategories";
import { RootState } from "../../../../reducers";
import { SessionState } from "../../../../store/session/types";
import { CategoryReference } from "../../../../types";
import Spinner from "../../../Spinner/Spinner";

import Options from "../Options/Options";

interface GeneralOptionsProps extends RouteComponentProps {
  session?: SessionState;
}

const CategoriesOptions = (props: GeneralOptionsProps | any) => {

  const [categories, setCategories] = useState<Array<CategoryReference>>([]);
  const [showMessage, setShowMessage] = useState(true);

  function createOptionFromCategory(category: CategoryReference){
    return {
      name: category.name,
      handler: props.actionProvider.handleCategory,
      id: category.id
    }
  }  

  const res = withTopCategories((result) => {
    setCategories(result.categories)
  })

  let color: string = "#c41234"
  if(props.session && props.session.isLoggedIn  && props.session.selectedOrganization){
    color = props.session.selectedOrganization.color
  }

  let notSureOption = {
    name: "No estoy seguro...",
    handler: props.actionProvider.handleNotSureOption,
    id: "1"
  }

  if (res.type == PENDING) {
    return <Spinner color={color}/>;
  }

  console.error(res.type)

  if ( res.type == ERROR) {
    if(showMessage){
      setShowMessage(false)
      props.actionProvider.error()
    }
    return <div></div>;
  }

  let mappedResults = categories.map(
    (c) => createOptionFromCategory(c)
  )
  
  return  <Options options={mappedResults.concat(notSureOption)} color={color} {...props}/>;
};

const mapStateToProps = (rootState: RootState) => {

  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(CategoriesOptions)));

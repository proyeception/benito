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

  function createOptionFromCategory(category: CategoryReference){
    console.log(categories)
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

  if (res.type == PENDING || res.type == ERROR) {
    return <Spinner color={'#ffffff'}/>;
  }
  return  <Options options={categories.map(
    (c) => createOptionFromCategory(c)
  )} color={color} {...props}/>;
};

const mapStateToProps = (rootState: RootState) => {

  return {
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(CategoriesOptions)));

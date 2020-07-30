import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import RemarkableGallery from "./RemarkableGallery";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import { Project } from "../../types";
import HomeSearchBox from "./HomeSearchBox";

type Props = {
  remarkableProjects: Array<Project>;
};

const Home = (props: Props) => {
  console.log(props);

  return (
    <div>
      <HomeSearchBox />
      <RemarkableGallery />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return { RemarkableProjects: state.home.remarkableProjects };
};

export default hot(module)(connect(mapStateToProps)(Home));

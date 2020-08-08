import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import CategoriesSearchCarousel from "./CategoriesSearchCarousel";
import HomeSearchBox from "./HomeSearchBox";
import FeaturedGallery from "./FeaturedGallery";
import Proyectate from "./Proyectate";
import { Redirect } from "react-router-dom";
import { buildQueryParams } from "../../functions/search";
import { RootState } from "../../reducers";
import { connect } from "react-redux";

type Props = {
  name: String;
  category: String;
  fromDate: String;
  toDate: String;
};
type State = {
  doRedirect: Boolean;
};

class Home extends React.Component<Props, State> {
  constructor(props: Props, ctx: any) {
    super(props, ctx);
    this.state = {
      doRedirect: false,
    };
  }

  render() {
    if (this.state.doRedirect) {
      return <Redirect to={`/search${buildQueryParams(this.props)}`} />;
    }

    return (
      <div>
        <HomeSearchBox
          setDoRedirect={() => this.setState({ doRedirect: true })}
        />
        <FeaturedGallery />
        <CategoriesSearchCarousel />
        <Proyectate />
      </div>
    );
  }
}

const mapStateToProps = (rootState: RootState) => {
  return rootState.search;
};

export default hot(module)(connect(mapStateToProps)(Home));

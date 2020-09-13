import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import CategoriesSearchCarousel from "./CategoriesSearchCarousel";
import HomeSearchBox from "./HomeSearchBox";
import FeaturedGallery from "./FeaturedGallery";
import Proyectate from "./Proyectate";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import FadeIn from "../Common/FadeIn";

type Props = {
  name: String;
  category: String;
  fromDate: String;
  toDate: String;
};

class Home extends React.Component<Props> {
  constructor(props: Props, ctx: any) {
    super(props, ctx);
    this.state = {};
  }

  render() {
    return (
      <FadeIn className="pt-5">
        <HomeSearchBox
          setDoRedirect={() => this.setState({ doRedirect: true })}
        />
        <FeaturedGallery />
        <CategoriesSearchCarousel />
        <Proyectate />
      </FadeIn>
    );
  }
}

const mapStateToProps = (rootState: RootState) => {
  return rootState.search;
};

export default hot(module)(connect(mapStateToProps)(Home));

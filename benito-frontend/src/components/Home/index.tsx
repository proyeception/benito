import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import CategoriesSearchCarousel from "./CategoriesSearchCarousel";
import HomeSearchBox from "./HomeSearchBox";
import FeaturedGallery from "./FeaturedGallery";
import Proyectate from "./Proyectate";
import { Redirect } from "react-router-dom";

type Props = {};
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
      return <Redirect to="/search" />;
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

export default hot(module)(Home);

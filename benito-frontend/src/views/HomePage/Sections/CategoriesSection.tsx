import React from "react";
import { hot } from "react-hot-loader";
import Carousel from "react-slick";
import Spinner from "../../../components/Spinner/Spinner";
import { Category } from "../../../types";
import { Link } from "react-router-dom";
import { RootState } from "../../../reducers";
import { connect } from "react-redux";
import styles from "../../../assets/jss/material-kit-react/views/homeSections/categoriesStyle";
import { makeStyles } from "@material-ui/core";
import classNames from "classnames";

const useStyles = makeStyles(styles);

type CategoriesSectionProps = {
  categories: Array<Category>;
};

const CategoriesSection = (props: CategoriesSectionProps) => {
  if (props.categories.length == 0) {
    return <Spinner />;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2 className={classes.title} style={{ textAlign: "center" }}>
        O empezá explorando por estas categorías
      </h2>
      <Carousel {...settings}>
        {props.categories.map((c, idx) => (
          <Link to={`/search?category=${c.tagName}&orderBy=VIEWS_DESC`}>
            <div key={idx}>
              <img
                className={classNames("slick-image", classes.img)}
                src={c.imageUrl}
                alt={c.name}
              />
              <div className="slick-caption" style={{ display: "inline" }}>
                <h4>{c.name}</h4>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    categories: rootState.common.categories,
  };
};

export default hot(module)(connect(mapStateToProps)(CategoriesSection));

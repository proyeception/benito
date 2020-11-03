import React from "react";
import { hot } from "react-hot-loader";
import Carousel from "react-slick";
import Spinner from "../../../components/Spinner/Spinner";
import { Category } from "../../../types";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { RootState } from "../../../reducers";
import { connect } from "react-redux";
import styles from "../../../assets/jss/material-kit-react/views/homeSections/categoriesStyle";
import { makeStyles } from "@material-ui/core";
import classNames from "classnames";
import { SessionState } from "../../../store/session/types";

const useStyles = makeStyles(styles);

interface CategoriesSectionProps extends RouteComponentProps {
  categories: Array<Category>;
  session?: SessionState;
};

const CategoriesSection = (props: CategoriesSectionProps) => {

  let color: string = "#c41234"
  if(props.session && props.session.isLoggedIn && props.session.selectedOrganization){
    color = props.session.selectedOrganization.color
  }

  if (props.categories.length == 0) {
    return <Spinner color={color}/>;
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
      <h2 className={classes.title} style={{ textAlign: "center", color:color }}>
        O EMPEZÁ EXPLORANDO POR ESTAS CATEGORÍAS
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
              <div className={classes.cardText} style={{ display: "inline" }}>
                <h4 style={{color: "#2f3336", fontWeight: 400, fontSize:"3vw", opacity: 1, textAlign: "center" }}>{c.name}</h4>
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
    session: rootState.session,
  };
};

export default hot(module)(connect(mapStateToProps)(withRouter(CategoriesSection)));

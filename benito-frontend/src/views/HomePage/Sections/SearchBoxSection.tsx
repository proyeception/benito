import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import { hot } from "react-hot-loader";
import styles from "../../../assets/jss/material-kit-react/views/homeSections/searchBoxStyle";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import classNames from "classnames";
import TitleInput from "../../../components/SearchBox/TitleInput";
import FromDateInput from "../../../components/SearchBox/FromDateInput";
import ToDateInput from "../../../components/SearchBox/ToDateInput";
import CategorySelector from "../../../components/SearchBox/CategorySelector";
import SearchButton from "../../../components/SearchBox/SearchButton";
import KeywordInput from "../../../components/SearchBox/KeywordInput";
import { ExpandMore } from "@material-ui/icons";
import TagInput from "../../../components/SearchBox/TagInput";
import OrganizationSelector from "../../../components/SearchBox/OrganizationSelector";
import Sort from "../../../components/SearchBox/Sort";

const useStyles = makeStyles((theme: Theme) => ({
  ...styles,
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const SearchBoxSection = () => {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <div className={classNames(classes.container, classes.searchBox)}>
        <GridContainer>
          <GridItem md={12}>
            <h3>
              <b>Proyectos</b>
            </h3>
          </GridItem>
          <GridItem md={4} className={classes.row}>
            <KeywordInput />
          </GridItem>
          <GridItem md={2} className={classes.row}>
            <FromDateInput />
          </GridItem>
          <GridItem md={2} className={classes.row}>
            <ToDateInput />
          </GridItem>
          <GridItem md={2} className={classes.row}>
            <CategorySelector />
          </GridItem>
          <GridItem md={2} className={classes.row}>
            <SearchButton />
          </GridItem>
        </GridContainer>
        <Accordion
          style={{
            WebkitBoxShadow: "none",
            MozBoxShadow: "none",
            boxShadow: "none",
            border: "none",
          }}
        >
          <AccordionSummary
            style={{ height: "15px", minHeight: "0px" }}
            expandIcon={<ExpandMore />}
            aria-controls="panelia-content"
          ></AccordionSummary>
          <AccordionDetails>
            <GridContainer style={{ width: "100%" }}>
              <GridItem md={4} className={classes.row}>
                <TitleInput />
              </GridItem>
              <GridItem md={2} className={classes.row}>
                <TagInput />
              </GridItem>
              <GridItem md={3} className={classes.row}>
                <OrganizationSelector />
              </GridItem>
              <GridItem md={3} className={classes.row}>
                <Sort />
              </GridItem>
            </GridContainer>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default hot(module)(SearchBoxSection);

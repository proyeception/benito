import { makeStyles } from "@material-ui/core";
import React from "react";
import { hot } from "react-hot-loader";
import styles from "../../assets/jss/material-kit-react/components/headerSearchBoxStye";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import CategorySelector from "../SearchBox/CategorySelector";
import FromDateInput from "../SearchBox/FromDateInput";
import KeywordInput from "../SearchBox/KeywordInput";
import OrganizationSelector from "../SearchBox/OrganizationSelector";
import SearchButton from "../SearchBox/SearchButton";
import Sort from "../SearchBox/Sort";
import TitleInput from "../SearchBox/TitleInput";
import ToDateInput from "../SearchBox/ToDateInput";

const useStyles = makeStyles(styles);

const HeaderSearchBox = () => {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem className={classes.row}>
        <TitleInput />
      </GridItem>
      <GridItem className={classes.row}>
        <FromDateInput variant="dialog" />
      </GridItem>
      <GridItem className={classes.row}>
        <ToDateInput variant="dialog" />
      </GridItem>
      <GridItem className={classes.row}>
        <KeywordInput />
      </GridItem>
      <GridItem className={classes.row}>
        <CategorySelector />
      </GridItem>
      <GridItem className={classes.row}>
        <OrganizationSelector />
      </GridItem>
      <GridItem className={classes.row}>
        <Sort />
      </GridItem>
      <GridItem className={classes.row}>
        <SearchButton />
      </GridItem>
    </GridContainer>
  );
};

export default hot(module)(HeaderSearchBox);

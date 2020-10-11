import React from "react";
import { hot } from "react-hot-loader";
import styles from "../../../assets/jss/material-kit-react/views/searchSections/searchBoxStyle";
import {
  makeStyles,
} from "@material-ui/core";
import store from "../../../store";
import {
  updateFetchStatus,
} from "../../../actions/search";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { REFRESH } from "../../../store/search/types";
import TitleInput from "../../../components/SearchBox/TitleInput";
import CategorySelector from "../../../components/SearchBox/CategorySelector";
import FromDateInput from "../../../components/SearchBox/FromDateInput";
import ToDateInput from "../../../components/SearchBox/ToDateInput";
import OrganizationSelector from "../../../components/SearchBox/OrganizationSelector";
import SearchButton from "../../../components/SearchBox/SearchButton";
import Sort from "../../../components/SearchBox/Sort";
import KeywordInput from "../../../components/SearchBox/KeywordInput";


const useStyles = makeStyles(styles);

const SearchBoxSection = () => {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <GridContainer spacing={5}>
        <GridItem>
          <TitleInput />
        </GridItem>
        <GridItem>
          <CategorySelector />
        </GridItem>
        <GridItem md={6}>
          <FromDateInput />
        </GridItem>
        <GridItem md={6}>
          <ToDateInput />
        </GridItem>
        <GridItem>
          <KeywordInput />
        </GridItem>
        <GridItem>
          <Sort />
        </GridItem>
        <GridItem>
          <OrganizationSelector />
        </GridItem>
        <GridItem>
          <SearchButton
            callback={() => store.dispatch(updateFetchStatus(REFRESH))}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default hot(module)(SearchBoxSection);

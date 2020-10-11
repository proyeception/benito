import React from "react";
import { hot } from "react-hot-loader";
import { RouteChildrenProps, withRouter } from "react-router-dom";
import {
  Category,
  Organization,
  SearchParams,
  SortMethod,
} from "../../../types";
import styles from "../../../assets/jss/material-kit-react/views/searchSections/searchBoxStyle";
import {
  createMuiTheme,
  InputLabel,
  ListSubheader,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import { RootState } from "../../../reducers";
import { connect } from "react-redux";
import store from "../../../store";
import {
  updateCategory,
  updateFetchStatus,
  updateFromDate,
  updateKeyword,
  updateOrganization,
  updateSortMethod,
  updateTitle,
  updateToDate,
} from "../../../actions/search";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Button from "../../../components/CustomButtons/Button";
import { buildQueryParams } from "../../../functions/search";
import { REFRESH } from "../../../store/search/types";
import AutoComplete from "@material-ui/lab/Autocomplete";
import moment from "moment";
import { red, grey } from "@material-ui/core/colors";
import React from "react";
import { hot } from "react-hot-loader";
import styles from "../../../assets/jss/material-kit-react/views/searchSections/searchBoxStyle";
import { makeStyles } from "@material-ui/core";
import store from "../../../store";
import { updateFetchStatus } from "../../../actions/search";
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

  const theme = createMuiTheme({
    palette: {
      primary: grey,
    },
  });


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

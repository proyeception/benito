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
  InputLabel,
  ListSubheader,
  makeStyles,
  MenuItem,
  Select,
  TextField,
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

const useStyles = makeStyles(styles);

interface SearchBoxSectionProps extends RouteChildrenProps<SearchParams> {
  categories: Array<Category>;
  organizations: Array<Organization>;
  category?: Category;
  organization?: Organization;
  sort?: SortMethod;
  title?: string;
  from?: Date;
  to?: Date;
  keyword?: string;
}

const SearchBoxSection = (props: SearchBoxSectionProps) => {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <GridContainer spacing={5}>
        <GridItem>
          <TextField
            label="Título"
            fullWidth
            onChange={(e) => store.dispatch(updateTitle(e.target.value))}
            value={props.title}
          />
        </GridItem>
        <GridItem>
          {/* TOOD: use the Autocomplete component? */}
          <InputLabel htmlFor="category">Categoría</InputLabel>
          <Select
            onChange={(e) =>
              store.dispatch(
                updateCategory(
                  props.categories.find((c) => c.tagName == e.target.value)!
                )
              )
            }
            fullWidth
            inputProps={{
              name: "category",
              id: "category",
            }}
            label="Categoría"
            value={props.category?.tagName || ""}
          >
            <MenuItem aria-label="None" value="" />
            {props.categories.map((c, idx) => (
              <MenuItem value={c.tagName.valueOf()} key={idx}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </GridItem>
        <GridItem md={6}>
          <KeyboardDatePicker
            clearable={true}
            placeholder="08/04/2016"
            variant="inline"
            format="dd/MM/yyyy"
            label="Comienzo"
            value={props.from || null}
            onChange={(e) => {
              if (e) {
                store.dispatch(updateFromDate(e));
              }
            }}
          />
        </GridItem>
        <GridItem md={6}>
          <KeyboardDatePicker
            clearable={true}
            placeholder="08/04/2016"
            variant="inline"
            format="dd/MM/yyyy"
            label="Fin"
            value={props.to || null}
            onChange={(e) => {
              if (e) {
                store.dispatch(updateToDate(e));
              }
            }}
          />
        </GridItem>
        <GridItem>
          <TextField
            label="Palabra clave"
            fullWidth
            value={props.keyword}
            onChange={(e) => store.dispatch(updateKeyword(e.target.value))}
          />
        </GridItem>
        <GridItem>
          <InputLabel htmlFor="sort">Ordenamiento</InputLabel>
          <Select
            onChange={(e) => {
              store.dispatch(updateSortMethod(e.target.value as SortMethod));
            }}
            fullWidth
            inputProps={{
              name: "sort",
              id: "sort",
            }}
            value={props.sort}
          >
            <MenuItem aria-label="None" value="" />
            <ListSubheader>Fecha de creación</ListSubheader>
            <MenuItem value={SortMethod.DateDesc}>Más recientes</MenuItem>
            <MenuItem value={SortMethod.DateAsc}>Más antiguos</MenuItem>
            <ListSubheader>Alfabético</ListSubheader>
            <MenuItem value={SortMethod.AlphaDesc}>A-Z</MenuItem>
            <MenuItem value={SortMethod.AlphaAsc}>Z-A</MenuItem>
            <ListSubheader>Visitas</ListSubheader>
            <MenuItem value={SortMethod.ViewsDesc}>Más visitas</MenuItem>
            <MenuItem value={SortMethod.ViewsAsc}>Menos visitas</MenuItem>
          </Select>
        </GridItem>
        <GridItem>
          <AutoComplete
            id="combo-box-demo"
            fullWidth
            options={props.organizations}
            getOptionLabel={(option) => option.displayName}
            defaultValue={props.organization}
            onChange={(e, o) => {
              store.dispatch(updateOrganization(o!));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Organización"
                variant="outlined"
              />
            )}
          />
        </GridItem>
        <GridItem>
          <Button
            color="primary"
            round
            fullWidth
            onClick={() => {
              props.history.push(
                "/search" +
                  buildQueryParams({
                    ...props,
                    category: props.category?.tagName?.valueOf(),
                    organizationName: props.organization?.name?.valueOf(),
                  })
              );
              console.log("aaaaaaaaaaaaa");
              store.dispatch(updateFetchStatus(REFRESH));
            }}
          >
            Buscar
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    categories: rootState.common.categories,
    organizations: rootState.common.organizations,
    title: rootState.search.title,
    category: rootState.search.category,
    sort: rootState.search.orderBy,
    from: rootState.search.fromDate,
    to: rootState.search.toDate,
    organization: rootState.search.organization,
    keyword: rootState.search.keyword,
  };
};

export default hot(module)(
  withRouter(connect(mapStateToProps)(SearchBoxSection))
);

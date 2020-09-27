import React from "react";
import { hot } from "react-hot-loader";
import { RouteChildrenProps, withRouter } from "react-router-dom";
import { Category, SearchParams, SortMethod } from "../../../types";
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
  updateFromDate,
  updateKeyword,
  updateSortMethod,
  updateTitle,
  updateToDate,
} from "../../../actions/search";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from "../../../components/CustomButtons/Button";
import { buildQueryParams } from "../../../functions/search";

const useStyles = makeStyles(styles);

interface SearchBoxSectionProps extends RouteChildrenProps<SearchParams> {
  categories: Array<Category>;
  category: Category | null;
  sort?: SortMethod;
  title?: string;
}

const SearchBoxSection = (props: SearchBoxSectionProps) => {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <GridContainer spacing={5}>
          <GridItem>
            <TextField
              label="Título"
              fullWidth
              onChange={(e) => store.dispatch(updateTitle(e.target.value))}
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
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              id="date-picker-inline"
              label="Comienzo"
              value={"2020-08-08"}
              onChange={(e) =>
                //TODO: use some library or something to interpolate this idk
                store.dispatch(
                  updateFromDate(
                    e ? `${e.getFullYear()}/${e.getMonth()}/${e.getDay()}` : ""
                  )
                )
              }
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </GridItem>
          <GridItem md={6}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              id="date-picker-inline"
              label="Fin"
              value={"2020-08-08"}
              onChange={(e) =>
                store.dispatch(
                  updateToDate(
                    e ? `${e.getFullYear()}/${e.getMonth()}/${e.getDay()}` : ""
                  )
                )
              }
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </GridItem>
          <GridItem>
            <TextField
              label="Palabra clave"
              fullWidth
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
            <Button
              color="primary"
              round
              fullWidth
              onClick={() =>
                props.history.push(
                  "/search?" +
                    buildQueryParams({
                      ...props,
                      category: props.category?.tagName?.valueOf(),
                    })
                )
              }
            >
              Buscar
            </Button>
          </GridItem>
        </GridContainer>
      </MuiPickersUtilsProvider>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    categories: rootState.common.categories,
    title: rootState.search.title,
    category: rootState.search.category,
    sort: rootState.search.orderBy,
    from: rootState.search.fromDate,
    to: rootState.search.toDate,
    organization: rootState.search.organization,
  };
};

export default hot(module)(
  withRouter(connect(mapStateToProps)(SearchBoxSection))
);

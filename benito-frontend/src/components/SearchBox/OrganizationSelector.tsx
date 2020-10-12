import { InputLabel, Select, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { updateOrganization } from "../../actions/search";
import { RootState } from "../../reducers";
import store from "../../store";
import { Organization } from "../../types";

type OrganizationSelectorProps = {
  organizations: Array<Organization>;
  organization?: Organization;
  variant?: "outlined" | "standard" | "filled" | undefined;
};

const OrganizationSelector = (props: OrganizationSelectorProps) => (
  <div>
    <Autocomplete
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
          variant={props.variant}
        />
      )}
    />
  </div>
);

const mapStateToProps = (rootState: RootState) => {
  return {
    organizations: rootState.common.organizations,
    organization: rootState.search.organization,
  };
};

export default hot(module)(connect(mapStateToProps)(OrganizationSelector));

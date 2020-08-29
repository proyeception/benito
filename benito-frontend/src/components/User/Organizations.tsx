import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Person } from "../../types";
import { Link } from "react-router-dom";
import store from "../../store";
import { resetSearchParameters, updateCategory } from "../../actions/search";

type Props = {
  user: Person;
};

const Organizations = (props: Props) => (
  <div>
    <div className="font-weight-bold font-size-18-md">Organizaciones</div>
    <div className="d-flex">
      {props.user.organizations.map((o, idx) => (
        <Link
          to={`/search?organization=${o.name}`}
          key={idx}
          onClick={() => {
            store.dispatch(resetSearchParameters());
            store.dispatch(updateCategory(o.name));
          }}
        >
          <div className="qui-user-profile-icon mr-2">
            <img
              src={o.iconUrl.valueOf()}
              alt={o.displayName.valueOf()}
              className="h-100 w-100"
            />
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default hot(module)(Organizations);

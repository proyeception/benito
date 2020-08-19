import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

const SearchError = (_: any) => (
  <div>
    <div className="qui-search-error-big-text mt-5">
      Oops, hubo un error procesando tu búsqueda 🔌
    </div>
    <div className="qui-search-error-medium-text mt-5">
      Nuestros ingenieros ya fueron informados y están trabajando duro para
      arreglarlo 👷
    </div>
    <div className="qui-search-error-medium-text mt-2">
      Disculpá las molestias y probá de nuevo más tarde
    </div>
  </div>
);

export default hot(module)(SearchError);

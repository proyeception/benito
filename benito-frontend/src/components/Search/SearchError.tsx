import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

const SearchError = (_: any) => (
  <div>
    <div className="font-size-18 font-size-32-md font-weight-bolder mt-5">
      Oops, hubo un error procesando tu búsqueda 🔌
    </div>
    <div className="font-size-13 font-size-20-md mt-5">
      Nuestros ingenieros ya fueron informados y están trabajando duro para
      arreglarlo 👷
    </div>
    <div className="font-size-13 font-size-20-md mt-2">
      Disculpá las molestias y probá de nuevo más tarde
    </div>
  </div>
);

export default hot(module)(SearchError);

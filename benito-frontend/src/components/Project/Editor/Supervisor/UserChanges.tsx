import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Person } from "../../../../types";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  name: String;
  toAdd: Array<Person>;
  toDelete: Array<Person>;
};

const UserChanges = (props: Props) => (
  <div>
    <div className="font-size-18 font-size-24-md font-weight-bolder text-capitalize text-center">
      {props.name}
    </div>
    <div className="font-size-14 font-size-18-md font-weight-lighter">
      <div>
        {props.toAdd.map((a) => (
          <div>
            <FontAwesomeIcon icon={faPlusCircle} color="green" /> {a.fullName}
          </div>
        ))}
      </div>
      <div className="mt-3">
        {props.toDelete.map((a) => (
          <div>
            <FontAwesomeIcon icon={faMinusCircle} color="red" /> {a.fullName}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default hot(module)(UserChanges);

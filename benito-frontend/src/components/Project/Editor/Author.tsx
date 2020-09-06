import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../../types";
import useForm from "../../../hooks/useForm";

type Props = {
  project: Project;
};

const AuthorEdit = (props: Props) => {
  const [values, setValues] = useForm({
    title: props.project.title,
    description: props.project.description,
    extraContent: props.project.extraContent,
  });
  console.log(values);

  return (
    <div className="qui-min-height">
      <div className="container bg-white">
        <div className="row">
          <div className="col-md-9">
            <input
              type="text"
              name="title"
              value={values.title.valueOf()}
              onChange={setValues}
            />
            <input
              type="text"
              name="description"
              value={values.description.valueOf()}
              onChange={setValues}
            />
            <input
              type="text"
              name="extraContent"
              value={values.extraContent.valueOf()}
              onChange={setValues}
            />
          </div>
          <div className="col-md-3">asd</div>
        </div>
      </div>
    </div>
  );
};

export default hot(module)(AuthorEdit);

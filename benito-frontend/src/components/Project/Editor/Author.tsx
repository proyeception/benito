import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../../types";
import useForm from "../../../hooks/useForm";
import { Tabs, Tab } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Separator from "../Separator";
import FadeIn from "../../Common/FadeIn";
import { updateContent } from "../../../functions/project";

type Props = {
  project: Project;
};

function Image(props: any) {
  return <img {...props} style={{ maxWidth: "100%" }} />;
}

const AuthorEdit = (props: Props) => {
  const [{ title, description, extraContent }, setValues] = useForm({
    title: props.project.title,
    description: props.project.description,
    extraContent: props.project.extraContent,
  });

  return (
    <FadeIn className="pt-5 pb-5">
      <div className="container bg-white p-3 p-md-5">
        <div className="row">
          <div className="col-12 col-md-9">
            <div className="font-size-18 font-size-24-md">
              <div className="font-weight-bolder mb-2 mb-md-2">Título</div>
              <div className="font-weight-lighter">
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={title.valueOf()}
                  onChange={setValues}
                />
              </div>
            </div>
            <div className="font-size-18 font-size-24-md mt-2 mt-md-4">
              <div className="font-weight-bolder mb-2 mb-md-2">Descripción</div>
              <div className="font-weight-lighter">
                <textarea
                  name="description"
                  className="form-control"
                  value={description.valueOf()}
                  onChange={setValues}
                  rows={5}
                />
              </div>
            </div>
            <div className="font-size-18 font-size-24-md mt-2 mt-md-4">
              <div className="font-weight-bolder mb-2 mb-md-2">
                Contenido extra
              </div>
              <Tabs defaultActiveKey="edit">
                <Tab eventKey="edit" title="Editar">
                  <div className="font-weight-lighter">
                    <textarea
                      name="description"
                      className="form-control"
                      value={extraContent.valueOf()}
                      onChange={setValues}
                      rows={10}
                    />
                  </div>
                </Tab>
                <Tab eventKey="preview" title="Preview">
                  <ReactMarkdown
                    className="font-weight-light border-right border-left border-bottom pl-md-3 pr-md-3 p-md-2"
                    source={props.project.extraContent.valueOf()}
                    renderers={{ image: Image }}
                  />
                </Tab>
              </Tabs>
            </div>
          </div>
          <div className="col-12 col-md-3 mt-3 mt-md-0">Imagen</div>
          <div className="col-12 mt-5">
            <Separator
              display="d-block d-md-none"
              color="gray"
              marginLeft={0}
              marginRight={0}
            />
            <div className="container d-flex center justify-content-around pt-3 pb-3 pt-md-5 pb-md-5 font-size-32 font-size-24-md">
              <div className="d-none d-md-block cursor-pointer">
                <FontAwesomeIcon
                  icon={faSave}
                  onClick={() => {
                    updateContent(
                      title,
                      description,
                      extraContent,
                      props.project.id
                    )
                      .then(console.log)
                      .catch(console.error);
                  }}
                  color="green"
                />{" "}
                Guardar cambios
              </div>
              <div className="d-none d-md-block">
                <FontAwesomeIcon icon={faTrash} color="red" /> Descartar
              </div>
              <div className="d-block d-md-none">
                <FontAwesomeIcon icon={faSave} color="green" />
              </div>
              <div className="d-block d-md-none">
                <FontAwesomeIcon icon={faTrash} color="red" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default hot(module)(AuthorEdit);

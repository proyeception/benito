import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../../../types";
import useForm from "../../../../hooks/useForm";
import { Tabs, Tab } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Separator from "../../Separator";
import SlideUp from "../../../Common/SlideUp";
import SaveChanges from "./SaveChanges";
import DiscardChanges from "./DiscardChanges";
import Documents from "./Documents";
import Poster from "./Poster";
import Image from "./Image";

interface Props {
  project: Project;
}

function Render(props: any) {
  return <img {...props} style={{ maxWidth: "100%", height: "320px" }} />;
}

const AuthorEdit = (props: Props) => {
  const [{ title, description, extraContent, posterUrl }, setValues] = useForm({
    title: props.project.title,
    description: props.project.description,
    extraContent: props.project.extraContent,
    posterUrl: props.project.posterUrl
  });

  return (
    <SlideUp className="pt-5 pb-5">
      <div className="container bg-white p-3 p-md-5">
        <Image project={props.project} />
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

        <Poster project={props.project} />

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
        
        <Documents project={props.project} />

        <div className="font-size-18 font-size-24-md mt-2 mt-md-4">
          <div className="font-weight-bolder mb-2 mb-md-2">Contenido extra</div>
          <Tabs defaultActiveKey="edit">
            <Tab
              eventKey="edit"
              title="Editar"
              className="qui-project-edit-extra-content-container"
            >
              <div className="font-weight-lighter h-100">
                <textarea
                  name="extraContent"
                  className="form-control h-100"
                  value={extraContent.valueOf()}
                  onChange={setValues}
                />
              </div>
            </Tab>

            <Tab
              eventKey="preview"
              title="Preview"
              className="qui-project-edit-extra-content-container"
            >
              <ReactMarkdown
                className="font-weight-light border-right border-left border-bottom pl-md-3 pr-md-3 p-md-2 h-100"
                source={props.project.extraContent.valueOf()}
                renderers={{ image: Render }}
              />
            </Tab>
          </Tabs>
          <div className="mt-3">
            <Separator
              display="d-block d-md-none"
              color="gray"
              marginLeft={0}
              marginRight={0}
            />
            <div className="container d-flex center justify-content-around pt-3 pb-3 pt-md-5 pb-md-5 font-size-32 font-size-24-md">
              <SaveChanges
                title={title}
                description={description}
                extraContent={extraContent}
                posterUrl={posterUrl}
                id={props.project.id}
                className="d-none d-md-block cursor-pointer"
              >
                <FontAwesomeIcon icon={faSave} color="green" /> Guardar cambios
              </SaveChanges>
              <DiscardChanges
                className="d-none d-md-block cursor-pointer"
                id={props.project.id}
              >
                <FontAwesomeIcon icon={faTrash} color="red" /> Descartar
              </DiscardChanges>
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
    </SlideUp>
  );
};

export default hot(module)(AuthorEdit);

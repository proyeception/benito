import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

const ProjectSummary = (_: any) => (
  <div className="container">
    <div>Titulo</div>
    <div>Imagen</div>
    <div>Resumen</div>
    <div>Autores</div>
  </div>
);

export default hot(module)(ProjectSummary);

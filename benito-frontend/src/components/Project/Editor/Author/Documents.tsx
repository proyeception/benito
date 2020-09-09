import React, { useState, useCallback } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../../../types";
import axios, { AxiosRequestConfig } from "axios";
import { signRequest } from "../../../../functions/http";
import { benitoHost } from "../../../../config";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDropzone } from "react-dropzone";

type Props = {
  project: Project;
};

const Documents = (props: Props) => {
  const [isUploading, setIsUploading] = useState(false);
  const onDrop = useCallback((files) => {
    const form = new FormData();
    files.forEach((f: File) => form.append("file", f, f.name));

    let config: AxiosRequestConfig = {
      url: `${benitoHost}/benito/projects/${props.project.id}/documents`,
      method: "POST",
      data: form,
    };

    setIsUploading(true);

    axios
      .request(signRequest(config))
      .then(console.log)
      .catch(console.error)
      .then(() => setIsUploading(false));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div className="font-size-18 font-size-24-md font-weight-bolder pt-3 pb-2">
        Documentos
      </div>
      {props.project.documentation.map((d, idx) => (
        <div key={idx} className="center-vertically mb-1 mt-1">
          <FontAwesomeIcon icon={faMinusCircle} color="red" className="mr-2" />{" "}
          {d.fileName}
        </div>
      ))}
      <div className="font-size-14 font-size-18-md pt-3 pt-md-5 mb-3">
        <div className="mb-3">Cargar documentos</div>
        {isUploading ? (
          <div>Pará un poco flaco </div>
        ) : (
          <section className="container dropzone-container">
            <div {...getRootProps({ className: "dropzone font-size-18-md" })}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default hot(module)(Documents);

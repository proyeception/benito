import React, { useState, useCallback } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../../../types";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDropzone } from "react-dropzone";

type Props = {
  project: Project;
  setDocuments: (f: Array<File>) => void;
};

const Documents = (props: Props) => {
  const [documents, setDocuments] = useState(
    props.project.documentation.map((d) => d.fileName)
  );

  const onDrop = useCallback((files) => {
    props.setDocuments(files);
    const form = new FormData();
    setDocuments(documents.concat(files.map((f: File) => f.name)));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div className="font-size-18 font-size-24-md font-weight-bolder pt-3 pb-2">
        Documentos
      </div>
      {documents.map((d, idx) => (
        <div
          key={idx}
          className="center-vertically mb-1 mt-1 underline-hover cursor-pointer"
        >
          <FontAwesomeIcon icon={faMinusCircle} color="red" className="mr-2" />{" "}
          {d}
        </div>
      ))}
      <div className="font-size-14 font-size-18-md pt-3 pt-md-3 mb-3">
        <div className="mb-3">Cargar documentos</div>
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
      </div>
    </div>
  );
};

export default hot(module)(Documents);

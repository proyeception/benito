import React, { useState } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../../../types";
import axios, { AxiosRequestConfig } from "axios";
import { signRequest } from "../../../../functions/http";
import { benitoHost } from "../../../../config";

type Props = {
  project: Project;
};

const Documents = (props: Props) => {
  const [isUploading, setIsUploading] = useState(false);
  return (
    <div>
      <div className="font-size-18 font-size-24-md font-weight-bolder pb-2">
        Documentos
      </div>
      <div>
        {props.project.documentation.map((d, idx) => (
          <div key={idx}>{d.fileName}</div>
        ))}
      </div>
      <div className="font-size-14 font-size-18-md pt-2">
        Cargar un nuevo documento
        {isUploading ? (
          <div>Pará un poco flaco</div>
        ) : (
          <input
            type="file"
            onChange={(e) => {
              const file = e.currentTarget.files[0];
              const form = new FormData();
              form.append("file", file, file.name);

              let config: AxiosRequestConfig = {
                url: `${benitoHost}/benito/projects/${props.project.id}/documents?name=${file.name}`,
                method: "POST",
                data: form,
              };

              setIsUploading(true);

              axios
                .request(signRequest(config))
                .then(console.log)
                .catch(console.error)
                .then(() => setIsUploading(false));
            }}
            className="form-control-file"
          />
        )}
      </div>
    </div>
  );
};

export default hot(module)(Documents);

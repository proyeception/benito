import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { updateContent } from "../../../../functions/project";
import axios, { AxiosRequestConfig } from "axios";
import { benitoHost } from "../../../../config";
import { signRequest } from "../../../../functions/http";

type Props = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  title?: String;
  description?: String;
  extraContent?: String;
  posterUrl?: String;
  id: String;
  poster?: File;
  documents?: Array<File>;
};

const SaveChanges = (props: Props) => (
  <div
    className={props.className}
    onClick={() => {
      props.onClick?.apply(2);

      updateContent(
        props.title,
        props.description,
        props.extraContent,
        props.posterUrl,
        props.id
      )
        .then(console.log)
        .catch(console.error);

      //poster
      if (props.poster) {
        const posterForm = new FormData();
        posterForm.set("file", props.poster);

        let posterConfig: AxiosRequestConfig = {
          url: `${benitoHost}/benito/projects/${props.id}/poster`,
          method: "POST",
          data: posterForm,
        };

        axios.request(signRequest(posterConfig)).then(console.log);
      }

      //documents
      if (props.documents) {
        const form = new FormData();
        props.documents.forEach((f: File) => form.append("file", f, f.name));

        let documentsConfig: AxiosRequestConfig = {
          url: `${benitoHost}/benito/projects/${props.id}/documents`,
          method: "POST",
          data: form,
        };

        axios.request(signRequest(documentsConfig)).then(console.log);
      }
    }}
  >
    {props.children}
  </div>
);

export default hot(module)(SaveChanges);

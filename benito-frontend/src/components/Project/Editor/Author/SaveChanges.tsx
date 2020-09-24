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
  pictureUrl?: String;
  id: String;
  picture?: File;
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
        props.pictureUrl,
        props.id
      )
        .then(console.log)
        .catch(console.error);

      //picture
      if (props.picture) {
        const pictureForm = new FormData();
        pictureForm.set("file", props.picture);

        let pictureConfig: AxiosRequestConfig = {
          url: `${benitoHost}/benito/projects/${props.id}/picture`,
          method: "POST",
          data: pictureForm,
        };

        axios.request(signRequest(pictureConfig)).then(console.log);
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

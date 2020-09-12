import React, { useState, useCallback } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../../../types";
import axios, { AxiosRequestConfig } from "axios";
import { signRequest } from "../../../../functions/http";
import { benitoHost } from "../../../../config";
import { useDropzone } from "react-dropzone";
import ImageUploader from 'react-images-upload';

type Props = {
  project: Project;
};

const Poster = (props: Props) => {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((file) => {
    const form = new FormData();
    form.append("poster", file);

    let config: AxiosRequestConfig = {
      url: `${benitoHost}/benito/projects/${props.project.id}/poster`,
      method: "POST",
      data: form,
    };

    setIsUploading(true);

    axios
      .request(signRequest(config))
      .then(console.log)
      .then(() => setIsUploading(false));
  }, []);

  return (
    <div>
    <div className="font-size-18 font-size-24-md font-weight-bolder pt-3 pb-2">
    Poster
    </div>
    <div className="font-weight-lighter">
        <ImageUploader
            withIcon={true}
            name="posterUrl"
            buttonText='Elija la foto de Portada desde su ordenador'
            onChange={onDrop}
            label={'Max file size: 5mb, accepted: jpg, png'}
            imgExtension={['.jpg', '.png']}
            maxFileSize={5242880}
            singleImage={true}
            withPreview={true}
        />
        </div>
    </div>
  );
};

export default hot(module)(Poster);

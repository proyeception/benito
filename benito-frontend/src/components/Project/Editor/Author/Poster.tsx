import React, { useCallback } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Project } from "../../../../types";
import ImageUploader from "react-images-upload";

type Props = {
  project: Project;
  setPoster: (f: File) => void;
};

const Poster = (props: Props) => {

  const onDrop = useCallback((file) => {
    props.setPoster(file[0]);
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
          buttonText="Elija la foto de Portada desde su ordenador"
          onChange={onDrop}
          label={"Max file size: 5mb, accepted: jpg, png"}
          imgExtension={[".jpg", ".png"]}
          maxFileSize={5242880}
          singleImage={true}
          withPreview={true}
        />
      </div>
    </div>
  );
};

export default hot(module)(Poster);

import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { mapRoleToCollection } from "../../../functions/user";
import withUser from "../../../hooks/withUser";
import { RootState } from "../../../reducers";
import { Role } from "../../../types";
import Loader from "../../Common/Loader";
import LoginRequired from "../../Common/LoginRequired";
import "./styles.scss";
import { Tab, Tabs, Modal } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ProfileTab from "./ProfileTab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faCog, faUser } from "@fortawesome/free-solid-svg-icons";
import OrganizationsTab from "./OrganizationsTab";
import SettingsTab from "./SettingsTab";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { motion } from "framer-motion";
import ImageUploader from "react-images-upload";
import { AxiosRequestConfig } from "axios";
import { benitoHost } from "../../../config";
import axios from "axios";
import { signRequest } from "../../../functions/http";

type MatchParams = {
  tab: string;
};

interface Props extends RouteComponentProps<MatchParams> {
  userId: String;
  role: Role;
}

const Me = (props: Props) => {
  const render = () => {
    const [user, fetching, isError] = withUser(
      props.userId,
      mapRoleToCollection(props.role)
    );
    const [activeTab, setActiveTab] = useState(props.match.params.tab);
    const [showModal, setShowModal] = useState(false);
    const [fileLoaded, setFileLoaded] = useState(false);
    const [file, setFile] = useState<File>(null);
    const [uploading, setUploading] = useState(false);

    if (isError) {
      console.warn("No, loco pará!!");
    }

    if (fetching) {
      return (
        <div className="center">
          <Loader />
        </div>
      );
    }

    const options = {
      // you can also just use 'bottom center'
      position: positions.TOP_CENTER,
      timeout: 5000,
      offset: "30px",
      // you can also just use 'scale'
      transition: transitions.SCALE,
    };

    return (
      <AlertProvider template={AlertTemplate} {...options}>
        <div className="bg-white p-5">
          <div className="container">
            <div className="row">
              <div className="col-12 center">
                <div className="qui-user-profile-picture-container cursor-pointer">
                  <motion.img
                    src={user.profilePicUrl.valueOf()}
                    className="img-circle img-hover-blur"
                    whileHover={{
                      scale: 1.2,
                      transition: { duration: 1 },
                      filter: "blur(4px)",
                    }}
                    onClick={() => setShowModal(true)}
                  />
                </div>
              </div>
              <div className="col-12 mt-5">
                <Tabs
                  fill
                  variant="pills"
                  defaultActiveKey={activeTab}
                  onSelect={(k) => {
                    props.history.push(`/me/${k}`);
                    setActiveTab(k);
                  }}
                >
                  <Tab
                    eventKey="profile"
                    title={
                      <div className="font-size-14 font-size-18-md">
                        <FontAwesomeIcon icon={faUser} className="mr-2" />{" "}
                        Perfil
                      </div>
                    }
                  >
                    <ProfileTab user={user} />
                  </Tab>
                  <Tab
                    eventKey="organizations"
                    title={
                      <div className="font-size-14 font-size-18-md">
                        <FontAwesomeIcon icon={faBuilding} className="mr-2" />{" "}
                        Organizaciones
                      </div>
                    }
                  >
                    <OrganizationsTab user={user} />
                  </Tab>
                  <Tab
                    eventKey="settings"
                    title={
                      <div className="font-size-14 font-size-18-md">
                        <FontAwesomeIcon icon={faCog} className="mr-2" />{" "}
                        Configuración
                      </div>
                    }
                  >
                    <SettingsTab user={user} />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        <Modal
          size="lg"
          centered
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <Modal.Header closeButton>Actualizar foto de perfil</Modal.Header>
          <Modal.Body>
            {uploading ? (
              <div className="center">
                <Loader />
              </div>
            ) : (
              <ImageUploader
                withIcon={true}
                name="profile-picture"
                onChange={([file]) => {
                  setFile(file);
                  setFileLoaded(true);
                }}
                label={"Max file size: 5mb, accepted: jpg, png"}
                imgExtension={[".jpg", ".png"]}
                maxFileSize={5242880}
                singleImage={true}
                withPreview={true}
              />
            )}
            <button
              disabled={!fileLoaded}
              className="btn btn-success"
              onClick={() => {
                setUploading(true);
                const fd = new FormData();
                fd.set("file", file);

                let config: AxiosRequestConfig = {
                  url: `${benitoHost}/benito/${mapRoleToCollection(
                    props.role
                  )}/${props.userId}/picture`,
                  method: "POST",
                  data: fd,
                };

                axios
                  .request(signRequest(config))
                  .then(console.log)
                  .then(() => setUploading(false))
                  .then(() => setShowModal(false))
                  .then(() => props.history.go(0))
                  .catch(console.warn);
              }}
            >
              Guardar
            </button>
          </Modal.Body>
        </Modal>
      </AlertProvider>
    );
  };

  return <LoginRequired render={render} />;
};

const mapStateToProps = (rootState: RootState) => {
  return {
    userId: rootState.session.userId,
    role: rootState.session.role,
  };
};

export default hot(module)(withRouter(connect(mapStateToProps)(Me)));

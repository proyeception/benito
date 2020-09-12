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
import { Tab, Tabs } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ProfileTab from "./ProfileTab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faCog, faUser } from "@fortawesome/free-solid-svg-icons";
import OrganizationsTab from "./OrganizationsTab";
import SettingsTab from "./SettingsTab";

type MatchParams = {
  tab: string;
};

interface Props extends RouteComponentProps<MatchParams> {
  userId: String;
  role: Role;
}

const Settings = (props: Props) => {
  const render = () => {
    const [user, fetching, isError] = withUser(
      props.userId,
      mapRoleToCollection(props.role)
    );
    const [activeTab, setActiveTab] = useState(props.match.params.tab);

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
    return (
      <div className="bg-white p-5">
        <div className="container">
          <div className="row">
            <div className="col-12 center">
              <div className="qui-user-profile-picture-container">
                <img
                  src={user.profilePicUrl.valueOf()}
                  className="img-circle"
                />
              </div>
            </div>
            <div className="col-12 mt-5">
              <Tabs
                fill
                variant="pills"
                defaultActiveKey={activeTab}
                onSelect={(k) => {
                  props.history.push(`/settings/${k}`);
                  setActiveTab(k);
                }}
              >
                <Tab
                  eventKey="profile"
                  title={
                    <div className="font-size-14 font-size-18-md">
                      <FontAwesomeIcon icon={faUser} className="mr-2" /> Perfil
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
                  eventKey="config"
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

export default hot(module)(withRouter(connect(mapStateToProps)(Settings)));

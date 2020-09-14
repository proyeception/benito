import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { mapRoleToCollection, updateUser } from "../../../functions/user";
import useForm from "../../../hooks/useForm";
import { RootState } from "../../../reducers";
import { Person, Role } from "../../../types";
import "./styles.scss";
import { useAlert } from "react-alert";
import store from "../../../store";
import { toggleLoading } from "../../../actions/common";

type Props = {
  user: Person;
  role: Role;
  loading: Boolean;
};

const ProfileTab = (props: Props) => {
  const [{ fullName, username }, setValues] = useForm({
    fullName: props.user.fullName,
    username: props.user.username || "",
  });
  const [validated, setValidated] = useState(false);

  const alert = useAlert();

  const inputCol = (
    name: string,
    fieldName: string,
    value: string,
    required: Boolean,
    feedback?: string
  ) => (
    <Col xs={12} md={6} key={name}>
      <Form.Label className="font-weight-bolder font-size-18 font-size-22-md">
        {fieldName}
      </Form.Label>
      <Form.Control
        required={required.valueOf()}
        type="text"
        name={name}
        className="form-control mt-2"
        value={value}
        onChange={setValues}
      />
      <Form.Control.Feedback type="invalid">{feedback}</Form.Control.Feedback>
    </Col>
  );

  const validate = () => {
    console.log(fullName);
    console.log(username);

    if (fullName.length == 0 || username.length == 0) {
      setValidated(true);
      return false;
    }

    return true;
  };

  const [isLoading, setIsLoading] = useState(false);
  const [socials, setSocials] = useState(props.user.socials);

  return (
    <div className="container pt-4">
      <Form noValidate validated={validated}>
        <Form.Row>
          {inputCol("fullName", "Nombre", fullName.valueOf(), true)}
          {inputCol(
            "username",
            "Nombre de usuario",
            username?.valueOf(),
            true,
            "Por favor, ingresá un nombre de usuario válido"
          )}
          <Col
            xs={12}
            className="font-weight-bolder font-size-18 font-size-22-md mt-3"
          >
            Sociales
          </Col>
          {socials.map((s, idx) => (
            <Col xs={12} key={idx}>
              <Form.Control
                type="text"
                className="form-control mt-2"
                value={s.socialProfileUrl.valueOf()}
                onChange={(e) =>
                  setSocials(
                    socials.map((s2, idx2) =>
                      idx2 == idx
                        ? { ...s2, socialProfileUrl: e.currentTarget.value }
                        : s2
                    )
                  )
                }
              />
            </Col>
          ))}
          <Col xs={12} className="mt-3">
            <div
              className="cursor-pointer"
              onClick={() =>
                setSocials(
                  socials.concat({ socialName: "", socialProfileUrl: "" })
                )
              }
            >
              <FontAwesomeIcon icon={faPlusCircle} /> Agregar social
            </div>
          </Col>
        </Form.Row>
        <Button
          className="mt-5"
          variant="success"
          onClick={() => {
            if (validate()) {
              setIsLoading(true);
              store.dispatch(toggleLoading(true));
              updateUser(mapRoleToCollection(props.role), props.user.id, {
                fullName: fullName,
                username: username,
                socials: socials.filter((s) => s.socialProfileUrl != ""),
              })
                .then(() =>
                  alert.success("Tus cambios se guardaron correctamente")
                )
                .then(() => setIsLoading(false))
                .then(() => store.dispatch(toggleLoading(false)))
                .catch(() =>
                  alert.error("Oops, hubo un error procesando tus cambios...")
                );
            } else {
              console.log("Pará loco, no entendés nada!!");
            }
          }}
          type="button"
        >
          <span hidden={isLoading}>Guardar cambios</span>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
            hidden={!isLoading}
          ></span>
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    role: rootState.session.role,
    loading: rootState.common.loading,
  };
};

export default hot(module)(connect(mapStateToProps)(ProfileTab));

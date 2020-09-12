import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { mapRoleToCollection, updateUser } from "../../../functions/user";
import useForm from "../../../hooks/useForm";
import { RootState } from "../../../reducers";
import { Person, Role } from "../../../types";
import "./styles.scss";

type Props = {
  user: Person;
  role: Role;
};

const ProfileTab = (props: Props) => {
  const [{ fullName, username }, setValues] = useForm({
    fullName: props.user.fullName,
    username: props.user.username,
  });

  const inputCol = (
    name: string,
    fieldName: string,
    value: string,
    required: Boolean
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
    </Col>
  );

  const [validated, setValidated] = useState(false);
  setValidated;
  return (
    <div className="container pt-4">
      <Form noValidate validated={validated}>
        <Form.Row>
          {inputCol("fullName", "Nombre", fullName.valueOf(), true)}
          {inputCol(
            "username",
            "Nombre de usuario",
            username?.valueOf(),
            false
          )}
          <Col xs={12}></Col>
        </Form.Row>
        <Button
          className="mt-5"
          variant="success"
          onClick={() =>
            updateUser(mapRoleToCollection(props.role), props.user.id, {
              fullName,
              username,
            })
          }
          type="button"
        >
          Guardar cambios
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    role: rootState.session.role,
  };
};

export default hot(module)(connect(mapStateToProps)(ProfileTab));

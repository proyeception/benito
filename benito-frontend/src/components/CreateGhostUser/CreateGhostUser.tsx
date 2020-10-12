import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { JsxElement } from "typescript";
import { createGhostUser } from "../../functions/user";
import { RootState } from "../../reducers";
import { SessionState } from "../../store/session/types";
import { Organization, Person, Project, Role } from "../../types";

type CreateGhostUserProps = {
  session: SessionState;
  role: Role;
  organization: Organization;
  projects: Array<Project>;
  project: Project;
};

function entryOf(role: Role) {
  switch (role) {
    case "AUTHOR":
      return "autores";
    case "SUPERVISOR":
      return "supervisores";
  }
}

function useCreateGhostUser(
  afterCreate: (p: Person) => void
): [() => void, (props: CreateGhostUserProps) => JSX.Element] {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [mail, setMail] = useState<string | undefined>();
  // TODO: allow the guy to create the ghost user with many projects
  const [projects, setProjects] = useState<Array<string>>([]);

  function resetForm() {
    setName("");
    setMail("");
  }
  const handleClose = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const render = (props: CreateGhostUserProps) => (
    <div>
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Agregar una nueva entrada a {entryOf(props.role)}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {loading ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              <div>
                <TextField
                  autoFocus
                  fullWidth
                  label="Nombre"
                  defaultValue={name}
                  onBlur={(e) => setName(e.currentTarget.value)}
                />
                <TextField
                  fullWidth
                  label="Email"
                  defaultValue={mail}
                  onBlur={(e) => setMail(e.currentTarget.value)}
                />
                <TextField
                  fullWidth
                  label="Proyecto"
                  value={props.project.title}
                  disabled
                />
                <TextField
                  fullWidth
                  label="Organización"
                  value={props.organization.displayName}
                  disabled
                />
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              setLoading(true);
              createGhostUser(
                name,
                [props.project.id],
                [props.organization.id],
                props.role,
                mail
              )
                .then((res) => res.data)
                .then((u) => {
                  console.log(u);
                  afterCreate(u);
                })
                .catch(console.error)
                .then(() => setLoading(false))
                .then(() => setIsModalOpen(false))
                .then(handleClose);
            }}
            color="primary"
            autoFocus
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return [() => setIsModalOpen(true), render];
}

export default useCreateGhostUser;

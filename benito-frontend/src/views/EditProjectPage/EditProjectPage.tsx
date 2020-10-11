import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { hot } from "react-hot-loader";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import styles from "../../assets/jss/material-kit-react/views/editProject";
import Footer from "../../components/Footer/Footer";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Parallax from "../../components/Parallax/Parallax";
import Spinner from "../../components/Spinner/Spinner";
import { ERROR, PENDING } from "../../hooks/withFetch";
import withProject from "../../hooks/withProject";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import { Edit, Description, RemoveCircle } from "@material-ui/icons";
import MarkdownCompiler from "../../components/MarkdownCompiler/MarkdownCompiler";
import {
  Documentation,
  Organization,
  Person,
  Project,
  ProjectEditionRole,
} from "../../types";
import { SessionState } from "../../store/session/types";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import ImageUploader from "react-images-upload";
import { useDropzone } from "react-dropzone";
import classNames from "classnames";
import CustomButton from "../../components/CustomButtons/Button";
import { fetchOrganization } from "../../functions/organization";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  setProjectUsers,
  updateContent,
  updatePicture,
  uploadDocuments,
} from "../../functions/project";

const useStyles = makeStyles(styles);

type MatchParams = {
  id: string;
};

interface EditProjectPageProps extends RouteComponentProps<MatchParams> {
  session: SessionState;
}

const EditProjectPage = (props: EditProjectPageProps) => {
  const classes = useStyles();
  const { ...rest } = props;

  const [initialTitle, setInitialTitle] = useState("");
  const [initialDescription, setInitialDescription] = useState("");
  const [initialReadme, setInitialReadme] = useState("");

  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [readme, setReadme] = useState<string | undefined>();
  const [authorsToAdd, setAuthorsToAdd] = useState<Array<Person>>([]);
  const [authorsToRemove, setAuthorsToRemove] = useState<Array<Person>>([]);
  const [supervisorsToAdd, setSupervisorsToAdd] = useState<Array<Person>>([]);
  const [supervisorsToRemove, setSupervisorsToRemove] = useState<Array<Person>>(
    []
  );
  const [role, setRole] = useState<ProjectEditionRole>("VISITOR");
  const [picture, setPicture] = useState<File | undefined>();
  const [documentsToUpload, setDocumentsToUpload] = useState<Array<File>>([]);
  const [documentsToRemove, setDocumentsToRemove] = useState<
    Array<Documentation>
  >([]);
  const onPictureDrop = useCallback((file) => setPicture(file[0]), []);
  const onDrop = useCallback((files) => setDocumentsToUpload(files), []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [organization, setOrganization] = useState<
    Organization | undefined | "ERROR"
  >();

  const project = withProject(props.match.params.id, (p) => {
    setTitle(p.title);
    setInitialTitle(p.title);
    setDescription(p.description);
    setInitialDescription(p.description);
    setReadme(p.extraContent);
    setInitialReadme(p.extraContent);
    if (props.session.isLoggedIn) {
      let id = props.session.userId;
      if (p.authors.some((a) => a.id == id)) {
        setRole("AUTHOR");
      }
      if (p.supervisors.some((s) => s.id == id)) {
        setRole("SUPERVISOR");
      }
    }
    fetchOrganization(p.organization.id)
      .then((res) => res.data)
      .then((o) => setOrganization(o))
      .catch((e) => {
        console.error(e);
        setOrganization("ERROR");
      });
  });

  if (project.type == PENDING || organization == undefined) {
    return <Spinner />;
  }

  if (project.type == ERROR || organization == "ERROR") {
    return <Redirect to={{ pathname: "/error" }} />;
  }

  function Changes() {
    const changes: Array<React.ReactNode> = [];

    if (initialTitle != title)
      changes.push(
        <li>
          Renombrar el proyecto de {initialTitle} a {title}
        </li>
      );
    if (initialDescription != description)
      changes.push(<li>Actualizar la descripción del proyecto</li>);
    if (initialReadme != readme)
      changes.push(<li>Actualizar la descripción extendida del proyecto</li>);
    if (picture) changes.push(<li>Actualizar la image del proyecto</li>);
    documentsToUpload.forEach((d) =>
      changes.push(<li>Subir el documento {d.name}</li>)
    );
    documentsToRemove.forEach((d) =>
      changes.push(<li>Borrar el documento {d.fileName}</li>)
    );
    authorsToAdd.forEach((a) =>
      changes.push(<li>Agregar a {a.fullName} como autor</li>)
    );
    supervisorsToAdd.forEach((s) =>
      changes.push(<li>Agregar a {s.fullName} como supervisor</li>)
    );
    authorsToRemove.forEach((a) =>
      changes.push(<li>Eliminar a {a.fullName} como autor</li>)
    );
    supervisorsToRemove.forEach((s) =>
      changes.push(<li>Eliminar a {s.fullName} como supervisor</li>)
    );

    if (changes.length == 0) {
      return <h3>¡Uy! Parece que no hiciste ningún cambio todavía</h3>;
    }

    return (
      <div>
        <h4>Vas a aplicar los siguientes cambios</h4>
        <ul>{changes}</ul>
        <h5>¿Estás seguro de aplicar estos cambios?</h5>
      </div>
    );
  }

  if (props.session.isLoggedIn) {
    const id = props.session.userId;

    if (
      !project.value.authors.some((a) => a.id == id) &&
      !project.value.supervisors.some((s) => s.id == id)
    ) {
      return <Redirect to="/error" />;
    }
  }

  function updateProject(project: Project) {
    let promises = [];
    const projectId = project.id;

    //content
    const contentPromise = updateContent(projectId, title, description, readme)
      .then(console.log)
      .catch(console.error);

    promises.push(contentPromise);

    //picture
    if (picture != undefined) {
      promises.push(updatePicture(projectId, picture));
    }

    //documents
    if (documentsToUpload.length > 0) {
      promises.push(uploadDocuments(projectId, documentsToUpload));
    }

    //users
    if (role == "SUPERVISOR") {
      const usersPromise = setProjectUsers(
        project.authors
          .filter((a) => !authorsToRemove.some((atr) => atr.id == a.id))
          .concat(authorsToAdd),
        project.supervisors
          .filter((s) => !supervisorsToRemove.some((str) => str.id == s.id))
          .concat(supervisorsToAdd),
        project.id
      )
        .then(console.log)
        .catch(console.error);
      promises.push(usersPromise);
    }

    Promise.all(promises)
      .then(() => props.history.push(`/projects/${projectId}`))
      .then(() => props.history.go(0))
      .catch(console.error);
  }

  return (
    <div>
      <Header
        color="darkGray"
        routes={[]}
        rightLinks={<HeaderLinks />}
        fixed
        {...rest}
      />
      <Parallax filter image={project.value.pictureUrl} small />
      <div className={classes.main}>
        <GridContainer className={classes.container}>
          <GridItem xs={12} sm={12} md={6}>
            <h3>Título</h3>
            <TextField
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <h3>Descripción</h3>
            <TextField
              fullWidth
              multiline
              rowsMax={15}
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
            />
          </GridItem>
          <GridItem>
            <h3>Contenido extra</h3>
            <CustomTabs
              headerColor="info"
              className={classes.readme}
              style={{ overflow: "auto" }}
              tabs={[
                {
                  tabName: "Editar",
                  tabIcon: Edit,
                  tabContent: (
                    <TextField
                      fullWidth
                      multiline
                      value={readme}
                      onChange={(e) => setReadme(e.currentTarget.value)}
                      variant="outlined"
                    />
                  ),
                },
                {
                  tabName: "Vista previa",
                  tabicon: Description,
                  tabContent: (
                    <div>
                      <MarkdownCompiler source={readme || ""} />,
                    </div>
                  ),
                },
              ]}
            />
          </GridItem>
          <GridItem>
            <h3>Imagen</h3>
            <ImageUploader
              withIcon={true}
              name="pictureUrl"
              buttonText="Elija la foto de Portada desde su ordenador"
              onChange={onPictureDrop}
              label={"Max file size: 5mb, accepted: jpg, png"}
              imgExtension={[".jpg", ".png"]}
              maxFileSize={5242880}
              singleImage={true}
              withPreview={true}
            />
          </GridItem>
          <GridItem>
            <h3>Documentos</h3>
            {project.value.documentation
              .filter((d) => !documentsToRemove.some((dtr) => dtr == d))
              .map((d, idx) => (
                <div
                  key={idx}
                  className={classNames(
                    classes.bullet,
                    "underline-hover",
                    "cursor-pointer"
                  )}
                  onClick={() =>
                    setDocumentsToRemove(documentsToRemove.concat(d))
                  }
                >
                  <RemoveCircle /> {d.fileName}
                </div>
              ))}
            <section
              className="dropzone-container"
              style={{ marginTop: "15px" }}
            >
              <div {...getRootProps({ className: "dropzone font-size-18-md" })}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here...</p>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select files</p>
                )}
              </div>
            </section>
          </GridItem>
        </GridContainer>
        {role == "SUPERVISOR" ? (
          <GridContainer className={classes.container}>
            <GridItem>
              <h3>Autores</h3>
              {project.value.authors
                .filter((a) => !authorsToRemove.some((atr) => atr == a))
                .map((a, idx) => (
                  <div
                    key={idx}
                    className={classNames(
                      classes.bullet,
                      "underline-hover",
                      "cursor-pointer"
                    )}
                    onClick={() =>
                      setAuthorsToRemove(authorsToRemove.concat(a))
                    }
                  >
                    <RemoveCircle /> {a.fullName}
                  </div>
                ))}
              <Autocomplete
                fullWidth
                options={organization.authors.filter(
                  (a) => !authorsToAdd.includes(a)
                )}
                getOptionLabel={(option) => option.fullName}
                onChange={(e, a) => {
                  if (a) setAuthorsToAdd(authorsToAdd.concat(a!));
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </GridItem>
            <GridItem>
              <h3>Supervisores</h3>
              {project.value.supervisors
                .filter(
                  (s) =>
                    !supervisorsToRemove.some((str) => str == s) ||
                    project.value.authors.some((pa) => pa.id == s.id)
                )
                .map((s, idx) => (
                  <div
                    key={idx}
                    className={classNames(
                      classes.bullet,
                      "underline-hover",
                      "cursor-pointer"
                    )}
                    onClick={() =>
                      setSupervisorsToRemove(supervisorsToRemove.concat(s))
                    }
                  >
                    <RemoveCircle /> {s.fullName}
                  </div>
                ))}
              <Autocomplete
                fullWidth
                options={organization.supervisors.filter(
                  (s) =>
                    !(
                      supervisorsToAdd.includes(s) ||
                      project.value.supervisors.some((ps) => ps.id == s.id)
                    )
                )}
                getOptionLabel={(option) => option.fullName}
                onChange={(e, s) => {
                  if (s) setSupervisorsToAdd(supervisorsToAdd.concat(s!));
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </GridItem>
          </GridContainer>
        ) : (
          <div></div>
        )}
        <GridContainer align="center" className={classes.container}>
          <GridItem xs={6}>
            <CustomButton
              type="button"
              color="info"
              style={{ width: "100%" }}
              onClick={() => setIsModalOpen(true)}
            >
              Guardar cambios
            </CustomButton>
          </GridItem>
          <GridItem xs={6}>
            <CustomButton
              type="button"
              color="danger"
              style={{ width: "100%" }}
              onClick={() =>
                props.history.push(`/projects/${project.value.id}`)
              }
            >
              Descartar y volver
            </CustomButton>
          </GridItem>
        </GridContainer>
      </div>
      <Footer />

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Actualizar {project.value.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {loading ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              <Changes />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="primary">
            No, mejor no
          </Button>
          <Button
            onClick={() => {
              setLoading(true);
              updateProject(project.value);
            }}
            color="primary"
            autoFocus
          >
            Sí, estoy seguro
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => {
  return {
    session: rootState.session,
  };
};

export default hot(module)(
  connect(mapStateToProps)(withRouter(EditProjectPage))
);

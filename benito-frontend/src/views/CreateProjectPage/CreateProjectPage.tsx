import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
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
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import { Edit, Description } from "@material-ui/icons";
import MarkdownCompiler from "../../components/MarkdownCompiler/MarkdownCompiler";
import {
  Organization,
  Person,
  Project,
  Category,
} from "../../types";
import { SessionState } from "../../store/session/types";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import ImageUploader from "react-images-upload";
import { useDropzone } from "react-dropzone";
import CustomButton from "../../components/CustomButtons/Button";
import { fetchOrganization } from "../../functions/organization";
import Autocomplete from "@material-ui/lab/Autocomplete";
import withUser from "../../hooks/withUser";
import { createProject } from "../../functions/project";

const useStyles = makeStyles(styles);

type MatchParams = {
  id: string;
};

interface Change {
  undo: () => void;
  render: () => React.ReactNode;
}

interface CreateProjectPageProps extends RouteComponentProps<MatchParams> {
  session: SessionState;
  categories: Array<Category>;
}

const CreateProjectPage = (props: CreateProjectPageProps) => {
  const classes = useStyles();
  const { ...rest } = props;

  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [readme, setReadme] = useState<string | undefined>();
  const [authorsToAdd, setAuthorsToAdd] = useState<Array<Person>>([]);
  const [supervisorsToAdd, setSupervisorsToAdd] = useState<Array<Person>>([]);
  const [picture, setPicture] = useState<File | undefined>();
  const [category, setCategory] = useState<Category | undefined>();
  const [documentsToUpload, setDocumentsToUpload] = useState<Array<File>>([]);
  const onPictureDrop = useCallback((file) => setPicture(file[0]), []);
  const onDrop = useCallback((files) => setDocumentsToUpload(files), []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [organization, setOrganization] = useState<
    Organization | undefined | "ERROR"
  >();

  console.log(props.session);
  if (!props.session.isLoggedIn) {
    return <Redirect to="/login" />;
  }

/*
  if (!(props.session.role == "SUPERVISOR")) {
    console.log("Usuario sin permisos de supervisor")
    return <Redirect to={{pathname: "/error"}}/>
  }
*/

  const user = withUser(props.session.role, props.session.userId, (p) => {    
    if (p.organizations[0] == undefined) {
      console.log("Usuario sin organizaciones")
      return <Redirect to={{ pathname: "/error" }} />;
    }
    console.log("fetch org: " + p.organizations[0].id) 
    fetchOrganization(p.organizations[0].id)
      .then((res) => res.data)
      .then((o) => setOrganization(o))
      .catch((e) => {
        console.error(e);
        setOrganization("ERROR");
    });
  });

  if (user.type == PENDING) {
    return <Spinner/>;
  }

  if (user.type == ERROR) {
    console.log("Usuario con error")
    return <Redirect to={{pathname: "/error"}}/>
  }

  const project: Project = {
    id: "",
    title: "",
    description: "",
    authors: [],
    supervisors: [],
    creationDate: new Date(),
    documentation: [],
    tags: [],
    extraContent: "",
    organization: user.value.organizations[0]
  };

  if (organization == undefined) {
    return <Spinner/>;
  }

  if (organization == "ERROR") {
    console.log("Organizacion con error")
    return <Redirect to={{ pathname: "/error" }} />;
  }

  function Changes() {
    const changes: Array<Change> = [];

    documentsToUpload.forEach((d) =>
      changes.push({
        undo: () =>
          setDocumentsToUpload(documentsToUpload.filter((dtu) => dtu != d)),
        render: () => <p>Subir el documento {d.name}</p>,
      })
    );
    authorsToAdd.forEach((a) =>
      changes.push({
        undo: () => setAuthorsToAdd(authorsToAdd.filter((ata) => ata != a)),
        render: () => <p>Agregar a {a.fullName} como autor</p>,
      })
    );
    supervisorsToAdd.forEach((s) =>
      changes.push({
        undo: () =>
          setSupervisorsToAdd(supervisorsToAdd.filter((sta) => sta != s)),
        render: () => <p>Agregar a {s.fullName} como supervisor</p>,
      })
    );

    return changes;
  }

  function updateProject(project: Project) {

    console.log(supervisorsToAdd)
    console.log(authorsToAdd)
    console.log(title)
    console.log(description)
    console.log(picture)
    console.log(documentsToUpload)
    console.log(readme)
    console.log(category)

    const response = createProject(title!, category!.id, project.organization.id);
    //response.then

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
      <Parallax filter image={"https://res.cloudinary.com/proyectate/image/upload/v1602530643/tres_claves_infalibles_para_crear_y_desarrollar_un_proyecto_principal_f27c7d41bb.jpg"} small />
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
          <GridContainer className={classes.container}>
            <GridItem>
              <h3>Categoría</h3>
              <div>
                <Autocomplete
                  fullWidth
                  options={props.categories}
                  getOptionLabel={(option) => option.name}
                  defaultValue={category}
                  onChange={(e, c) => {
                    setCategory(c!);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                    />
                  )}
                />
              </div>
            </GridItem>
            <GridItem>
              <h3>Autores</h3>
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
              <Autocomplete
                fullWidth
                options={organization.supervisors.filter(
                  (s) =>
                    !(
                      supervisorsToAdd.includes(s)
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

        <GridContainer align="center" className={classes.container}>
          <GridItem xs={12}>
            <Divider variant="fullWidth" />
          </GridItem>

          <GridItem xs={12} align="left">
            <h3>Cambios</h3>
            <ul>
              {Changes().map((c, idx) => (
                <li
                  className="cursor-pointer underline-hover"
                  onClick={() => c.undo()}
                  key={idx}
                >
                  {c.render()}
                </li>
              ))}
            </ul>
          </GridItem>

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
                {}
                //props.history.push(`/projects/${project.id}`)
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
          Crear {title}
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="primary">
            No, mejor no
          </Button>
          <Button
            onClick={() => {
              setLoading(true);
              updateProject(project);
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
    categories: rootState.common.categories,
  };
};

export default hot(module)(
  connect(mapStateToProps)(withRouter(CreateProjectPage))
);

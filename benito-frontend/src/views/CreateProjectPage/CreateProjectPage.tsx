import {
  Button,
  createMuiTheme,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  makeStyles,
  TextField,
  ThemeProvider,
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
import { createProject, updateContent, uploadDocuments, updatePicture, setProjectUsers } from "../../functions/project";
import image from "../../assets/img/proyectate/pattern.jpg"
import { SET_LOGIN_TRUE } from '../../store/login/types';
import DateInput from "../../components/DateInput/DateInput";
import { KeyboardDatePicker } from "@material-ui/pickers";;
import { updateFromDate } from "../../actions/search";
import store from "../../store";
import { grey } from "@material-ui/core/colors";
import moment from "moment";
import MEDitor from "@uiw/react-md-editor";

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
  const [creationDate, setCreationDate] = useState<string | undefined>();
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
  const [titleIncompleted, setTitleIncompleted] = React.useState(true);
  const [descriptionIncompleted, setDescriptionIncompleted] = React.useState(true);

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

  const theme = createMuiTheme({
    palette: {
      primary: grey,
    },
  });

const themeDate = createMuiTheme({
    palette: {
      primary: grey,
    },
  });

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
    console.log(creationDate)

    
    const response = createProject(title!, category!.id, project.organization.id, creationDate!)
      .then((res) => {
        
        let promises = [];
        const projectId = res.data.id;
    
        //content, documents
        const contentPromise = updateContent(
          projectId,
          [],
          title,
          description,
          readme
        )
          .then(console.log)
          .catch(console.error)
          .then(() => uploadDocuments(projectId, documentsToUpload))
          .then(console.log)
          .catch(console.error);
    
        promises.push(contentPromise);
    
        //picture
        if (picture != undefined) {
          promises.push(updatePicture(projectId, picture));
        }
    
        //users
        const usersPromise = setProjectUsers(authorsToAdd, supervisorsToAdd, projectId)
          .then(console.log)
          .catch(console.error);

        promises.push(usersPromise);
    
        Promise.all(promises)
          .catch(console.error)
          .then(() => props.history.push(`/projects/${projectId}`))
          .then(() => props.history.go(0));

      }).catch((error) => {return <Redirect to={{ pathname: "/error" }} />;});

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
      <Parallax filter image={image} small />
      <div className={classes.main}>
        <GridContainer className={classes.container}>
          <GridItem xs={12} sm={12} md={12}>
            <h2 className={classes.title} style={{ textAlign: "center" }}>
              CREAR UN PROYECTO
            </h2>
            <h4 className={classes.subtitle} style={{ textAlign: "left", paddingBottom: "20px" }}>
              En esta página vas a poder crear un nuevo proyecto, no te olvides de asignarselo a tus alumnos para que ellos lo puedan editar.
            </h4>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
          <TextField
              fullWidth
              required
              error={titleIncompleted}
              className={classes.autocomplete}
              placeholder="Título"
              value={title}
              onChange={(e) => {
                if(e.currentTarget.value.trim() == ""){
                  setTitleIncompleted(true)
                } else {
                  setTitleIncompleted(false)
                }
                setTitle(e.currentTarget.value)}}
            />
          </GridItem>
<GridItem xs={12} sm={12} md={6}>
            <ThemeProvider theme={themeDate}>
            <KeyboardDatePicker className={classes.datePicker}
              clearable={true}
              placeholder="08/04/2016" 
              format="dd/MM/yyyy"
              fullWidth
              label="Fecha de publicacion"
              value={creationDate || null}
              onChange={(e) => {
                if (e && moment(e).format("yyyy-MM-DD").toString() != 'Invalid date') {
                  setCreationDate(moment(e).add(1, 'days').format("yyyy-MM-DD").toString());
                } else {
                  store.dispatch(updateFromDate(""));
                }
              }}
            />
            </ThemeProvider>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
          <TextField
              fullWidth
              multiline
              placeholder="Descripción"
              error={descriptionIncompleted}
              rowsMax={15}
              rows="3"
              value={description}
              onChange={(e) => {
                if(e.currentTarget.value.trim() == ""){
                  setDescriptionIncompleted(true)
                } else {
                  setDescriptionIncompleted(false)
                }
                setDescription(e.currentTarget.value)}}
            />
          </GridItem>
          <GridItem>
            <h4 className={classes.subtitle}>Contenido extra - podés agregar más contenido que represente el proyecto, como texto con distintos formatos o imágenes</h4>
              <MEDitor
                value={readme}
                onChange={(e) => setReadme(e)}
              />
          </GridItem>
          <GridItem>
          <h4 className={classes.subtitle}>Imagen</h4>
            <ImageUploader
              withIcon={true}
              name="pictureUrl"
              buttonText="Elegí una imagen para el proyecto"
              onChange={onPictureDrop}
              label={"Te recomendamos que sea de buena calidad para que el proyecto se vea mejor"}
              imgExtension={[".jpg",".jpeg", ".png"]}
              maxFileSize={5242880}
              singleImage={true}
              withPreview={true}
            />
          </GridItem>
          <GridItem>
          <h4 className={classes.subtitle}>Documentos</h4>
            <section
              className="dropzone-container"
              style={{ marginTop: "15px" }}
            >
              <div {...getRootProps({ className: "dropzone font-size-18-md" })}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Arrastrá los documentos acá...</p>
                ) : (
                  <p>Arrastrá los documentos acá, o hacé click para seleccionar documentos</p>
                )}
              </div>
            </section>
          </GridItem>
        </GridContainer>
          <GridContainer className={classes.container}>
            <GridItem>
              <div>
                <Autocomplete
                  fullWidth
                  className={classes.autocomplete}
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
                      placeholder="Categoría"
                    />
                  )}
                />
              </div>
            </GridItem>
            <GridItem>
              <Autocomplete
                fullWidth
                className={classes.autocomplete}
                options={organization.authors.filter(
                  (a) => !authorsToAdd.includes(a)
                )}
                getOptionLabel={(option) => option.fullName}
                onChange={(e, a) => {
                  if (a) setAuthorsToAdd(authorsToAdd.concat(a!));
                }}
                renderInput={(params) => <TextField {...params} fullWidth placeholder="Autores" />}
              />
            </GridItem>
            <GridItem>
              <Autocomplete
                fullWidth
                className={classes.autocomplete}
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
                renderInput={(params) => <TextField {...params} fullWidth placeholder="Supervisores"/>}
              />
            </GridItem>
          </GridContainer>

        <GridContainer align="center" className={classes.container}>
          <GridItem xs={12}>
            <Divider variant="fullWidth" />
          </GridItem>

          <GridItem xs={12} align="left">
          <h4 className={classes.subtitle}>Cambios, podés hacerles click para deshacerlos</h4>
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

          <GridItem xs={12} align="right">
          <CustomButton
              type="button"
              color="secondary"
              style={{ width: "15%", textAlign: "right" }}
              onClick={() =>
                {}
                //props.history.push(`/projects/${project.id}`)
              }
            >
              Descartar y volver
            </CustomButton>
            <CustomButton
              type="button"
              color="primary"
              disabled={titleIncompleted || descriptionIncompleted}
              style={{ width: "15%", textAlign: "right" }}
              onClick={() => setIsModalOpen(true)}
            >
              Guardar cambios
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

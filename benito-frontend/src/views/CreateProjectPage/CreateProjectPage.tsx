import {
  Button,
  createMuiTheme,
  createStyles,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Hidden,
  Icon,
  makeStyles,
  Popover,
  TextField,
  Theme,
  ThemeProvider,
  Typography,
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
import { Edit, Description, RemoveCircle, AddCircle } from "@material-ui/icons";
import MarkdownCompiler from "../../components/MarkdownCompiler/MarkdownCompiler";
import { Organization, Person, Project, Category } from "../../types";
import { SessionState } from "../../store/session/types";
import { RootState } from "../../reducers";
import { connect } from "react-redux";
import ImageUploader from "react-images-upload";
import { useDropzone } from "react-dropzone";
import CustomButton from "../../components/CustomButtons/Button";
import { fetchOrganization } from "../../functions/organization";
import Autocomplete from "@material-ui/lab/Autocomplete";
import withUser from "../../hooks/withUser";
import {
  createProject,
  updateContent,
  uploadDocuments,
  updatePicture,
  updateTags,
  setProjectUsers,
  generateTagsFromText,
} from "../../functions/project";
import image from "../../assets/img/proyectate/pattern.jpg";
import { SET_LOGIN_TRUE } from "../../store/login/types";
import DateInput from "../../components/DateInput/DateInput";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { updateFromDate } from "../../actions/search";
import store from "../../store";
import { grey } from "@material-ui/core/colors";
import moment from "moment";
import MEDitor from "@uiw/react-md-editor";
import classNames from "classnames";
import CreateGhostUser from "../../components/CreateGhostUser/CreateGhostUser";
import { SSL_OP_EPHEMERAL_RSA } from "constants";
import SelectInput from "@material-ui/core/Select/SelectInput";

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
  const [descriptionIncompleted, setDescriptionIncompleted] = React.useState(
    true
  );
  const [dateIncompleted, setDateIncompleted] = React.useState(true);
  const [categoryIncompleted, setCategoryIncompleted] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [supervisorsIncompleted, setSupervisorsIncompleted] = React.useState(
    true
  );
  const [
    createGhostSupervisorFormOpen,
    setCreateGhostSupervisorFormOpen,
  ] = useState(false);
  const [createGhostAuthorFormOpen, setCreateGhostAuthorFormOpen] = useState(
    false
  );
  const [generatedTags, setGeneratedTags] = useState<Array<string>>([]);
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl2, setAnchorEl2] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen2 = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl2(event.currentTarget);
  };

  const handlePopoverClose2 = () => {
    setAnchorEl2(null);
  };

  const [anchorEl3, setAnchorEl3] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen3 = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl3(event.currentTarget);
  };

  const handlePopoverClose3 = () => {
    setAnchorEl3(null);
  };

  const [anchorEl4, setAnchorEl4] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen4 = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl4(event.currentTarget);
  };

  const handlePopoverClose4 = () => {
    setAnchorEl4(null);
  };

  const [anchorEl5, setAnchorEl5] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen5 = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl5(event.currentTarget);
  };

  const handlePopoverClose5 = () => {
    setAnchorEl5(null);
  };

  const open = Boolean(anchorEl);

  const open2 = Boolean(anchorEl2);

  const open3 = Boolean(anchorEl3);

  const open4 = Boolean(anchorEl4);

  const open5 = Boolean(anchorEl5);

  if (!props.session.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  if (!(props.session.role == "SUPERVISOR")) {
    console.error("Usuario sin permisos de supervisor");
    return <Redirect to={{ pathname: "/error" }} />;
  }

  const user = withUser(props.session.role, props.session.userId, (p) => {
    if (p.organizations[0] == undefined) {
      console.error("Usuario sin organizaciones");
      return <Redirect to={{ pathname: "/error" }} />;
    }
    fetchOrganization(p.organizations[0].id)
      .then((res) => res.data)
      .then((o) => setOrganization(o))
      .catch((e) => {
        console.error(e);
        setOrganization("ERROR");
      });
  });

  if (user.type == PENDING || isLoading) {
    return <Spinner />;
  }

  if (user.type == ERROR) {
    console.error("Usuario con error");
    return <Redirect to={{ pathname: "/error" }} />;
  }

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
    organization: user.value.organizations[0],
    keywordMatchingDocs: [],
  };

  if (organization == undefined) {
    return <Spinner />;
  }

  if (organization == "ERROR") {
    console.error("Organizacion con error");
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
    selectedTags.forEach((s) =>
      changes.push({
        undo: () => setSelectedTags(selectedTags.filter((sta) => sta != s)),
        render: () => <p>Agregar tag {s}</p>,
      })
    );

    return changes;
  }

  function generateTags() {
    let text = title + " . " + description + " . " + readme;
    if (text.length > 100) {
      generateTagsFromText(text).then((tags) => setGeneratedTags(tags.data));
    }
  }

  function updateProject(project: Project) {
    createProject(title!, category!.id, project.organization.id, creationDate!)
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

        //tags
        if (selectedTags != []) {
          promises.push(updateTags(projectId, selectedTags));
        }

        //users
        const usersPromise = setProjectUsers(
          authorsToAdd,
          supervisorsToAdd,
          projectId
        )
          .then(console.log)
          .catch(console.error);

        promises.push(usersPromise);

        Promise.all(promises)
          .catch(console.error)
          .then(() => props.history.push(`/projects/${projectId}`));
      })
      .catch(() => {
        return <Redirect to={{ pathname: "/error" }} />;
      });
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
            <h4
              className={classes.subtitle}
              style={{ textAlign: "left", paddingBottom: "20px" }}
            >
              En esta página vas a poder crear un nuevo proyecto, no te olvides
              de asignarselo a tus alumnos para que ellos lo puedan editar.
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
              onBlur={(e) => {
                generateTags();
              }}
              onChange={(e) => {
                if (e.currentTarget.value.trim() == "") {
                  setTitleIncompleted(true);
                } else {
                  setTitleIncompleted(false);
                }
                setTitle(e.currentTarget.value);
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <ThemeProvider theme={themeDate}>
              <KeyboardDatePicker
                className={classes.datePicker}
                clearable={true}
                placeholder="08/04/2016"
                format="dd/MM/yyyy"
                error={dateIncompleted}
                fullWidth
                label="Fecha de publicacion"
                value={creationDate || null}
                onChange={(e) => {
                  if (
                    e &&
                    moment(e).format("yyyy-MM-DD").toString() != "Invalid date"
                  ) {
                    setCreationDate(
                      moment(e).add(1, "days").format("yyyy-MM-DD").toString()
                    );
                    setDateIncompleted(false);
                  } else {
                    store.dispatch(updateFromDate(""));
                    setDateIncompleted(true);
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
              onBlur={(e) => {
                generateTags();
              }}
              onChange={(e) => {
                if (e.currentTarget.value.trim() == "") {
                  setDescriptionIncompleted(true);
                } else {
                  setDescriptionIncompleted(false);
                }
                setDescription(e.currentTarget.value);
              }}
            />
          </GridItem>
          <GridItem>
            <h4 className={classes.subtitle}>
              Contenido extra{" "}
              <Icon
                onMouseEnter={handlePopoverOpen2}
                onMouseLeave={handlePopoverClose2}
                style={{ color: "#c41234", verticalAlign: "middle" }}
              >
                help
              </Icon>
            </h4>
            <Popover
              id="mouse-over-popover"
              className={classes.popover}
              classes={{
                paper: classes.paper,
              }}
              open={open2}
              anchorEl={anchorEl2}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handlePopoverClose2}
              disableRestoreFocus
            >
              <Typography>
                Podés agregar más información sobre tu proyecto para la gente
                que lo visite. Podés formatear el contenido y cargar imágenes.
              </Typography>
            </Popover>
            <MEDitor
              value={readme}
              style={{ overflow: "hidden" }}
              onChange={(e) => setReadme(e)}
              onBlur={(e) => generateTags()}
            />
          </GridItem>
          <br />
          <GridItem>
            <h4 className={classes.subtitle}>
              Tags{" "}
              <Icon
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                style={{ color: "#c41234", verticalAlign: "middle" }}
              >
                help
              </Icon>
            </h4>
            <Popover
              id="mouse-over-popover"
              className={classes.popover}
              classes={{
                paper: classes.paper,
              }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Typography>
                Te recomendamos algunos tags generados a partir del contenido
                que cargaste en los campos anteriores. Los tags sirven para que
                más gente pueda encontrar tu proyecto!
              </Typography>
            </Popover>
            {selectedTags.map((s, idx) => (
              <div
                key={idx}
                className={classNames(
                  classes.bullet,
                  "underline-hover",
                  "cursor-pointer"
                )}
                onClick={() =>
                  setSelectedTags(selectedTags.filter((sta) => sta != s))
                }
              >
                <RemoveCircle /> {s}
              </div>
            ))}
            <GridContainer style={{ display: "flex", alignItems: "center" }}>
              <GridItem xs={12}>
                <Autocomplete
                  fullWidth
                  clearOnBlur
                  options={generatedTags.filter(
                    (s) => !selectedTags.includes(s)
                  )}
                  freeSolo
                  getOptionLabel={(option) => option}
                  onChange={(e, s) => {
                    if (s) setSelectedTags(selectedTags.concat(s!));
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </GridItem>
            </GridContainer>
          </GridItem>

          <GridItem>
            <h4 className={classes.subtitle}>
              Imagen{" "}
              <Icon
                onMouseEnter={handlePopoverOpen3}
                onMouseLeave={handlePopoverClose3}
                style={{ color: "#c41234", verticalAlign: "middle" }}
              >
                help
              </Icon>
            </h4>
            <Popover
              id="mouse-over-popover"
              className={classes.popover}
              classes={{
                paper: classes.paper,
              }}
              open={open3}
              anchorEl={anchorEl3}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handlePopoverClose3}
              disableRestoreFocus
            >
              <Typography>
                Esta será la imagen de tu proyecto: en la página principal y en
                las búsquedas. También se verá en el encabezado!
              </Typography>
            </Popover>
            <ImageUploader
              withIcon={true}
              name="pictureUrl"
              buttonText="Elegí una imagen para el proyecto"
              onChange={onPictureDrop}
              label={
                "Te recomendamos que sea de buena calidad para que el proyecto se vea mejor"
              }
              imgExtension={[".jpg", ".jpeg", ".png"]}
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
                  <p>
                    Arrastrá los documentos acá, o hacé click para seleccionar
                    documentos
                  </p>
                )}
              </div>
            </section>
          </GridItem>
        </GridContainer>
        <GridContainer className={classes.container}>
          <GridItem>
          <h4 className={classes.subtitle}>Categoría</h4>
            <div>
              <Autocomplete
                fullWidth
                className={classes.autocomplete}
                options={props.categories}
                getOptionLabel={(option) => option.name}
                defaultValue={category}
                onChange={(e, c) => {
                  if (c?.name.trim() == "") {
                    setCategoryIncompleted(true);
                  } else {
                    setCategoryIncompleted(false);
                  }
                  setCategory(c!);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={categoryIncompleted}
                    placeholder="Categoría"
                  />
                )}
              />
            </div>
          </GridItem>
        </GridContainer>
        <GridContainer className={classes.container}>
          <GridItem>
            <h4 className={classes.subtitle}>
              Autores{" "}
              <Icon
                onMouseEnter={handlePopoverOpen4}
                onMouseLeave={handlePopoverClose4}
                style={{ color: "#c41234", verticalAlign: "middle" }}
              >
                help
              </Icon>
            </h4>
            <Popover
              id="mouse-over-popover"
              className={classes.popover}
              classes={{
                paper: classes.paper,
              }}
              open={open4}
              anchorEl={anchorEl4}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handlePopoverClose4}
              disableRestoreFocus
            >
              <Typography>
                Acá podés agregar autores al proyecto. Se ofrecen aquellos que
                tengan un usuario registrado y que pertenezcan a la
                organización.<br></br>
                También se pueden agregar colaboradores sin usuarios asignados,
                ingresando su nombre y mail con la opción: "Crear nuevo autor"
              </Typography>
            </Popover>
            {authorsToAdd.map((s, idx) => (
              <div
                key={idx}
                className={classNames(
                  classes.bullet,
                  "underline-hover",
                  "cursor-pointer"
                )}
                onClick={() =>
                  setAuthorsToAdd(authorsToAdd.filter((sta) => sta != s))
                }
              >
                <RemoveCircle /> {s.fullName}
              </div>
            ))}
            <GridContainer style={{ display: "flex", alignItems: "center" }}>
              <GridItem xs={9}>
                <Autocomplete
                  fullWidth
                  clearOnBlur
                  options={organization.supervisors.filter(
                    (s) => !authorsToAdd.includes(s)
                  )}
                  getOptionLabel={(option) => option.fullName}
                  onChange={(e, s) => {
                    if (s) setAuthorsToAdd(authorsToAdd.concat(s!));
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </GridItem>
              <GridItem xs={3}>
                <CustomButton
                  fullWidth
                  type="button"
                  color="primary"
                  onClick={() => setCreateGhostAuthorFormOpen(true)}
                >
                  <AddCircle />
                  <Hidden smDown>Crear nuevo autor</Hidden>
                </CustomButton>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem>
            <h4 className={classes.subtitle}>
              Supervisores{" "}
              <Icon
                onMouseEnter={handlePopoverOpen5}
                onMouseLeave={handlePopoverClose5}
                style={{ color: "#c41234", verticalAlign: "middle" }}
              >
                help
              </Icon>
            </h4>
            <Popover
              id="mouse-over-popover"
              className={classes.popover}
              classes={{
                paper: classes.paper,
              }}
              open={open5}
              anchorEl={anchorEl5}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handlePopoverClose5}
              disableRestoreFocus
            >
              <Typography>
                Acá podés agregar supervisores al proyecto. Se ofrecen aquellos
                que tengan un usuario registrado y que pertenezcan a la
                organización.<br></br>
                También se pueden agregar colaboradores sin usuarios asignados,
                ingresando su nombre y mail con la opción: "Crear nuevo
                supervisor"
              </Typography>
            </Popover>
            {supervisorsToAdd.map((s, idx) => (
              <div
                key={idx}
                className={classNames(
                  classes.bullet,
                  "underline-hover",
                  "cursor-pointer"
                )}
                onClick={() => {
                  setSupervisorsToAdd(
                    supervisorsToAdd.filter((sta) => sta != s)
                  );
                }}
              >
                <RemoveCircle /> {s.fullName}
              </div>
            ))}
            <GridContainer style={{ display: "flex", alignItems: "center" }}>
              <GridItem xs={9}>
                <Autocomplete
                  fullWidth
                  options={organization.supervisors.filter(
                    (s) => !supervisorsToAdd.includes(s)
                  )}
                  getOptionLabel={(option) => option.fullName}
                  onPointerLeave={(e) => {
                    if (supervisorsToAdd.length > 0) {
                      setSupervisorsIncompleted(false);
                    } else {
                      setSupervisorsIncompleted(true);
                    }
                  }}
                  onChange={(e, s) => {
                    if (s) {
                      setSupervisorsToAdd(supervisorsToAdd.concat(s!));
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={supervisorsIncompleted}
                    />
                  )}
                />
              </GridItem>
              <GridItem xs={3}>
                <CustomButton
                  fullWidth
                  type="button"
                  color="primary"
                  onClick={() => setCreateGhostSupervisorFormOpen(true)}
                >
                  <AddCircle />
                  <Hidden smDown>Crear nuevo supervisor</Hidden>
                </CustomButton>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
        <GridContainer align="center" className={classes.container}>
          <GridItem xs={12}>
            <Divider variant="fullWidth" />
          </GridItem>

          <GridItem xs={12} align="left">
            <h4 className={classes.subtitle}>
              Cambios, podés hacerles click para deshacerlos
            </h4>
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
              style={{ textAlign: "right" }}
              className={classes.button}
              onClick={
                () => {}
                //props.history.push(`/projects/${project.id}`)
              }
            >
              Descartar y volver
            </CustomButton>
            <CustomButton
              type="button"
              color="primary"
              disabled={
                titleIncompleted ||
                descriptionIncompleted ||
                dateIncompleted ||
                categoryIncompleted
              }
              style={{ textAlign: "right" }}
              className={classes.button}
              onClick={() => {
                if (supervisorsToAdd.length > 0) {
                  setIsModalOpen(true);
                  setSupervisorsIncompleted(false);
                } else {
                  setSupervisorsIncompleted(true);
                }
              }}
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
        <DialogTitle id="alert-dialog-title">Crear {title}</DialogTitle>

        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="primary">
            No, mejor no
          </Button>
          <Button
            onClick={() => {
              setLoading(true);
              setIsLoading(true)
              setIsModalOpen(false);
              updateProject(project);
            }}
            color="primary"
            autoFocus
          >
            Sí, estoy seguro
          </Button>
        </DialogActions>
      </Dialog>
      <CreateGhostUser
        role={"SUPERVISOR"}
        organization={organization}
        projects={[]}
        session={props.session}
        open={createGhostSupervisorFormOpen}
        setOpen={setCreateGhostSupervisorFormOpen}
        afterCreate={(p) => setSupervisorsToAdd(supervisorsToAdd.concat(p))}
      />
      <CreateGhostUser
        role={"AUTHOR"}
        organization={organization}
        projects={[]}
        session={props.session}
        open={createGhostAuthorFormOpen}
        setOpen={setCreateGhostAuthorFormOpen}
        afterCreate={(p) => setAuthorsToAdd(authorsToAdd.concat(p))}
      />
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

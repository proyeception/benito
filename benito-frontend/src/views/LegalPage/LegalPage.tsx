import React from "react";
import { hot } from "react-hot-loader";

import { makeStyles } from "@material-ui/core";
import styles from "../../assets/jss/material-kit-react/views/legalPage";
import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import { Helmet } from "react-helmet";
import Footer from "../../components/Footer/Footer";

const useStyles = makeStyles(styles);

const copyright =
  "https://res.cloudinary.com/proyectate/image/upload/v1607020059/concepto-propiedad-intelectual-ilustrado_52683-48609_bsrntd.jpg";

const LegalPage = (props: any) => {
  const { ...rest } = props;
  const classes = useStyles();
  return (
    <div className={classes.white} style={{ overflow: "scroll" }}>
      <Helmet>
        <title>Términos y condiciones de uso de Proyectate</title>
      </Helmet>
      <Header color="darkGray" rightLinks={<HeaderLinks />} fixed {...rest} />
      <div className={classes.main} style={{ overflow: "auto" }}>
        <div id="terms">
          <div className={classes.text}>
            <div className={classes.message}>Términos y condiciones</div>
          </div>
        </div>
        <div id="terms-image" className={classes.imageContainer}>
          <img
            src={copyright}
            className={classes.image}
            alt="Términos y condiciones"
          />
        </div>
        <div className={classes.container}>
          <div className={classes.submessage}>Definiciones</div>
          <div>
            <ol>
              <li>
                "Proyectate", "Nosotros" y "La organización" se refieren a la
                organización de Proyectate.
              </li>
              <li>
                Una "cuenta de usuario" es la relación que se establece entre
                Proyectate y un usuario registrado, sea cual sea su rol.
              </li>
              <li>
                El término "Proyecto" se refiere a un trabajo de campo
                emprendido por alguna organización registrada en Proyectate con
                fines educativos, avalada por los supervisores del mismo.
              </li>
              <li>
                El término "Documento" alude a cualquier tipo de archivo que sea
                cargado en el sistema a través de alguno de los siguientes
                medios: Proyectate, Google Drive.
              </li>
            </ol>
          </div>
          <div className={classes.submessage}>Usuarios</div>
          <div>
            <ol>
              <li>
                Proyectate es una plataforma de libre uso por cualquier usuario
                limitado bajo las funcionalidades que poseen los usuarios sin
                registarse, detalladas a continuación: buscar proyectos,
                visualizar perfiles de usuario, visualizar estadísticas, recibir
                recomendaciones.
              </li>
              <li>
                Proyectate se reserva el derecho de aprobación de usuarios
                supervisores, independientemente de la organización de la que
                provengan.
              </li>
            </ol>
          </div>
          <div className={classes.submessage}>Propiedad intelectual</div>
          <ol>
            <li>
              La organización se reserva el derecho de almacenar, publicar y
              analizar todos los documentos registrados en el sistema, subidos
              por los siguientes medios: Proyectate, Google Drive.
            </li>
            <li>
              La organización no se hace responsable por el contenido, la
              veracidad ni la originalidad de los documentos, siendo el usuario
              el único responsable de garantizar lo antedicho.
            </li>
            <li>
              Proyectate no se hace responsable acerca de la identidad de los
              usuarios que suban material al sitio.
            </li>
            <li>
              Los usuarios que hagan uso de la plataforma para exhibir sus
              documentos siguen teniendo la propiedad intelectual de los mismos
              a todos los efectos legales.
            </li>
          </ol>
        </div>
      </div>
      <div style={{ backgroundColor: "#e5e5e5" }}>
        <Footer />
      </div>
    </div>
  );
};

export default hot(module)(LegalPage);

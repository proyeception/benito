import { createStyles } from "@material-ui/core/styles";

const imagesStyles = createStyles({
  imgFluid: {
    width: "100px",
    height: "100px",
    objectFit: "cover"
  },
  imgRounded: {
    borderRadius: "6px !important",
  },
  imgRoundedCircle: {
    borderRadius: "50% !important",
  },
  imgRaised: {
    boxShadow:
      "0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  imgGallery: {
    width: "100%",
    marginBottom: "2.142rem",
  },
  imgCardTop: {
    display: "block",
    width: "100%",
    objectFit: "cover",
    borderTopLeftRadius: "calc(.25rem - 1px)",
    borderTopRightRadius: "calc(.25rem - 1px)"
  },
  imgCardBottom: {
    width: "100%",
    borderBottomLeftRadius: "calc(.25rem - 1px)",
    borderBottomRightRadius: "calc(.25rem - 1px)",
  },
  imgCard: {
    width: "100%",
    borderRadius: "calc(.25rem - 1px)",
  },
  imgCardOverlay: {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    padding: "1.25rem",
  },
  imgWhiteBackground: {
    background: "#ffffff",
  },
  imgFit: {
    display: "block",
    width: "100%",
    height: "-webkit-fill-available",
    objectFit: "cover",
  }
});

export default imagesStyles;

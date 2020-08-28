export type SocialMedia = {
  logo: String;
};

export const socialMedia = {
  github: {
    logo: "https://image.flaticon.com/icons/png/512/37/37318.png",
  },
  twitter: {
    logo: "https://image.flaticon.com/icons/png/512/23/23931.png",
  },
  facebook: {
    logo: "https://image.flaticon.com/icons/png/512/20/20673.png",
  },
  instagram: {
    logo: "https://cdn.icon-icons.com/icons2/1898/PNG/512/instagram_121064.png",
  },
  get(key: String): SocialMedia | undefined {
    switch (key) {
      case "github":
        return this.github;
      case "twitter":
        return this.twitter;
      case "facebook":
        return this.facebook;
      case "instagram":
        return this.instagram;
      default:
        return undefined;
    }
  },
};

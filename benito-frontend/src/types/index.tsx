export type Project = {
  id: String;
  title: String;
  description: String;
  posterUrl: string;
  authors: Array<Person>;
  creationDate: Date;
  tags: Array<String>;
  extraContent: String;
  documentation: Array<Documentation>;
};

export type Person = {
  username: String;
  fullName: String;
  id: String;
  profilePicUrl?: String;
  organizations: Array<Organization>;
  projects: Array<Project>;
  socials: Array<Social>;
};

export type Category = {
  name: String;
  imageUrl: String;
  tagName: String;
};

export type Documentation = {
  fileName: String;
  id: String;
  driveId: String;
};

export type Organization = {
  displayName: String;
  name: String;
  iconUrl: String;
};

export type Social = {
  socialName: String;
  socialProfileUrl: String;
};

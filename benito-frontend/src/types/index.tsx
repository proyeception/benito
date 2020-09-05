export type Project = {
  id: String;
  title: String;
  description: String;
  posterUrl?: string;
  authors: Array<Person>;
  creationDate: Date;
  tags: Array<String>;
  extraContent: String;
  documentation: Array<Documentation>;
  organization: Organization;
};

export type Person = {
  username: String;
  fullName: String;
  id: String;
  profilePicUrl?: String;
  organizations: Array<Organization>;
  projects: Array<Project>;
  socials: Array<Social>;
  contact?: Contact;
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

export type Contact = {
  phone?: String;
  mail?: String;
};

export type Role = "SUPERVISOR" | "AUTHOR";

export type SessionInfo = {
  userId: String;
  role: Role;
  profilePicUrl: String;
};

export type LoginData = {
  googleUserId: String;
  fullName: String;
  mail: String;
  profilePictureUrl: String;
  token: String;
};

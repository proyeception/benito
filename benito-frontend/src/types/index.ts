export type Project = {
  id: String;
  title: String;
  description: String;
  pictureUrl?: string;
  authors: Array<Person>;
  supervisors: Array<Person>;
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
  about?: String;
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
  id: String;
  displayName: String;
  name: String;
  iconUrl: String;
  authors: Array<Person>;
  supervisors: Array<Person>;
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

export type ProjectEditionRole = "AUTHOR" | "SUPERVISOR" | "VISITOR";

export type SessionInfo = {
  userId: String;
  role: Role;
};

export type LoginData = {
  googleUserId: String;
  fullName: String;
  mail: String;
  profilePictureUrl: String;
  token: String;
};

export type ProjectEdition = {
  title?: String;
  description?: String;
  extraContent?: String;
  pictureUrl?: String;
};

export type UpdateUser = {
  username?: String;
  fullName?: String;
  mail?: String;
  phone?: String;
  socials?: Array<Social>;
};

export enum SortMethod {
  DateAsc = "DATE_ASC",
  DateDesc = "DATE_DESC",
  AlphaAsc = "ALPHA_ASC",
  AlphaDesc = "ALPHA_DESC",
  ViewsAsc = "VIEWS_ASC",
  ViewsDesc = "VIEWS_DESC",
}

export type SearchParams = {
  title?: string;
  category?: string;
  fromDate?: string;
  toDate?: string;
  keyword?: string;
  documentation?: string;
  organization?: string;
  orderBy?: SortMethod;
};

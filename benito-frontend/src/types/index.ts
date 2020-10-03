export type Project = {
  id: string;
  title: string;
  description: string;
  pictureUrl?: string;
  authors: Array<Person>;
  supervisors: Array<Person>;
  creationDate: Date;
  tags: Array<string>;
  extraContent: string;
  documentation: Array<Documentation>;
  organization: Organization;
};

export type Person = {
  username: string;
  fullName: string;
  id: string;
  profilePicUrl?: string;
  organizations: Array<Organization>;
  projects: Array<Project>;
  socials: Array<Social>;
  contact?: Contact;
  about?: string;
};

export type Category = {
  name: string;
  imageUrl: string;
  tagName: string;
};

export type Documentation = {
  fileName: string;
  id: string;
  driveId: string;
};

export type Organization = {
  id: string;
  displayName: string;
  name: string;
  iconUrl: string;
  authors: Array<Person>;
  supervisors: Array<Person>;
};

export type Social = {
  socialName: string;
  socialProfileUrl: string;
};

export type Contact = {
  phone?: string;
  mail?: string;
};

export type Role = "SUPERVISOR" | "AUTHOR";

export type ProjectEditionRole = "AUTHOR" | "SUPERVISOR" | "VISITOR";

export type Session = {
  userId: string;
  role: Role;
};

export type LoginData = {
  googleUserId: string;
  fullName: string;
  mail: string;
  profilePictureUrl: string;
  token: string;
};

export type ProjectEdition = {
  title?: string;
  description?: string;
  extraContent?: string;
  pictureUrl?: string;
};

export type UpdateUser = {
  username?: string;
  fullName?: string;
  mail?: string;
  phone?: string;
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
  organizationName?: string;
  orderBy?: SortMethod;
};

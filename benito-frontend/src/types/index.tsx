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
  profileUrl: String;
};

export type Category = {
  name: String;
  imageUrl: String;
  tagName: String;
};

export type Documentation = {
  fileName: String;
  id: String;
};

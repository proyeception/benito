export type Project = {
  id: String;
  title: String;
  description: String;
  posterUrl: string;
  authors: Array<Person>;
};

export type Person = {
  username: String;
  profileUrl: String;
};

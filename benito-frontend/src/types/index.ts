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
  documentation?: Array<Documentation>;
  organization: Organization;
  keywordMatchingDocs: Array<Documentation>;
  category: string;
  views: string;
};

export type Person = {
  username: string;
  fullName: string;
  id: string;
  profilePicUrl?: string;
  organizations: Array<Organization>;
  projects: Array<Project>;
  socials: Social;
  contact?: Contact;
  about?: string;
  apiKeys: Array<ApiKey>;
};

export type ApiKey = {
  name: string;
  scopes: Array<String>;
};

export type Category = {
  id: string;
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
  authors?: Array<Person>;
  supervisors?: Array<Person>;
  header: string;
  color: string;
};

export type Social = {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
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
  socials?: Social;
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
  tag?: string;
  category?: string;
  from?: string;
  to?: string;
  keyword?: string;
  documentation?: string;
  organizationName?: string;
  orderBy?: SortMethod;
  page?: string;
};

export type OrganizationQuantityType = {
  organization: string,
  quantity: number
}

export type ProjectCreationTimelineType = {
  category: string,
  quantities: Array<QuantityPerYear>
}

export type QuantityPerYear = {
  year: string,
  quantity: number
}

export type TopProject = {
  projectId: string,
  title: string,
  pictureUrl: string | null | undefined,
  views: number
}

export type TopTag = {
  tag: string,
  searchCount: number
}

export type CategoryQuantityType = {
  category: string,
  quantity: number
}

export type ProjectCount = {
  total: number
}

export type TopCategories = {
  categories: Array<CategoryReference>
}

export type CategoryReference = {
  id: String,
  name: String
}

export type RecommendedProjects = {
  projects: Array<ProjectReference>
}

export type ProjectReference = {
  id: string,
  name: string
}

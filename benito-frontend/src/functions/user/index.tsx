import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import { benitoHost } from "../../config";
import { Person, UpdateUser, Role, Social } from "../../types";
import { signRequest } from "../http";
import psl, { ParsedDomain, ParseError } from "psl";
import { Icon } from "@material-ui/core";
import React from "react";
import GithubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";

export async function fetchUser(collection: string, userId: string) {
  let config: AxiosRequestConfig = {
    method: "GET",
    url: `${benitoHost}/benito/${collection}/${userId}`,
  };

  return axios.request<Person>(config).then((res) => res.data);
}

export function mapRoleToCollection(role: Role): "authors" | "supervisors" {
  switch (role) {
    case "SUPERVISOR": {
      return "supervisors";
    }
    case "AUTHOR": {
      return "authors";
    }
  }
}

export async function updateUser(
  collection: string,
  userId: string,
  user: UpdateUser
) {
  let config: AxiosRequestConfig = {
    method: "PATCH",
    url: `${benitoHost}/benito/${collection}/${userId}`,
    data: user,
  };

  return axios.request(signRequest(config));
}

export function socialToIcon(s: Social): JSX.Element {
  let hostname = new URL(s.socialProfileUrl.valueOf()).hostname;
  let parse: ParsedDomain | ParseError = psl.parse(hostname);

  if (parse.error) {
    return <Icon>face</Icon>;
  }

  let success = parse as ParsedDomain;

  switch (success.sld) {
    case "github": {
      return <GithubIcon />;
    }
    case "twitter": {
      return <TwitterIcon />;
    }
    default: {
      return <Icon>face</Icon>;
    }
  }
}

export function createGhostUser(
  name: string,
  projects: Array<string>,
  organizations: Array<string>,
  role: Role,
  mail?: string
): AxiosPromise<Person> {
  let config: AxiosRequestConfig = {
    method: "POST",
    url: `${benitoHost}/benito/${mapRoleToCollection(role)}`,
    data: {
      fullName: name,
      projects: projects,
      organizations: organizations,
      mail: mail,
    },
  };

  return axios.request<Person>(signRequest(config));
}

export function leaveOrganization(
  userId: String,
  collection: String,
  organizationId: String
): AxiosPromise<Person> {
  let config: AxiosRequestConfig = {
    method: "DELETE",
    url: `${benitoHost}/benito/${collection}/${userId}/organizations/${organizationId}`,
  };

  return axios.request<Person>(signRequest(config));
}

export function requestSupervisorAccount(
  organization: string,
  googleUserId: string,
  fullName: string,
  mail: string
) {
  let config: AxiosRequestConfig = {
    method: "POST",
    url: `${benitoHost}/benito/supervisors/sign-up`,
    data: {
      googleUserId: googleUserId,
      fullName: fullName,
      mail: mail,
      organization: organization,
    },
  };

  return axios.request(config);
}

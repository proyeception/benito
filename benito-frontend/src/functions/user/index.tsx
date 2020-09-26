import axios, { AxiosRequestConfig } from "axios";
import { benitoHost } from "../../config";
import { Person, UpdateUser, Role, Social } from "../../types";
import { signRequest } from "../http";
import psl, { ParsedDomain, ParseError } from "psl";
import { Icon } from "@material-ui/core";
import React from "react";
import GithubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";

export async function fetchUser(collection: String, userId: String) {
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
  collection: String,
  userId: String,
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

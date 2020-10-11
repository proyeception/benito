import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import { benitoHost } from "../../config";
import store from "../../store";
import { Organization } from "../../types";

export function fetchOrganizations(
  cached?: boolean
): AxiosPromise<Array<Organization>> {
  let config: AxiosRequestConfig = {
    method: "GET",
    url: `${benitoHost}/benito/organizations?cached=${(
      cached || true
    ).toString()}`,
  };

  return axios.request<Array<Organization>>(config);
}

export function fromOrganizationName(s?: string): Organization | undefined {
  return store.getState().common.organizations.find((o) => o.name == s);
}

export function fetchOrganization(
  id: string,
  cached?: boolean
): AxiosPromise<Organization> {
  let config: AxiosRequestConfig = {
    method: "GET",
    url: `${benitoHost}/benito/organizations/${id}?cached=${(
      cached || true
    ).toString()}`,
  };

  return axios.request<Organization>(config);
}

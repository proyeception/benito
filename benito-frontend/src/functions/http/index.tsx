import { AxiosRequestConfig } from "axios";
import store from "../../store";

export function signRequest(config: AxiosRequestConfig): AxiosRequestConfig {
  const session = store.getState().session;
  const common = store.getState().common;

  let headers = {};

  if (session.isLoggedIn) {
    headers = {
      ...headers,
      "x-qui-token": session.token,
    };
  }

  if (common.customizationToken) {
    headers = {
      ...headers,
      "x-customization-token": common.customizationToken,
    };
  }

  return {
    ...config,
    headers: headers,
  };
}

import { AxiosRequestConfig } from "axios";
import store from "../../store";

export function signRequest(config: AxiosRequestConfig): AxiosRequestConfig {
  return {
    ...config,
    headers: {
      "x-qui-token": store.getState().session.token,
    },
  };
}

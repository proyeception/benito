import { AxiosRequestConfig } from "axios";
import store from "../../store";

export function signRequest(config: AxiosRequestConfig): AxiosRequestConfig {
  const session = store.getState().session;
  return {
    ...config,
    headers: {
      "x-qui-token": session.isLoggedIn ? session.token : null,
    },
  };
}

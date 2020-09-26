import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { benitoHost } from "../config";

export const PENDING = "PENDING";
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";

interface FetchSuccess<T> {
  value: T;
  type: typeof SUCCESS;
}

interface FetchError {
  type: typeof ERROR;
  status?: number;
}

interface FetchPending {
  type: typeof PENDING;
}

export type FetchStatus<T> = FetchSuccess<T> | FetchError | FetchPending;

export default function withFetch<T>(path: String): FetchStatus<T> {
  const [status, setFetch] = useState<FetchStatus<T>>({ type: PENDING });

  useEffect(() => {
    let config: AxiosRequestConfig = {
      url: `${benitoHost}/benito/${path}`,
      method: "GET",
    };

    axios
      .request<T>(config)
      .then((res) => res.data)
      .then((t) => setFetch({ type: SUCCESS, value: t }))
      .catch((e) => setFetch({ type: ERROR, status: e.response?.status }));
  }, []);

  return status;
}

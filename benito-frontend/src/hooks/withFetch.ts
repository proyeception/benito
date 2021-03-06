import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { benitoHost } from "../config";
import { signRequest } from "../functions/http";

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

export default function withFetch<T>(
  path: string,
  onSuccess?: (arg0: T) => void,
  updateListener?: Array<string>
): [FetchStatus<T>, (path: string) => void] {
  const [status, setStatus] = useState<FetchStatus<T>>({ type: PENDING });
  const [isFetching, setIsFetching] = useState(false);

  const initialPath = path;

  const fetch = (path?: string) => {
    if (!isFetching) {
      setIsFetching(true);

      setStatus({ type: PENDING });
      let config: AxiosRequestConfig = {
        url: `${benitoHost}/benito/${path || initialPath}`,
        method: "GET",
        withCredentials: true,
      };

      axios
        .request<T>(signRequest(config))
        .then((res) => res.data)
        .then((t) => {
          setStatus({ type: SUCCESS, value: t });
          if (onSuccess) {
            onSuccess(t);
          }
        })
        .catch((e) => setStatus({ type: ERROR, status: e.response?.status }))
        .then(() => setIsFetching(false));
    }
  };

  useEffect(fetch, updateListener || []);

  return [status, fetch];
}

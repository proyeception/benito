import { PUSH_ROUTE, RoutesAction } from "../../store/routes";

export function pushRoute(url: string): RoutesAction {
  return {
    type: PUSH_ROUTE,
    payload: { path: url },
  };
}

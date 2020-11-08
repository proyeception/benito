export const PUSH_ROUTE = "PUSH_ROUTE";

export type Route = {
  path: string;
};

interface PushRouteAction {
  type: typeof PUSH_ROUTE;
  payload: Route;
}

export type RoutesAction = PushRouteAction;

export type RoutesState = {
  routes: Array<Route>;
};

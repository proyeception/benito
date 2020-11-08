import { PUSH_ROUTE, RoutesAction, RoutesState } from "../../store/routes";

const defaultRoutesState: RoutesState = {
  routes: [],
};

function routesReducer(state = defaultRoutesState, action: RoutesAction) {
  switch (action.type) {
    case PUSH_ROUTE: {
      const lastRoute = state.routes[state.routes.length - 1];
      if (action.payload == lastRoute) {
        return state;
      }

      const routes = state.routes.concat(action.payload);

      return {
        ...state,
        routes: routes.length > 10 ? routes.slice(1, 11) : routes,
      };
    }
    default: {
      return state;
    }
  }
}

export default routesReducer;

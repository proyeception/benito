import { Project, Role } from "../../types";
import store from "../../store";
import { setProjectAuthor, setProjectVisitor } from "../../actions/project";

export function setProjectEditionRole({
  project,
  userId,
  role,
}: {
  project: Project;
  userId?: String;
  role?: Role;
}) {
  if (
    userId &&
    role == "AUTHOR" &&
    project.authors.some((a) => a.id == userId)
  ) {
    store.dispatch(setProjectAuthor());
  } else {
    store.dispatch(setProjectVisitor());
  }
}

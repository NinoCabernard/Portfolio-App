import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/home/home.tsx"),
  route("projects", "pages/projects/projects.tsx"),
  route("project/:projectName", "pages/project-detail/project-detail.tsx")
] satisfies RouteConfig;
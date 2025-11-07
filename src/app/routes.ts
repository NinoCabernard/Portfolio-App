import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/home.tsx"),
  route("contact", "pages/contact.tsx"),
  route("projects", "pages/projects.tsx"),
  route("project/:projectName", "pages/project/project.tsx")
] satisfies RouteConfig;

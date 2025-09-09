import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/home.tsx"),
  route("about", "pages/about.tsx"),
  route("contact", "pages/contact.tsx"),
  route("projects", "pages/projects.tsx")
] satisfies RouteConfig;

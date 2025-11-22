import "./app.css";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import type { Route } from "./+types/root";
import { ServiceProvider } from "./serviceContext";
import NavigationBar from "./components/nav/navigation-bar";
import Footer from "./components/footer/footer";
import { useState } from "react";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export default function App() {
  const location = useLocation();
  const isIntroPage = location.pathname === "/";
  const [introCompleted, setIntroCompleted] = isIntroPage
    ? useState(false)
    : useState(true);

  const onIntroCompleted = (isCompleted: boolean) => {
    setIntroCompleted(isCompleted);
  };

  return (
    <html lang="en">
      <head>
        <title>Portfolio - Nino Cabernard</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          rel="icon"
          type="image/svg+xml"
          sizes="64x64"
          href="/images/icon/icon.svg"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <ServiceProvider>
          <div className="site-container">
            <header className="site-header">
              {introCompleted && <NavigationBar></NavigationBar>}
            </header>
            <main className="site-main">
              <Outlet context={{ onIntroCompleted }}></Outlet>
            </main>

            <div className="site-footer">
              {introCompleted && <Footer></Footer>}
            </div>
          </div>
        </ServiceProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  type LoaderFunctionArgs,
} from "react-router";

import type { Route } from "./+types/root";
import stylesheet from "./index.css?url";
import { Toaster } from "sonner";
import { AppLayout } from "~/components/app-sidebar";
import { authClient } from "./lib/auth-client";

export async function loader({ request, context }: LoaderFunctionArgs) {

  const serverUrl = context.cloudflare.env.BASE_URL;
  // return{
  //   serverUrl,
  //   user:{
  //     id:"1",
  //     name:"أحمد",
  //     email:"test@example.com",
  //     role:"مسؤول النظام"
  //   }
  // }

  const url = new URL(request.url);

  const publicRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ];

  if (publicRoutes.includes(url.pathname)) {
    return { serverUrl };
  }

  const cookieHeader = request.headers.get("Cookie");


  const res = await authClient(serverUrl).getSession({
    fetchOptions: {
      headers: {
        Cookie: cookieHeader || "",
      },
      // credentials: "include",
    },
  });

  const session = res.data?.session;

  if (!session) {
    return redirect("/login");
  }

  const user = res.data?.user;

  return { serverUrl, user };
}

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
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {

  const location = useLocation();
  const { user } = useLoaderData<typeof loader>();

  const noSidebarRoutes = [
    "/login",
    "/singup",
    "/forgot-password",
    "/reset-password",
  ];
  const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <html dir="rtl" lang="ar">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {shouldShowSidebar ? <AppLayout user={user} >{children}</AppLayout> : children}
        <Toaster richColors position="bottom-right" />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
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

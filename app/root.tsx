import {
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
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
import { getToast } from "~/lib/toast.server";
import { useToast } from "./hooks/use-toast";
import { useEffect } from "react";
import LogoSVG from "~/assets/images/logo.svg?react"
import { Button } from "./components/ui/button";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const serverUrl = context.cloudflare.env.BASE_URL;

  const url = new URL(request.url);
  const publicRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ];
  try {
    const cookieHeader = request.headers.get("Cookie");

    const [sessionResponse, toastResponse] = await Promise.all([
      authClient(serverUrl).getSession({
        fetchOptions: {
          headers: {
            Cookie: cookieHeader || "",
          },
          // credentials: "include",
        },
      }),
      getToast(request, context.cloudflare.env.SESSION_SECRET),
    ]);

    if (publicRoutes.includes(url.pathname)) {
      return { serverUrl };
    }
    const session = sessionResponse.data?.session;

    if (!session) {
      return redirect("/login");
    }

    const user = sessionResponse.data?.user;
    return Response.json(
      {
        serverUrl,
        toast: toastResponse.toast,
        user,
      },
      {
        headers: toastResponse.headers || undefined,
      }
    );
  } catch (error) {
    return Response.json(
      {
        serverUrl,
        toast: null,
        user: null,
      },
      {
        headers: undefined,
      }
    );
  }
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
  // @ts-ignore
  //TODO: proper typing later
  const { user, toast, serverUrl } = useLoaderData<typeof loader>();
  useToast(toast);

  useEffect(() => {
    document.title = " كدان | Kedan ";
  }, []);

  const noSidebarRoutes = [
    "/login",
    "/singup",
    "/forgot-password",
    "/reset-password",
  ];
  const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname) ;
  const isAdmin = user?.role === "admin"
  

  return (
    <html dir="rtl" lang="ar">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {shouldShowSidebar && isAdmin ? <AppLayout serverUrl={serverUrl} user={user} >{children}</AppLayout> : !isAdmin && shouldShowSidebar ?
        (
          <main className="p-5 w-full h-full min-h-screen">
            <div className="w-full h-full">
            {children}
            </div>
          </main>
):
children
}


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
  let message = "المعذرة٫ حدث خطأ";
  let details = "حدث خطأ غير متوقع أثناء عمل الموقع٫ يرجى المحاولة في وقت لاحق ";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "الصفحة المطلوبة غير موجودة."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container h-[90vh] flex justify-center items-center  mx-auto">
      <div className="text-center">
        <LogoSVG className="mx-auto"/>
      <h4 className="text-red-900 mb-2 mt-8 font-bold">{message}</h4>
      <h6>{details}</h6>
<NavLink to={"/"}>
<Button className="my-4" variant={"secondary"}>العودة للصفحة الرئيسية</Button>

</NavLink>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
      </div>
 
    </main>
  );
}

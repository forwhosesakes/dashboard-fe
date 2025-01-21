import { combineHeaders } from "./combine-headers";
import { createCookieSessionStorage, redirect } from "react-router";

import { ToastSchema, type ToastInput } from "~/types/toast.types";

export const toastKey = "toast";


export const toastSessionStorage = (sessionSecret: string) =>
  createCookieSessionStorage({
    cookie: {
      name: "en_toast",
      sameSite: "lax",
      path: "/",
      httpOnly: true,
      secrets: sessionSecret.split(","),
      secure: !(process.env.NODE_ENV === "development"),
    },
  });

export async function redirectWithToast(
  url: string,
  sessionSecret: string,
  toast: ToastInput,
  init?: ResponseInit
) {
  return redirect(url, {
    ...init,
    headers: combineHeaders(
      init?.headers,
      await createToastHeaders(toast, sessionSecret)
    ),
  });
}

export async function createToastHeaders(
  toastInput: ToastInput,
  sessionSecret: string
) {
  const session = await toastSessionStorage(sessionSecret).getSession();

  const toast = ToastSchema.parse(toastInput);
  session.flash(toastKey, toast);
  const cookie = await toastSessionStorage(sessionSecret).commitSession(
    session
  );
  return new Headers({ "set-cookie": cookie });
}

export async function getToast(request: Request, sessionSecret: string) {
  const session = await toastSessionStorage(sessionSecret).getSession(
    request.headers.get("cookie")
  );
  const result = ToastSchema.safeParse(session.get(toastKey));
  const toast = result.success ? result.data : null;
  return {
    toast,
    headers: toast
      ? new Headers({
          "set-cookie": await toastSessionStorage(sessionSecret).destroySession(
            session
          ),
        })
      : null,
  };
}

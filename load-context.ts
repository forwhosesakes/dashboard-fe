// load-context.ts
import { type AppLoadContext } from "@react-router/cloudflare";
import { type PlatformProxy } from "wrangler";


// When using `wrangler.toml` to configure bindings,
// `wrangler types` will generate types for those bindings
// into the global `Env` interface.
// Need this empty interface so that typechecking passes
// even if no `wrangler.toml` exists.


type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;
export function dispatch(message: string) {
  return message;
}

declare module "@react-router/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
    extra: string; // augmented
    dispatch: typeof dispatch;
  }
}

type GetLoadContext = (args: {
  request: Request;
  context: { cloudflare: Cloudflare }; // load context _before_ augmentation
}) => AppLoadContext;

// Shared implementation compatible with Vite, Wrangler, and Cloudflare Pages
export const getLoadContext: GetLoadContext = ({ context }) => {
  return {
    ...context,
    extra: "stuff",
    dispatch,
  };
};
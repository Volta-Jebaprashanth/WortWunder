import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { DESKTOP_QUERY, DesktopViewSwitch, VIEW_KEY } from "@/components/DesktopViewSwitch";
import appCss from "../styles.css?url";

// Runs before first paint on desktops: sets <html data-view> to the saved
// view (tablet unless phone was picked) and keeps --frame-zoom /
// --frame-width / --frame-height fitting that device's screen — iPhone 17
// Pro Max 440x956, iPad Air 820x1180 — into the window (styles.css). It
// only zooms out, never past 75%; below that the device gets shorter (or
// narrower) instead.
// DesktopViewSwitch calls window.__fitFrame() after switching views.
const FRAME_SCRIPT = `(function(){var d=document.documentElement;
if(!matchMedia(${JSON.stringify(DESKTOP_QUERY)}).matches)return;
var v='tablet';try{if(localStorage.getItem(${JSON.stringify(VIEW_KEY)})==='phone')v='phone';}catch(e){}
d.setAttribute('data-view',v);
function fit(){var p=d.getAttribute('data-view')==='phone',W=p?440:820,H=p?956:1180,w=innerWidth-48,h=innerHeight-48;
var z=Math.min(1,Math.max(0.75,Math.min(w/W,h/H)));
d.style.setProperty('--frame-zoom',z);d.style.setProperty('--frame-width',Math.min(W,w/z)+'px');d.style.setProperty('--frame-height',Math.min(H,h/z)+'px');}
window.__fitFrame=fit;fit();addEventListener('resize',fit);})();`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "WortWunder" },
      { name: "description", content: "A playful German vocabulary adventure for young learners." },
      { name: "author", content: "WortWunder" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "WortWunder" },
      { name: "theme-color", content: "#ffffff" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito:wght@500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { rel: "apple-touch-icon", href: "/icons/icon-192.png" },
      { rel: "manifest", href: "/manifest.json" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: FRAME_SCRIPT sets data-view and style on <html> before hydration.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: FRAME_SCRIPT }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__bip=null;window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__bip=e;window.dispatchEvent(new Event('bip-ready'));});`,
          }}
        />
        <HeadContent />
      </head>
      <body>
        {/* Tablet- or phone-sized column on desktop; plain wrappers on phones and tablets (styles.css). */}
        <div className="app-frame">
          <div className="app-frame-scroll">{children}</div>
        </div>
        <DesktopViewSwitch />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}

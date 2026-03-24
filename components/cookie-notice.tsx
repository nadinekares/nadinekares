"use client";

import { useSyncExternalStore, useState } from "react";

const STORAGE_KEY = "cookie-notice-dismissed";

const subscribe = () => () => {};

export function CookieNotice() {
  const dismissed = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(STORAGE_KEY) !== null,
    () => true,
  );
  const [hidden, setHidden] = useState(false);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setHidden(true);
  }

  if (dismissed || hidden) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed bottom-0 inset-x-0 z-[90] border-t border-border bg-background/95 px-6 py-2.5 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          Only essential cookies.{" "}
          <a href="/privacy" className="underline hover:text-foreground">
            Learn more
          </a>
        </p>
        <button
          onClick={dismiss}
          className="shrink-0 rounded-md border border-border bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          OK
        </button>
      </div>
    </div>
  );
}

import type { Browser } from "webextension-polyfill";

declare global {
  // The browser object is available globally from the polyfill
  const browser: Browser;
}

import { setConsoleFunction } from "three";

/**
 * R3F v9 still constructs a `THREE.Clock` internally (deprecated in three r183
 * in favor of `THREE.Timer`), which logs a deprecation warning per Canvas.
 * Filter exactly that message through three's official console hook and pass
 * everything else through untouched.
 *
 * TODO: remove once @react-three/fiber switches its internal clock to Timer.
 */
let installed = false;

export function installThreeConsoleFilter() {
  if (installed) return;
  installed = true;
  setConsoleFunction((type, message, ...params) => {
    if (
      type === "warn" &&
      typeof message === "string" &&
      message.includes("Clock: This module has been deprecated")
    ) {
      return;
    }
    console[type](message, ...params);
  });
}

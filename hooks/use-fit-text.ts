"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Scales a text element's font-size so it fills the viewport width
 * (minus its own CSS padding). Attach the returned ref to the element.
 */
export function useFitText<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  const fit = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const computed = getComputedStyle(el);
    const padL = parseFloat(computed.paddingLeft) || 0;
    const padR = parseFloat(computed.paddingRight) || 0;
    const availableWidth = window.innerWidth - padL - padR;

    el.style.fontSize = "100px";
    el.style.display = "inline";
    el.style.position = "static";
    el.style.paddingLeft = "0";
    el.style.paddingRight = "0";
    const textWidth = el.getBoundingClientRect().width;
    el.style.display = "";
    el.style.position = "";
    el.style.paddingLeft = "";
    el.style.paddingRight = "";

    const scale = availableWidth / textWidth;
    el.style.fontSize = `${100 * scale}px`;
  }, []);

  useEffect(() => {
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [fit]);

  return ref;
}

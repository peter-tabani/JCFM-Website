"use client";

import { ReactNode, useEffect } from "react";

const SAFE_SCHEMES = ["tel:", "mailto:", "sms:", "https://wa.me", "http://wa.me", "whatsapp://"];
const ALLOWED_PATH_PREFIXES = ["/mission-trips"];

const SHARE_NOTICE = "Full site demo — additional pages will open soon.";

function shouldBlockLink(href: string | null): boolean {
  if (!href) return false;
  const value = href.trim();
  if (value === "" || value === "/") return false;
  if (value.startsWith("#") || value.startsWith("/#")) return false;

  const lower = value.toLowerCase();
  if (SAFE_SCHEMES.some((prefix) => lower.startsWith(prefix))) return false;

  if (ALLOWED_PATH_PREFIXES.some((prefix) => value.startsWith(prefix))) return false;

  return true;
}

export default function NavigationLock({ children }: { children: ReactNode }) {
  useEffect(() => {
    const doc = document;
    const html = doc.documentElement;
    html.dataset.shareLock = "true";

    const updateLink = (anchor: HTMLAnchorElement) => {
      const blocked = shouldBlockLink(anchor.getAttribute("href"));
      if (blocked) {
        anchor.setAttribute("data-locked-link", "true");
        anchor.setAttribute("aria-disabled", "true");
        if (!anchor.getAttribute("title")) {
          anchor.setAttribute("title", SHARE_NOTICE);
        }
      } else {
        anchor.removeAttribute("data-locked-link");
        anchor.removeAttribute("aria-disabled");
      }
    };

    const scan = () => {
      doc.querySelectorAll<HTMLAnchorElement>("a[href]").forEach(updateLink);
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.target instanceof HTMLAnchorElement) {
          updateLink(mutation.target);
          return;
        }
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches("a[href]")) {
            updateLink(node as HTMLAnchorElement);
          }
          node.querySelectorAll<HTMLAnchorElement>("a[href]").forEach(updateLink);
        });
      });
    });

    scan();

    observer.observe(doc.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["href"],
    });

    const clickHandler = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[data-locked-link='true']");
      if (!anchor) return;
      event.preventDefault();
      event.stopPropagation();
    };

    const keyHandler = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest<HTMLAnchorElement>("a[data-locked-link='true']");
      if (!anchor) return;
      event.preventDefault();
      event.stopPropagation();
    };

    doc.addEventListener("click", clickHandler, true);
    doc.addEventListener("keydown", keyHandler, true);

    return () => {
      observer.disconnect();
      doc.removeEventListener("click", clickHandler, true);
      doc.removeEventListener("keydown", keyHandler, true);
      delete html.dataset.shareLock;
    };
  }, []);

  return children;
}

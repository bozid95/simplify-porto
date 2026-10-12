"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function detectDeviceType(userAgent: string) {
  if (/tablet|ipad/i.test(userAgent)) return "Tablet";
  if (/mobile|android|iphone/i.test(userAgent)) return "Mobile";
  return "Desktop";
}

function normalizeAnalyticsPath(pathname: string) {
  if (pathname === "/blog") return "/notes";
  if (pathname.startsWith("/blog/")) {
    return pathname.replace(/^\/blog/, "/notes");
  }
  return pathname || "/";
}

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/dashboard") || pathname.startsWith("/login")) {
      return;
    }

    // Generate or get session ID from local storage
    let sessionId = localStorage.getItem("analytics_session_id");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("analytics_session_id", sessionId);
    }

    const trackView = async () => {
      try {
        const userAgent = window.navigator.userAgent;
        const canonicalPath = normalizeAnalyticsPath(pathname);
        const deviceType = detectDeviceType(userAgent);

        await fetch("/api/analytics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: canonicalPath,
            device_type: deviceType,
            session_id: sessionId,
          }),
          keepalive: true,
        });
      } catch {
        // Analytics must never interrupt page usage.
      }
    };

    trackView();
  }, [pathname]);

  return null;
}

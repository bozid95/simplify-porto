"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function detectDeviceType(userAgent: string) {
  if (/tablet|ipad/i.test(userAgent)) return "Tablet";
  if (/mobile|android|iphone/i.test(userAgent)) return "Mobile";
  return "Desktop";
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
      const supabase = createClient();
      const userAgent = window.navigator.userAgent;
      const fullPath = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      const deviceType = detectDeviceType(userAgent);

      await supabase.from("analytics").insert({
        path: fullPath,
        device_type: deviceType,
        session_id: sessionId,
      });
    };

    trackView();
  }, [pathname, searchParams]);

  return null;
}

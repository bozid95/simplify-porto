"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Generate or get session ID from local storage
    let sessionId = localStorage.getItem("analytics_session_id");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("analytics_session_id", sessionId);
    }

    const trackView = async () => {
      const supabase = createClient();
      const userAgent = window.navigator.userAgent;
      const referrer = document.referrer;
      const fullPath = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

      await supabase.from("analytics").insert({
        path: fullPath,
        user_agent: userAgent,
        referrer: referrer,
        session_id: sessionId,
      });
    };

    trackView();
  }, [pathname, searchParams]);

  return null;
}

import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

type AnalyticsPayload = {
  path?: string;
  device_type?: string;
  session_id?: string;
};

function getSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function POST(request: NextRequest) {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase analytics client is not configured." },
      { status: 500 }
    );
  }

  const payload = (await request.json()) as AnalyticsPayload;
  const path = payload.path?.trim() || "/";

  const { error } = await supabase.from("analytics").insert({
    path,
    device_type: payload.device_type || "Desktop",
    session_id: payload.session_id || null,
    user_agent: request.headers.get("user-agent") || null,
    referrer: request.headers.get("referer") || null,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format, startOfDay, subDays } from "date-fns";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

type RawAnalyticsRow = {
  path: string;
  device_type: string | null;
  session_id: string | null;
  created_at: string;
};

type ChartPoint = {
  date: string;
  views: number;
};

type NamedValue = {
  name: string;
  value: number;
};

type AnalyticsState = {
  dailyViews: ChartPoint[];
  topPages: NamedValue[];
  devices: NamedValue[];
  totalViews: number;
  uniqueVisitors: number;
  loading: boolean;
};

function formatChartDate(date: Date) {
  return format(date, "MMM dd");
}

function normalizePublicPath(path: string) {
  const withoutQuery = path.split("?")[0] || "/";
  if (withoutQuery === "/blog") return "/notes";
  if (withoutQuery.startsWith("/blog/")) {
    return withoutQuery.replace(/^\/blog/, "/notes");
  }
  return withoutQuery;
}

export function AnalyticsCharts() {
  const [data, setData] = useState<AnalyticsState>({
    dailyViews: [],
    topPages: [],
    devices: [],
    totalViews: 0,
    uniqueVisitors: 0,
    loading: true,
  });

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void (async () => {
        try {
          const supabase = createClient();
          const startDate = subDays(startOfDay(new Date()), 29);

          const { data: rawAnalytics, error: rawAnalyticsError } = await supabase
            .from("analytics")
            .select("path, device_type, session_id, created_at")
            .gte("created_at", startDate.toISOString())
            .order("created_at", { ascending: true });

          if (rawAnalyticsError) {
            throw rawAnalyticsError;
          }

          const rows = (rawAnalytics as RawAnalyticsRow[] | null) || [];

          const dailyMap = new Map<string, number>();
          const dailyVisitors = new Map<string, Set<string>>();
          for (let i = 29; i >= 0; i -= 1) {
            const date = subDays(new Date(), i);
            const key = format(date, "yyyy-MM-dd");
            dailyMap.set(key, 0);
            dailyVisitors.set(key, new Set());
          }

          const pathMap = new Map<string, number>();
          const deviceMap = new Map<string, number>();
          const totalVisitors = new Set<string>();

          rows.forEach((row, index) => {
            const dateKey = format(new Date(row.created_at), "yyyy-MM-dd");
            const visitorId = row.session_id || `anonymous-${index}`;
            const path = normalizePublicPath(row.path || "/");
            const device = row.device_type || "Desktop";

            dailyMap.set(dateKey, (dailyMap.get(dateKey) || 0) + 1);
            dailyVisitors.get(dateKey)?.add(visitorId);
            totalVisitors.add(visitorId);
            pathMap.set(path, (pathMap.get(path) || 0) + 1);
            deviceMap.set(device, (deviceMap.get(device) || 0) + 1);
          });

          const dailyViews = Array.from(dailyMap.entries()).map(([rawDate, views]) => ({
            date: formatChartDate(new Date(`${rawDate}T00:00:00`)),
            views,
          }));

          const totalViews = rows.length;
          const uniqueVisitors = totalVisitors.size;

          const topPages = Array.from(pathMap.entries())
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);

          const devices = Array.from(deviceMap.entries()).map(([name, value]) => ({
            name,
            value,
          }));

          setData({
            dailyViews,
            topPages,
            devices,
            totalViews,
            uniqueVisitors,
            loading: false,
          });
        } catch (error) {
          console.error("Error fetching analytics summaries", error);
          setData((prev) => ({ ...prev, loading: false }));
        }
      })();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (data.loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-muted-foreground">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Views (30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalViews.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unique Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.uniqueVisitors.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Views/Visitor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.uniqueVisitors > 0
                ? (data.totalViews / data.uniqueVisitors).toFixed(1)
                : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle>Visitor Trends</CardTitle>
            <CardDescription>Daily page views for the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.dailyViews}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis
                    dataKey="date"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}
                    itemStyle={{ color: "var(--foreground)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle>Device Distribution</CardTitle>
            <CardDescription>Visitors by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.devices}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.devices.map((entry, index) => (
                      <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}
                    itemStyle={{ color: "var(--foreground)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 flex justify-center gap-4">
                {data.devices.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2 text-sm">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span>{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle>Top Pages</CardTitle>
          <CardDescription>Most visited pages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topPages} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={150}
                  tick={{ fontSize: 12 }}
                  interval={0}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}
                  itemStyle={{ color: "var(--foreground)" }}
                />
                <Bar dataKey="value" fill="#82ca9d" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

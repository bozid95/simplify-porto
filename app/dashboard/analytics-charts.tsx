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
import { startOfDay, subDays, format } from "date-fns";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export function AnalyticsCharts() {
  const [data, setData] = useState<{
    dailyViews: any[];
    topPages: any[];
    devices: any[];
    totalViews: number;
    uniqueVisitors: number;
    loading: boolean;
  }>({
    dailyViews: [],
    topPages: [],
    devices: [],
    totalViews: 0,
    uniqueVisitors: 0,
    loading: true,
  });

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const startDate = subDays(startOfDay(new Date()), 29).toISOString();

      const { data: analytics, error } = await supabase
        .from("analytics")
        .select("*")
        .gte("created_at", startDate);

      if (error || !analytics) {
        console.error("Error fetching analytics", error);
        setData((prev) => ({ ...prev, loading: false }));
        return;
      }

      // Process Daily Views
      const dailyMap = new Map();
      // Initialize last 30 days with 0
      for (let i = 29; i >= 0; i--) {
        const date = AppDate(subDays(new Date(), i));
        dailyMap.set(date, 0);
      }
      
      analytics.forEach((log) => {
        const date = AppDate(new Date(log.created_at));
        if (dailyMap.has(date)) {
          dailyMap.set(date, dailyMap.get(date) + 1);
        }
      });

      const dailyViews = Array.from(dailyMap.entries()).map(([date, views]) => ({
        date,
        views,
      }));

      // Process Top Pages
      const pageMap = new Map();
      analytics.forEach((log) => {
        const path = log.path.split("?")[0]; // Remove query params
        pageMap.set(path, (pageMap.get(path) || 0) + 1);
      });
      const topPages = Array.from(pageMap.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

      // Process Devices
      const deviceMap = new Map();
      analytics.forEach((log) => {
        let device = "Desktop";
        if (/mobile/i.test(log.user_agent)) device = "Mobile";
        else if (/tablet/i.test(log.user_agent)) device = "Tablet";
        
        // Simple heuristic - can be improved
        if (log.device_type) device = log.device_type;
        
        deviceMap.set(device, (deviceMap.get(device) || 0) + 1);
      });
      const devices = Array.from(deviceMap.entries()).map(([name, value]) => ({
        name,
        value,
      }));

      // Unique Visitors
      const uniqueSessions = new Set(analytics.map((log) => log.session_id)).size;

      setData({
        dailyViews,
        topPages,
        devices,
        totalViews: analytics.length,
        uniqueVisitors: uniqueSessions,
        loading: false,
      });
    }

    fetchData();
  }, []);

  function AppDate(date: Date) {
      return format(date, "MMM dd");
  }

  if (data.loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-muted-foreground">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Views (30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalViews.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unique Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.uniqueVisitors.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border/60">
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

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-sm border-border/60">
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
                    contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                    itemStyle={{ color: 'var(--foreground)' }}
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

        <Card className="col-span-3 shadow-sm border-border/60">
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
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                     contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                     itemStyle={{ color: 'var(--foreground)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {data.devices.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <span>{entry.name}</span>
                    </div>
                ))}
            </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-border/60">
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
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                    itemStyle={{ color: 'var(--foreground)' }}
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

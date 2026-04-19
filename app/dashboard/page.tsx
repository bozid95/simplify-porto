import { AnalyticsCharts } from "./analytics-charts";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Overview
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your portfolio performance
        </p>
      </div>
      <AnalyticsCharts />
    </div>
  );
}

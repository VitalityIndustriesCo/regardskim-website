"use client";

import { useEffect, useState, useCallback } from "react";
import { Clock3, Inbox, Send, ShieldAlert } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { BarChart3 } from "lucide-react";
import { api } from "@/lib/api";

interface DailyStat {
  date: string;
  emailsReceived: number;
  emailsAutoSent: number;
  emailsApproved: number;
  emailsEdited: number;
  emailsEscalated: number;
  emailsIgnored: number;
  wismoCount: number;
  refundCount: number;
  productQCount: number;
  complaintCount: number;
}

interface StatsResponse {
  period: string;
  totals: {
    emailsReceived: number;
    emailsAutoSent: number;
    emailsApproved: number;
    emailsEdited: number;
    emailsEscalated: number;
    emailsIgnored: number;
    wismoCount: number;
    refundCount: number;
    productQCount: number;
    complaintCount: number;
  };
  hoursSaved: number;
  approvalRate: number;
  daily: DailyStat[];
}

const CATEGORY_COLORS = ["#6366f1", "#f59e0b", "#ef4444", "#10b981", "#8b5cf6"];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-AU", { month: "short", day: "numeric" });
}

export default function AnalyticsPage() {
  const [data, setData] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api<{ success: boolean; data: StatsResponse }>("/api/store/stats?period=7d");
      setData(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Derived chart data
  const volumeData = data?.daily.map((d) => ({
    date: formatDate(d.date),
    received: d.emailsReceived,
    handled: d.emailsAutoSent + d.emailsApproved + d.emailsEdited,
  })) ?? [];

  const categoryData = data
    ? [
        { name: "WISMO", value: data.totals.wismoCount },
        { name: "Refund", value: data.totals.refundCount },
        { name: "Complaint", value: data.totals.complaintCount },
        { name: "Product Q", value: data.totals.productQCount },
        { name: "Other", value: Math.max(0, data.totals.emailsReceived - data.totals.wismoCount - data.totals.refundCount - data.totals.complaintCount - data.totals.productQCount) },
      ].filter((c) => c.value > 0)
    : [];

  const responseTimeData = data?.daily.map((d) => {
    const handled = d.emailsAutoSent + d.emailsApproved + d.emailsEdited;
    // Estimate: auto-sent ≈ 1 min, approved ≈ 30 min, edited ≈ 45 min
    const avgMin = handled > 0
      ? Math.round((d.emailsAutoSent * 1 + d.emailsApproved * 30 + d.emailsEdited * 45) / handled)
      : 0;
    return { date: formatDate(d.date), minutes: avgMin };
  }) ?? [];

  const pending = data
    ? data.totals.emailsReceived - data.totals.emailsAutoSent - data.totals.emailsApproved - data.totals.emailsEdited - data.totals.emailsEscalated - data.totals.emailsIgnored
    : 0;

  const statCards = data
    ? [
        { label: "Emails received", value: data.totals.emailsReceived.toLocaleString(), icon: Inbox },
        { label: "Auto-sent", value: data.totals.emailsAutoSent.toLocaleString(), icon: Send },
        { label: "Pending review", value: Math.max(0, pending).toLocaleString(), icon: ShieldAlert },
        { label: "Hours saved", value: data.hoursSaved.toFixed(1), icon: Clock3 },
      ]
    : [];

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Analytics</h1>
          <p className="text-sm text-muted-foreground">
            A clean snapshot of inbox activity, automation, and response performance.
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingState message="Loading analytics…" />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchStats} />
      ) : !data || data.totals.emailsReceived === 0 ? (
        <EmptyState
          icon={BarChart3}
          title="No analytics data yet"
          description="Once emails start flowing through your inbox, analytics will appear here."
        />
      ) : (
        <>
          {/* KPI cards */}
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            {statCards.map((stat) => (
              <Card key={stat.label}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardDescription>{stat.label}</CardDescription>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <stat.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl md:text-3xl">{stat.value}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            {/* Volume over time */}
            <Card>
              <CardHeader>
                <CardTitle>Volume over time</CardTitle>
                <CardDescription>Daily inbound vs handled conversations</CardDescription>
              </CardHeader>
              <CardContent>
                {volumeData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={256}>
                    <AreaChart data={volumeData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="date" className="text-xs" tick={{ fontSize: 12 }} />
                      <YAxis className="text-xs" tick={{ fontSize: 12 }} allowDecimals={false} />
                      <Tooltip />
                      <Area type="monotone" dataKey="received" name="Received" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} strokeWidth={2} />
                      <Area type="monotone" dataKey="handled" name="Handled" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-64 items-center justify-center rounded-xl border border-dashed bg-muted/40 text-sm text-muted-foreground">
                    No data for this period
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Right column: category + response time */}
            <div className="grid gap-4">
              {/* Category breakdown donut */}
              <Card>
                <CardHeader>
                  <CardTitle>Category breakdown</CardTitle>
                  <CardDescription>Where support demand is coming from</CardDescription>
                </CardHeader>
                <CardContent>
                  {categoryData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="value"
                          nameKey="name"
                          label={false}
                          labelLine={false}
                        >
                          {categoryData.map((_, i) => (
                            <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend verticalAlign="bottom" height={24} />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex h-56 items-center justify-center rounded-xl border border-dashed bg-muted/40 text-sm text-muted-foreground">
                      No category data
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Response time trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Response time</CardTitle>
                  <CardDescription>Estimated median reply time (minutes)</CardDescription>
                </CardHeader>
                <CardContent>
                  {responseTimeData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart data={responseTimeData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="date" className="text-xs" tick={{ fontSize: 12 }} />
                        <YAxis className="text-xs" tick={{ fontSize: 12 }} allowDecimals={false} unit=" min" />
                        <Tooltip />
                        <Line type="monotone" dataKey="minutes" name="Avg response" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex h-56 items-center justify-center rounded-xl border border-dashed bg-muted/40 text-sm text-muted-foreground">
                      No response data
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

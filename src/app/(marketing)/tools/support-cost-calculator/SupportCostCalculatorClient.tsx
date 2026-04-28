"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function SupportCostCalculatorClient() {
  const KIM_MONTHLY_COST = 49;
  const [ordersPerMonth, setOrdersPerMonth] = useState(1200);
  const [emailsPerOrderRate, setEmailsPerOrderRate] = useState(15);
  const [hoursPerWeek, setHoursPerWeek] = useState(8);
  const [hourlyRate, setHourlyRate] = useState(30);

  const results = useMemo(() => {
    const estimatedEmailsPerMonth = Math.round(ordersPerMonth * (emailsPerOrderRate / 100));
    const monthlyHours = hoursPerWeek * 4.33;
    const monthlyCost = monthlyHours * hourlyRate;
    const yearlyCost = monthlyCost * 12;
    const monthlySavings = Math.max(monthlyCost - KIM_MONTHLY_COST, 0);
    const yearlySavings = Math.max(yearlyCost - KIM_MONTHLY_COST * 12, 0);

    return {
      estimatedEmailsPerMonth,
      monthlyHours,
      monthlyCost,
      yearlyCost,
      monthlySavings,
      yearlySavings,
    };
  }, [emailsPerOrderRate, hourlyRate, hoursPerWeek, ordersPerMonth]);

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="rounded-[2rem] border border-slate/10 dark:border-slate/20 bg-white dark:bg-[#20283A] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-ink">Orders per month</span>
            <input
              type="number"
              min={0}
              value={ordersPerMonth}
              onChange={(e) => setOrdersPerMonth(Number(e.target.value) || 0)}
              className="mt-2 w-full rounded-2xl border border-slate/15 bg-mist dark:bg-[#1B2436] px-4 py-3 text-ink focus:border-brass focus:bg-white dark:bg-[#20283A] dark:focus:bg-[#1B2436] focus:outline-none focus:ring-2 focus:ring-brass/30"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-ink">Support emails per order (%)</span>
            <input
              type="number"
              min={0}
              step="0.5"
              value={emailsPerOrderRate}
              onChange={(e) => setEmailsPerOrderRate(Number(e.target.value) || 0)}
              className="mt-2 w-full rounded-2xl border border-slate/15 bg-mist dark:bg-[#1B2436] px-4 py-3 text-ink focus:border-brass focus:bg-white dark:bg-[#20283A] dark:focus:bg-[#1B2436] focus:outline-none focus:ring-2 focus:ring-brass/30"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-ink">Hours spent on support per week</span>
            <input
              type="number"
              min={0}
              step="0.5"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value) || 0)}
              className="mt-2 w-full rounded-2xl border border-slate/15 bg-mist dark:bg-[#1B2436] px-4 py-3 text-ink focus:border-brass focus:bg-white dark:bg-[#20283A] dark:focus:bg-[#1B2436] focus:outline-none focus:ring-2 focus:ring-brass/30"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-ink">Hourly rate or VA cost ($)</span>
            <input
              type="number"
              min={0}
              step="1"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value) || 0)}
              className="mt-2 w-full rounded-2xl border border-slate/15 bg-mist dark:bg-[#1B2436] px-4 py-3 text-ink focus:border-brass focus:bg-white dark:bg-[#20283A] dark:focus:bg-[#1B2436] focus:outline-none focus:ring-2 focus:ring-brass/30"
            />
          </label>
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-brass/20 bg-[#FFF9F3] p-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate">Estimated volume</p>
          <p className="mt-3 text-3xl font-semibold text-ink">{results.estimatedEmailsPerMonth.toLocaleString()} support emails/month</p>
          <p className="mt-2 text-base leading-7 text-slate">
            Based on {emailsPerOrderRate}% of orders turning into support emails.
          </p>
        </div>
      </section>

      <aside className="rounded-[2rem] border border-brass/20 bg-white dark:bg-[#20283A] p-8 shadow-[0_8px_32px_rgba(176,141,87,0.12)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate">Your estimate</p>
        <div className="mt-5 space-y-5">
          <div>
            <p className="text-sm text-slate">Monthly support cost</p>
            <p className="text-4xl font-bold text-ink">${results.monthlyCost.toFixed(0)}</p>
          </div>
          <div>
            <p className="text-sm text-slate">Yearly support cost</p>
            <p className="text-3xl font-semibold text-ink">${results.yearlyCost.toFixed(0)}</p>
          </div>
          <div className="rounded-[1.5rem] bg-[#FFF4E8] p-5">
            <p className="text-sm text-slate">Compared with Regards Kim at ${KIM_MONTHLY_COST}/month</p>
            <p className="mt-2 text-2xl font-semibold text-ink">Save about ${results.monthlySavings.toFixed(0)}/month</p>
            <p className="mt-1 text-base text-slate">That is roughly ${results.yearlySavings.toFixed(0)}/year back in time or payroll.</p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate/10 dark:border-slate/20 pt-6 text-sm leading-7 text-slate">
          <p>
            This uses a simple estimate: weekly support hours × hourly cost × 4.33 weeks per month.
          </p>
          <p className="mt-3">
            Want the context behind the math? Read our guide to{" "}
            <Link href="/blog/true-cost-of-shopify-customer-support" className="font-medium text-brass hover:text-oxblood">
              the true cost of Shopify customer support
            </Link>
            .
          </p>
        </div>
      </aside>
    </div>
  );
}

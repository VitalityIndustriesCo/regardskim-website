"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const conditionOptions = [
  { id: "unworn", label: "Items must be unworn" },
  { id: "tags", label: "Original tags must be attached" },
  { id: "packaging", label: "Original packaging is required" },
  { id: "receipt", label: "Proof of purchase is required" },
  { id: "damaged", label: "Items must be free from damage caused after delivery" },
] as const;

const exceptionOptions = [
  { id: "sale", label: "Sale items" },
  { id: "custom", label: "Custom or personalised items" },
  { id: "gift-cards", label: "Gift cards" },
  { id: "final-sale", label: "Final sale items" },
  { id: "hygiene", label: "Hygiene-sensitive items" },
] as const;

const refundMethodLabels = {
  original: "original payment method",
  credit: "store credit",
  exchange: "an exchange or replacement",
} as const;

const shippingResponsibilityLabels = {
  customer: "the customer is responsible for return shipping costs",
  store: "the store covers return shipping costs",
} as const;

export default function ReturnPolicyGeneratorClient() {
  const [storeName, setStoreName] = useState("Your Store");
  const [returnWindow, setReturnWindow] = useState(30);
  const [refundMethod, setRefundMethod] = useState<keyof typeof refundMethodLabels>("original");
  const [shippingResponsibility, setShippingResponsibility] = useState<keyof typeof shippingResponsibilityLabels>("customer");
  const [conditions, setConditions] = useState<string[]>(["unworn", "tags"]);
  const [exceptions, setExceptions] = useState<string[]>(["sale", "custom"]);
  const [copied, setCopied] = useState(false);

  const selectedConditions = useMemo(
    () => conditionOptions.filter((option) => conditions.includes(option.id)).map((option) => option.label),
    [conditions],
  );

  const selectedExceptions = useMemo(
    () => exceptionOptions.filter((option) => exceptions.includes(option.id)).map((option) => option.label),
    [exceptions],
  );

  const policyText = useMemo(() => {
    const store = storeName.trim() || "Your Store";
    const conditionSentence =
      selectedConditions.length > 0
        ? `To be eligible, returned items should meet the following conditions: ${selectedConditions.join(", ")}.`
        : "To be eligible, returned items should be in resellable condition.";
    const exceptionSentence =
      selectedExceptions.length > 0
        ? `Please note that the following items are not eligible for return or refund: ${selectedExceptions.join(", ")}.`
        : "Please note that some product categories may be excluded from returns where stated on the product page.";

    return `${store} Return & Refund Policy

We want you to feel confident shopping with ${store}. If something is not quite right, you may request a return within ${returnWindow} days of delivery.

Eligibility
${conditionSentence}

How returns work
To start a return, please contact our support team with your order number and reason for return. Once approved, we will provide the next steps for sending the item back.

Refund method
Approved returns will be issued as ${refundMethodLabels[refundMethod]} once the returned item has been received and inspected.

Return shipping
For returns under this policy, ${shippingResponsibilityLabels[shippingResponsibility]} unless the item arrived damaged or incorrect.

Exceptions
${exceptionSentence}

Processing time
After the returned item is received, please allow a few business days for inspection and processing. We will email you once the refund, credit, or exchange has been confirmed.

Need help?
If you have any questions about a return, refund, or exchange, contact ${store} support and we will be happy to help.`;
  }, [conditions, exceptions, refundMethod, returnWindow, selectedConditions, selectedExceptions, shippingResponsibility, storeName]);

  const handleToggle = (value: string, current: string[], setter: (next: string[]) => void) => {
    setter(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
    setCopied(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(policyText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-[2rem] border border-slate/10 dark:border-slate/20 bg-white dark:bg-[#20283A] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-ink">Store name</span>
            <input
              type="text"
              value={storeName}
              onChange={(e) => {
                setStoreName(e.target.value);
                setCopied(false);
              }}
              className="mt-2 w-full rounded-2xl border border-slate/15 bg-mist dark:bg-[#1B2436] px-4 py-3 text-ink focus:border-brass focus:bg-white dark:bg-[#20283A] dark:focus:bg-[#1B2436] focus:outline-none focus:ring-2 focus:ring-brass/30"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-ink">Return window (days)</span>
            <input
              type="number"
              min={1}
              value={returnWindow}
              onChange={(e) => {
                setReturnWindow(Number(e.target.value) || 1);
                setCopied(false);
              }}
              className="mt-2 w-full rounded-2xl border border-slate/15 bg-mist dark:bg-[#1B2436] px-4 py-3 text-ink focus:border-brass focus:bg-white dark:bg-[#20283A] dark:focus:bg-[#1B2436] focus:outline-none focus:ring-2 focus:ring-brass/30"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-ink">Refund method</span>
            <select
              value={refundMethod}
              onChange={(e) => {
                setRefundMethod(e.target.value as keyof typeof refundMethodLabels);
                setCopied(false);
              }}
              className="mt-2 w-full rounded-2xl border border-slate/15 bg-mist dark:bg-[#1B2436] px-4 py-3 text-ink focus:border-brass focus:bg-white dark:bg-[#20283A] dark:focus:bg-[#1B2436] focus:outline-none focus:ring-2 focus:ring-brass/30"
            >
              <option value="original">Original payment</option>
              <option value="credit">Store credit</option>
              <option value="exchange">Exchange</option>
            </select>
          </label>

          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-ink">Shipping cost responsibility</span>
            <select
              value={shippingResponsibility}
              onChange={(e) => {
                setShippingResponsibility(e.target.value as keyof typeof shippingResponsibilityLabels);
                setCopied(false);
              }}
              className="mt-2 w-full rounded-2xl border border-slate/15 bg-mist dark:bg-[#1B2436] px-4 py-3 text-ink focus:border-brass focus:bg-white dark:bg-[#20283A] dark:focus:bg-[#1B2436] focus:outline-none focus:ring-2 focus:ring-brass/30"
            >
              <option value="customer">Customer pays return shipping</option>
              <option value="store">Store pays return shipping</option>
            </select>
          </label>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-ink">Return conditions</p>
            <div className="mt-3 space-y-3">
              {conditionOptions.map((option) => (
                <label key={option.id} className="flex items-start gap-3 rounded-2xl border border-slate/10 dark:border-slate/20 bg-mist/60 dark:bg-[#1B2436]/60 px-4 py-3 text-sm text-slate">
                  <input
                    type="checkbox"
                    checked={conditions.includes(option.id)}
                    onChange={() => handleToggle(option.id, conditions, setConditions)}
                    className="mt-1"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-ink">Exceptions</p>
            <div className="mt-3 space-y-3">
              {exceptionOptions.map((option) => (
                <label key={option.id} className="flex items-start gap-3 rounded-2xl border border-slate/10 dark:border-slate/20 bg-mist/60 dark:bg-[#1B2436]/60 px-4 py-3 text-sm text-slate">
                  <input
                    type="checkbox"
                    checked={exceptions.includes(option.id)}
                    onChange={() => handleToggle(option.id, exceptions, setExceptions)}
                    className="mt-1"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      <aside className="rounded-[2rem] border border-brass/20 bg-white dark:bg-[#20283A] p-8 shadow-[0_8px_32px_rgba(176,141,87,0.12)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate">Generated policy</p>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-full border border-brass/25 px-4 py-2 text-sm font-medium text-brass transition-colors hover:border-brass hover:text-oxblood"
          >
            {copied ? "Copied" : "Copy to clipboard"}
          </button>
        </div>

        <div className="mt-5 rounded-[1.5rem] bg-[#FFF4E8] p-5">
          <pre className="whitespace-pre-wrap font-sans text-base leading-7 text-ink">{policyText}</pre>
        </div>

        <div className="mt-6 border-t border-slate/10 dark:border-slate/20 pt-6">
          <Link href="/#install" className="text-sm font-semibold text-brass hover:text-oxblood">
            Regards Kim uses your policies to answer customer questions automatically →
          </Link>
        </div>
      </aside>
    </div>
  );
}

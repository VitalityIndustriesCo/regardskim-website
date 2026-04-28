"use client";

import Link from "next/link";
import { useState } from "react";

const templateCategories = [
  {
    title: "Shipping & Tracking",
    templates: [
      {
        title: "Tracking update delayed",
        body: "Hi [CUSTOMER_NAME],\n\nThanks for reaching out. I checked order [ORDER_NUMBER], and it is still in transit. The carrier has not posted the next tracking scan yet, but the parcel is still moving through the network.\n\nPlease allow another 1-2 business days for the next update. If tracking stays unchanged after that, reply here and we will help with the next step.\n\nBest,\n[YOUR_TEAM]",
      },
      {
        title: "Package marked delivered but missing",
        body: "Hi [CUSTOMER_NAME],\n\nThanks for letting us know. I am sorry the package is marked delivered but has not turned up yet.\n\nPlease check around the delivery area, with neighbours, and with anyone else at the address who may have accepted it. If it still does not appear by the end of the day, reply here and we will help you investigate further.\n\nKind regards,\n[YOUR_TEAM]",
      },
      {
        title: "Shipping confirmation sent",
        body: "Hi [CUSTOMER_NAME],\n\nGood news — your order [ORDER_NUMBER] has shipped. You can follow its progress here: [TRACKING_LINK].\n\nIf anything looks unusual with the tracking, just reply and we will help.\n\nBest,\n[YOUR_TEAM]",
      },
      {
        title: "Pre-shipment processing update",
        body: "Hi [CUSTOMER_NAME],\n\nThanks for checking in. Your order [ORDER_NUMBER] is still being prepared for shipment.\n\nAs soon as it leaves our warehouse, we will send the tracking details automatically. We appreciate your patience and will keep you posted.\n\nWarmly,\n[YOUR_TEAM]",
      },
    ],
  },
  {
    title: "Returns & Refunds",
    templates: [
      {
        title: "Return approved",
        body: "Hi [CUSTOMER_NAME],\n\nYour return request for order [ORDER_NUMBER] has been approved. Please send the item back to: [RETURN_ADDRESS].\n\nOnce the return arrives and is checked, we will process your [REFUND_METHOD] and email you a confirmation.\n\nBest,\n[YOUR_TEAM]",
      },
      {
        title: "Refund processed",
        body: "Hi [CUSTOMER_NAME],\n\nYour refund for order [ORDER_NUMBER] has now been processed to your [REFUND_METHOD].\n\nDepending on your payment provider, it may take a few business days to appear. If you do not see it after that, let us know and we will help.\n\nKind regards,\n[YOUR_TEAM]",
      },
      {
        title: "Return outside policy window",
        body: "Hi [CUSTOMER_NAME],\n\nThanks for reaching out. I checked the order details, and this request falls outside our stated return window of [RETURN_WINDOW] days.\n\nBecause of that, we are unable to approve a standard return on this order. If there is extra context we should know, feel free to reply and we will review it.\n\nRegards,\n[YOUR_TEAM]",
      },
      {
        title: "Awaiting returned item",
        body: "Hi [CUSTOMER_NAME],\n\nThanks for the update. We are currently waiting for the returned item from order [ORDER_NUMBER] to arrive back with us.\n\nAs soon as it is received and inspected, we will process the next step and confirm by email.\n\nBest,\n[YOUR_TEAM]",
      },
    ],
  },
  {
    title: "Order Changes",
    templates: [
      {
        title: "Address change confirmed",
        body: "Hi [CUSTOMER_NAME],\n\nWe have updated the shipping address for order [ORDER_NUMBER] to:\n[UPDATED_ADDRESS]\n\nIf anything else needs changing, let us know as soon as possible.\n\nBest,\n[YOUR_TEAM]",
      },
      {
        title: "Order already packed",
        body: "Hi [CUSTOMER_NAME],\n\nThanks for your message. We checked order [ORDER_NUMBER], and it has already moved too far through processing for us to make changes safely.\n\nOnce it arrives, we are happy to help with a return or exchange if needed.\n\nKind regards,\n[YOUR_TEAM]",
      },
      {
        title: "Item swap request",
        body: "Hi [CUSTOMER_NAME],\n\nWe have received your request to change the item on order [ORDER_NUMBER].\n\nWe are checking stock for [REQUESTED_ITEM] now. If it is available and the order has not shipped yet, we will update the order and confirm with you.\n\nBest,\n[YOUR_TEAM]",
      },
      {
        title: "Order cancellation confirmed",
        body: "Hi [CUSTOMER_NAME],\n\nYour order [ORDER_NUMBER] has been cancelled as requested. Any applicable refund will be processed back to your [REFUND_METHOD].\n\nPlease allow a few business days for the refund to appear, depending on your payment provider.\n\nBest regards,\n[YOUR_TEAM]",
      },
    ],
  },
  {
    title: "Out of Stock",
    templates: [
      {
        title: "Item unavailable after purchase",
        body: "Hi [CUSTOMER_NAME],\n\nI am sorry, but item [PRODUCT_NAME] from order [ORDER_NUMBER] is no longer available.\n\nWe can offer either a refund for that item or help you choose a replacement. Let us know which option you prefer and we will take care of it.\n\nKind regards,\n[YOUR_TEAM]",
      },
      {
        title: "Backorder update",
        body: "Hi [CUSTOMER_NAME],\n\nThanks for your patience. The item you ordered, [PRODUCT_NAME], is currently on backorder.\n\nOur latest estimate is [ETA]. If you prefer not to wait, we can also help with an alternative item or a refund.\n\nBest,\n[YOUR_TEAM]",
      },
      {
        title: "Restock notification reply",
        body: "Hi [CUSTOMER_NAME],\n\nThanks for your interest in [PRODUCT_NAME]. It is currently out of stock, but we expect to restock around [ETA].\n\nIf you would like, we can let you know once it is back or suggest a similar option in the meantime.\n\nWarmly,\n[YOUR_TEAM]",
      },
      {
        title: "Alternative product suggestion",
        body: "Hi [CUSTOMER_NAME],\n\nThe item you asked about, [PRODUCT_NAME], is currently unavailable. A close alternative we can recommend is [ALTERNATIVE_PRODUCT].\n\nIf you would like help choosing the best match, reply here and we will be glad to help.\n\nBest,\n[YOUR_TEAM]",
      },
    ],
  },
  {
    title: "Apologies & Compensation",
    templates: [
      {
        title: "Delay apology with resolution",
        body: "Hi [CUSTOMER_NAME],\n\nI am sorry for the delay with order [ORDER_NUMBER]. We know this was not the experience you expected.\n\nWe are actively looking into it and will keep you updated. As a small gesture, we would like to offer [COMPENSATION_DETAILS].\n\nKind regards,\n[YOUR_TEAM]",
      },
      {
        title: "Damaged item apology",
        body: "Hi [CUSTOMER_NAME],\n\nI am very sorry your order arrived damaged. That is not the standard we want to deliver.\n\nPlease reply with a photo of the item and packaging, and we will help with the fastest resolution, whether that is a replacement, refund, or another suitable option.\n\nSincerely,\n[YOUR_TEAM]",
      },
      {
        title: "Wrong item sent",
        body: "Hi [CUSTOMER_NAME],\n\nI am sorry we sent the wrong item in order [ORDER_NUMBER]. We understand how frustrating that is.\n\nPlease send us a photo of what arrived, and we will arrange the best next step right away.\n\nBest,\n[YOUR_TEAM]",
      },
      {
        title: "General apology with goodwill credit",
        body: "Hi [CUSTOMER_NAME],\n\nI am sorry for the trouble here. We appreciate you bringing this to our attention.\n\nTo make things a little easier, we would like to offer [STORE_CREDIT_OR_DISCOUNT] while we help resolve this properly.\n\nKind regards,\n[YOUR_TEAM]",
      },
    ],
  },
  {
    title: "Follow-ups",
    templates: [
      {
        title: "Checking if issue was resolved",
        body: "Hi [CUSTOMER_NAME],\n\nJust checking back in to see whether everything with order [ORDER_NUMBER] has now been resolved.\n\nIf you still need help, reply here and we will be happy to jump back in.\n\nBest,\n[YOUR_TEAM]",
      },
      {
        title: "Waiting on customer reply",
        body: "Hi [CUSTOMER_NAME],\n\nFollowing up on our last email in case you still need help with [ISSUE].\n\nIf you want to move ahead, just reply with the requested details and we will take it from there.\n\nKind regards,\n[YOUR_TEAM]",
      },
      {
        title: "Return received follow-up",
        body: "Hi [CUSTOMER_NAME],\n\nWe have now received your return for order [ORDER_NUMBER].\n\nOur team is processing it and we will confirm the refund or exchange as soon as everything is finalised.\n\nBest regards,\n[YOUR_TEAM]",
      },
      {
        title: "Post-resolution thank you",
        body: "Hi [CUSTOMER_NAME],\n\nThanks again for your patience while we worked through this with you. We appreciate the chance to make it right.\n\nIf there is anything else you need, we are always happy to help.\n\nWarmly,\n[YOUR_TEAM]",
      },
    ],
  },
] as const;

export default function CSEmailTemplatesClient() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (key: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="mt-12 space-y-8">
      {templateCategories.map((category) => (
        <section
          key={category.title}
          className="rounded-[2rem] border border-slate/10 bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Template library</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-ink">{category.title}</h2>
            </div>
            <p className="text-sm text-slate">{category.templates.length} ready-to-use templates</p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {category.templates.map((template) => {
              const key = `${category.title}-${template.title}`;
              return (
                <article key={key} className="rounded-[1.75rem] border border-slate/10 bg-mist/40 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl font-bold text-ink">{template.title}</h3>
                    <button
                      type="button"
                      onClick={() => handleCopy(key, template.body)}
                      className="rounded-full border border-brass/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-brass transition-colors hover:border-brass hover:text-oxblood"
                    >
                      {copiedKey === key ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <pre className="mt-5 whitespace-pre-wrap font-sans text-sm leading-7 text-slate">{template.body}</pre>
                </article>
              );
            })}
          </div>
        </section>
      ))}

      <div className="rounded-[1.75rem] border border-brass/20 bg-white p-8 text-center shadow-[0_8px_32px_rgba(176,141,87,0.12)]">
        <Link href="/#install" className="text-base font-semibold text-brass hover:text-oxblood">
          Stop copying templates. Let Regards Kim write replies that actually use your order data →
        </Link>
      </div>
    </div>
  );
}

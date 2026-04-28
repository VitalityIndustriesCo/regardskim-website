"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const tones = ["Friendly", "Professional", "Apologetic", "Firm"] as const;
const scenarios = ["Shipping Delay", "Refund Request", "Order Status", "Exchange", "General Inquiry"] as const;

type Tone = (typeof tones)[number];
type Scenario = (typeof scenarios)[number];

type TemplateMap = Record<Scenario, Record<Tone, string[]>>;

const templates: TemplateMap = {
  "Shipping Delay": {
    Friendly: [
      "Hi there,\n\nThanks for reaching out about your order. I took a look and it appears the shipment is running a little behind while the carrier processes the next scan. I know that is frustrating when you are waiting on a delivery.\n\nRight now, the best estimate is that tracking will update shortly and your order should keep moving soon. If you do not see movement within the next 1-2 business days, reply here and we will dig in further for you.\n\nThanks again for your patience,\n[Your Team]",
      "Hi,\n\nI checked on this for you and your order is still in transit, but the carrier has delayed the next tracking update. That usually means it is moving through the network a bit slower than expected rather than being lost.\n\nPlease keep an eye on the tracking over the next day or so. If it still does not update, send us a quick reply and we will help with the next step.\n\nWarmly,\n[Your Team]",
      "Hello,\n\nThanks for flagging this. I reviewed your order and can confirm the shipment is experiencing a carrier delay. I am sorry for the hold-up.\n\nWe expect another tracking event soon, and if that does not happen within 48 hours, we can look at escalation options for you.\n\nAppreciate your patience,\n[Your Team]",
      "Hi there,\n\nI just checked your order status and it looks like the parcel has been delayed in transit. I know waiting without a fresh update is never ideal.\n\nThe order is still on its way, and the next tracking scan should appear soon. If the tracking stays unchanged after the next 1-2 business days, let us know and we will step in.\n\nBest,\n[Your Team]",
    ],
    Professional: [
      "Hello,\n\nThank you for contacting us regarding your shipment. I reviewed the tracking status and can confirm there has been a transit delay with the carrier.\n\nAt this stage, the order is still moving through the carrier network, and we expect tracking to refresh once the next scan is completed. If there is no update within 1-2 business days, please reply and we will investigate further.\n\nKind regards,\n[Your Team]",
      "Hello,\n\nI have checked your order and it is currently delayed in transit. While this is not the experience we want for you, the parcel does still appear to be in the carrier system.\n\nWe recommend allowing a short additional window for the next tracking event. If no movement appears within 48 hours, we will be happy to assist with escalation.\n\nSincerely,\n[Your Team]",
      "Hi,\n\nThank you for your message. We reviewed the shipment and can see that delivery is taking longer than originally expected due to a carrier delay.\n\nPlease allow another 1-2 business days for tracking to update. If the shipment remains unchanged after that point, reply to this email and we will take the next step from our side.\n\nKind regards,\n[Your Team]",
      "Hello,\n\nWe appreciate you getting in touch. Your order is currently experiencing a shipping delay, and the carrier has not yet posted the next tracking scan.\n\nThe parcel still appears active in transit. If there is no movement within the next 48 hours, please let us know and we will investigate promptly.\n\nBest regards,\n[Your Team]",
    ],
    Apologetic: [
      "Hi,\n\nI am sorry your order has been delayed. I checked the shipment and can see the carrier has not posted a new tracking update yet. I know that is disappointing, especially when you were expecting it sooner.\n\nThe good news is that the parcel still appears to be in transit. Please give it another 1-2 business days for the next scan. If tracking still does not move, reply here and we will help right away.\n\nSincerely,\n[Your Team]",
      "Hello,\n\nI am really sorry about the delay on your order. I reviewed the tracking and it looks like the carrier is taking longer than expected to move it to the next step.\n\nYour shipment does still appear active, and we are hopeful the tracking will refresh soon. If nothing changes within 48 hours, we will be glad to step in and investigate further.\n\nKind regards,\n[Your Team]",
      "Hi there,\n\nSorry for the frustration here. I checked on your order and the delay is happening with the shipping carrier rather than your order processing.\n\nIt is still in the network, but the next update has not come through yet. If there is still no movement after 1-2 business days, please reply and we will take a closer look.\n\nBest,\n[Your Team]",
      "Hello,\n\nI am sorry this has taken longer than expected. We reviewed your shipment and can confirm there is a carrier delay affecting the next tracking scan.\n\nWe know that waiting without clarity is not ideal. Please allow a little more time for the carrier to update the tracking, and if it stays unchanged over the next 48 hours, we will help with the next step.\n\nWarm regards,\n[Your Team]",
    ],
    Firm: [
      "Hello,\n\nWe reviewed your order and confirmed that the shipment is delayed with the carrier. At this time, the package is still in transit and has not been marked lost.\n\nPlease allow 1-2 business days for the next tracking update. If there is still no movement after that window, reply to this email and we will investigate further.\n\nRegards,\n[Your Team]",
      "Hi,\n\nYour order has been checked and the delay is currently on the carrier side. The shipment remains active, but there has not yet been a new scan.\n\nThe next step is to allow a short additional window for tracking to refresh. If there is no update within 48 hours, contact us again and we will review escalation options.\n\nRegards,\n[Your Team]",
      "Hello,\n\nThank you for your email. The latest status shows a carrier delay, not a cancelled or lost shipment.\n\nFor now, please continue monitoring the tracking link for the next 1-2 business days. If no scan appears in that timeframe, reply here and we will assist further.\n\nRegards,\n[Your Team]",
      "Hi there,\n\nWe have checked the shipment and confirmed that delivery is delayed in transit. The package is still moving through the carrier network, even though tracking has not updated yet.\n\nPlease allow up to 48 hours for the next scan. If there is still no movement after that, let us know and we will take the next step.\n\nRegards,\n[Your Team]",
    ],
  },
  "Refund Request": {
    Friendly: [
      "Hi there,\n\nThanks for reaching out about a refund. We are happy to help with that.\n\nThe next step is to confirm the order details and make sure the item meets our return requirements. Once that is done, we can guide you through the return and refund process from there.\n\nIf you have already sent the item back, feel free to share the return tracking so we can keep an eye on it for you.\n\nBest,\n[Your Team]",
      "Hello,\n\nOf course — we can help with your refund request. We just need to review the order and confirm the item is eligible based on our return policy.\n\nOnce we have that confirmed, we will let you know the quickest next step. If the return is already on the way back to us, send over the tracking details and we will note that on the order.\n\nWarmly,\n[Your Team]",
      "Hi,\n\nThanks for getting in touch. We can absolutely point you in the right direction for a refund.\n\nPlease reply with your order number if it was not included, and let us know whether the item has been used or returned yet. From there, we can confirm eligibility and next steps.\n\nKind regards,\n[Your Team]",
      "Hello there,\n\nThanks for your message. We are happy to review your refund request.\n\nIf you can send through your order number and a quick note on the item condition, we will check the policy details and come back with the best next step as quickly as possible.\n\nBest wishes,\n[Your Team]",
    ],
    Professional: [
      "Hello,\n\nThank you for contacting us regarding a refund. We are happy to review the request.\n\nTo proceed, we will need to confirm the order details and ensure the item falls within the terms of our return policy. If the return has already been sent, please provide the tracking number so we can monitor its progress.\n\nKind regards,\n[Your Team]",
      "Hi,\n\nWe appreciate you reaching out. Your refund request can be reviewed once we verify the order number and return eligibility.\n\nIf the item has not yet been returned, we will guide you through the required steps. If it is already in transit back to us, please share the return tracking information for reference.\n\nSincerely,\n[Your Team]",
      "Hello,\n\nThank you for your message. We can assist with your refund request.\n\nThe next step is to review the order against our return policy, including the return window and item condition. Once confirmed, we will advise on how the refund will be processed.\n\nBest regards,\n[Your Team]",
      "Hello,\n\nWe have received your refund request and are happy to help. To move forward, please ensure we have your order number and any relevant details about the item condition or return status.\n\nOnce reviewed, we will confirm the available options and the next steps.\n\nKind regards,\n[Your Team]",
    ],
    Apologetic: [
      "Hi,\n\nI am sorry the order did not work out as hoped. We can help with your refund request.\n\nThe next step is for us to confirm the order details and check return eligibility under our policy. If the item has already been sent back, please share the tracking so we can watch for delivery and move things along.\n\nKind regards,\n[Your Team]",
      "Hello,\n\nI am sorry to hear you are needing a refund. We know that is not the ideal outcome, and we will do our best to make the process straightforward.\n\nPlease send over your order number if needed, along with the current status of the item, and we will confirm the next step as quickly as possible.\n\nWarm regards,\n[Your Team]",
      "Hi there,\n\nSorry for the disappointment here. We are happy to review your refund request and help you through the process.\n\nOnce we confirm the item is within the return guidelines, we will outline the next step clearly. If you have already mailed the item back, feel free to share the tracking details as well.\n\nBest,\n[Your Team]",
      "Hello,\n\nI am sorry this purchase was not the right fit. We can certainly help with the refund request.\n\nPlease reply with your order number and let us know whether the item has been returned or is still with you. We will review everything and come back with the right next step.\n\nSincerely,\n[Your Team]",
    ],
    Firm: [
      "Hello,\n\nWe received your refund request. Refund eligibility depends on the order details, timing, and item condition under our return policy.\n\nPlease provide the order number and confirm whether the item has been returned. Once reviewed, we will advise the next step.\n\nRegards,\n[Your Team]",
      "Hi,\n\nThank you for your message. We can review the refund request once we confirm the order information and return status.\n\nIf the item has already been sent back, please include the return tracking number. If not, we will outline the required return steps first.\n\nRegards,\n[Your Team]",
      "Hello,\n\nYour refund request has been noted. The next step is to verify the order and confirm that it meets our policy requirements for a refund.\n\nPlease send any missing order information so we can proceed.\n\nRegards,\n[Your Team]",
      "Hi there,\n\nWe are happy to review the request, but we first need to confirm the order details and whether the item is eligible under the return policy.\n\nReply with the order number and current item status, and we will take it from there.\n\nRegards,\n[Your Team]",
    ],
  },
  "Order Status": {
    Friendly: [
      "Hi there,\n\nThanks for checking in on your order. We are happy to help.\n\nYour order is currently being processed, and as soon as it ships you will receive a tracking email with the latest delivery details. If you already have a tracking number, feel free to send it over and we can help interpret the latest scan for you.\n\nBest,\n[Your Team]",
      "Hello,\n\nThanks for reaching out. I checked on your order and it is still moving through the normal process.\n\nOnce it ships, you will get a shipping confirmation with tracking. If you expected it sooner, reply with your order number and we can take a closer look for you.\n\nWarmly,\n[Your Team]",
      "Hi,\n\nHappy to help with your order status. Your order is currently in progress, and we will email you as soon as there is a shipping or tracking update to share.\n\nIf you want us to double-check anything specific, just send your order number and we will look into it.\n\nKind regards,\n[Your Team]",
      "Hello there,\n\nThanks for your message. Your order is on our radar, and we will keep you posted as soon as the next status update is available.\n\nIf you would like us to check the latest order stage manually, reply with the order number and we will help from there.\n\nBest wishes,\n[Your Team]",
    ],
    Professional: [
      "Hello,\n\nThank you for contacting us regarding your order status. Your order is currently in progress, and you will receive an email confirmation as soon as it ships.\n\nIf you would like a manual review, please reply with your order number and we will check the latest status for you.\n\nKind regards,\n[Your Team]",
      "Hi,\n\nWe appreciate you reaching out. At this stage, your order is still being processed through the normal workflow.\n\nOnce shipment is confirmed, tracking details will be sent automatically. If timing is a concern, please share your order number and we can review it more closely.\n\nSincerely,\n[Your Team]",
      "Hello,\n\nThank you for your message. We are happy to confirm the status of your order.\n\nIf the order has not yet shipped, you will receive a separate shipping confirmation email as soon as it does. If you need a more specific update, please send through the order number and we will check directly.\n\nBest regards,\n[Your Team]",
      "Hello,\n\nYour order status request has been received. The order is currently progressing through processing, and any shipment update will be sent automatically by email.\n\nPlease let us know if you would like us to review a specific order manually.\n\nKind regards,\n[Your Team]",
    ],
    Apologetic: [
      "Hi,\n\nI am sorry for any uncertainty around your order status. We know waiting for an update can be frustrating.\n\nYour order is currently still in progress, and we will send tracking as soon as it becomes available. If you want us to double-check it manually, reply with the order number and we will look into it right away.\n\nWarm regards,\n[Your Team]",
      "Hello,\n\nSorry for the lack of clarity here. We understand it is frustrating not to have a firm update yet.\n\nAt the moment, your order is still processing. As soon as it ships, you will receive a confirmation email with tracking details. If you need us to review the order sooner, just send the order number and we will help.\n\nBest,\n[Your Team]",
      "Hi there,\n\nI am sorry you have had to follow up for an update. Your order is still moving through the normal process, and tracking will be sent once it ships.\n\nIf timing is important on this order, reply with the order number and we will check it for you as soon as possible.\n\nSincerely,\n[Your Team]",
      "Hello,\n\nI am sorry for the wait on this. We know it is not ideal when you do not yet have a shipping update.\n\nYour order is still being processed, and we will email tracking once it is on the way. If you would like us to investigate the timing manually, feel free to send the order number.\n\nKind regards,\n[Your Team]",
    ],
    Firm: [
      "Hello,\n\nThank you for your message. Your order is currently still being processed.\n\nOnce shipment occurs, tracking details will be sent automatically by email. If you need a manual check, please reply with your order number.\n\nRegards,\n[Your Team]",
      "Hi,\n\nWe have received your order status request. At this time, the order has not yet shipped.\n\nYou will receive tracking automatically once it is available. If you would like us to confirm the latest internal status, send through the order number and we will review it.\n\nRegards,\n[Your Team]",
      "Hello,\n\nThe order is still in progress and has not yet reached the shipping stage.\n\nPlease monitor your email for the shipment confirmation. If a manual review is needed, reply with your order number.\n\nRegards,\n[Your Team]",
      "Hi there,\n\nYour order is currently being processed. Tracking information will be provided once the order ships.\n\nIf you need more detail before then, please send the order number so we can check further.\n\nRegards,\n[Your Team]",
    ],
  },
  Exchange: {
    Friendly: [
      "Hi there,\n\nThanks for reaching out about an exchange. We are happy to help you with that.\n\nIf the item is still in new condition and within our exchange window, the next step is usually to return the original item so we can arrange the replacement.\n\nIf you send over your order number and the size or item you would like instead, we can help confirm the best next step.\n\nBest,\n[Your Team]",
      "Hello,\n\nOf course — we can help with an exchange. Please let us know your order number and the item or size you would like to swap to, and we will confirm availability and the return steps.\n\nIf the original item has already been sent back, feel free to share the return tracking too.\n\nWarmly,\n[Your Team]",
      "Hi,\n\nThanks for your message. We are glad to help with an exchange request.\n\nReply with your order number and the replacement item details, and we will check what is possible from there.\n\nKind regards,\n[Your Team]",
      "Hello there,\n\nHappy to help with this exchange. Once we have your order number and the item you want instead, we can confirm the next step and help get it sorted smoothly.\n\nBest wishes,\n[Your Team]",
    ],
    Professional: [
      "Hello,\n\nThank you for contacting us regarding an exchange. We are happy to review the request.\n\nPlease provide your order number along with the item, size, or variant you would like in exchange. Once we confirm eligibility and availability, we will outline the next step.\n\nKind regards,\n[Your Team]",
      "Hi,\n\nWe appreciate you reaching out. Exchange requests can be processed once we verify the order details and confirm the replacement item availability.\n\nPlease send through the relevant order information and desired exchange item so we can assist further.\n\nSincerely,\n[Your Team]",
      "Hello,\n\nThank you for your message. To proceed with an exchange request, we will need your order number and the replacement item details.\n\nIf the original item has already been returned, please include the tracking information as well.\n\nBest regards,\n[Your Team]",
      "Hello,\n\nYour exchange request has been received. Once we confirm the order details, item condition, and replacement availability, we will advise on the appropriate next step.\n\nKind regards,\n[Your Team]",
    ],
    Apologetic: [
      "Hi,\n\nI am sorry the original item was not quite right. We are happy to help with an exchange.\n\nPlease send through your order number and the item or size you would prefer instead, and we will review the options for you as quickly as possible.\n\nWarm regards,\n[Your Team]",
      "Hello,\n\nSorry the first item did not work out. We can absolutely help with an exchange request.\n\nOnce we have your order number and replacement preference, we will confirm the next steps and any availability details.\n\nBest,\n[Your Team]",
      "Hi there,\n\nI am sorry for the inconvenience here. If you would like to exchange the item, please send over the order number and the replacement details, and we will help from there.\n\nIf you have already sent the original item back, feel free to include the return tracking as well.\n\nKind regards,\n[Your Team]",
      "Hello,\n\nI am sorry the item was not the right fit. We are happy to look at an exchange for you.\n\nReply with your order number and the alternative item or size you want, and we will confirm what is available and how to proceed.\n\nSincerely,\n[Your Team]",
    ],
    Firm: [
      "Hello,\n\nWe received your exchange request. To review it, please provide the order number and the replacement item details.\n\nOnce eligibility and stock availability are confirmed, we will advise the next step.\n\nRegards,\n[Your Team]",
      "Hi,\n\nThank you for your message. Exchanges depend on order eligibility, item condition, and availability of the replacement product.\n\nPlease reply with the required order and item details so we can proceed.\n\nRegards,\n[Your Team]",
      "Hello,\n\nYour exchange request has been noted. We first need the order number and the requested replacement item before we can confirm the next step.\n\nRegards,\n[Your Team]",
      "Hi there,\n\nWe are happy to review the exchange, but we need the relevant order information and replacement preference first.\n\nOnce received, we will confirm what is possible.\n\nRegards,\n[Your Team]",
    ],
  },
  "General Inquiry": {
    Friendly: [
      "Hi there,\n\nThanks for getting in touch. We are happy to help.\n\nWe have received your message and are reviewing the details now. If there is anything specific you want us to prioritise, feel free to reply with a little more context and we will take a closer look.\n\nBest,\n[Your Team]",
      "Hello,\n\nThanks for reaching out to us. We have your message and will make sure it gets the right follow-up.\n\nIf you have an order number or any extra details that may help, send them through and we will be glad to assist further.\n\nWarmly,\n[Your Team]",
      "Hi,\n\nThanks for your email. We are on it and will do our best to help with your question.\n\nIf you would like faster help, feel free to share any relevant order number, product name, or extra detail so we can look into it properly.\n\nKind regards,\n[Your Team]",
      "Hello there,\n\nWe appreciate you reaching out. Your message has come through, and we will review it as soon as possible.\n\nIf there is any key detail we should know, feel free to reply and add it in.\n\nBest wishes,\n[Your Team]",
    ],
    Professional: [
      "Hello,\n\nThank you for contacting us. We have received your message and are currently reviewing the details.\n\nIf there is an order number or any additional context that may help, please feel free to reply with that information.\n\nKind regards,\n[Your Team]",
      "Hi,\n\nWe appreciate your message. Our team is reviewing your inquiry and will provide the most relevant next step based on the details shared.\n\nIf available, please include any order number or product reference to help us assist more efficiently.\n\nSincerely,\n[Your Team]",
      "Hello,\n\nThank you for reaching out. Your inquiry has been received and is being reviewed.\n\nShould we need any further details, we will follow up. In the meantime, you are welcome to share any additional context that may be useful.\n\nBest regards,\n[Your Team]",
      "Hello,\n\nWe have received your message and are happy to assist. To help us respond as accurately as possible, feel free to include any related order, product, or account details in your reply.\n\nKind regards,\n[Your Team]",
    ],
    Apologetic: [
      "Hi,\n\nI am sorry for any trouble that led to your message. We have received your inquiry and will do our best to help.\n\nIf you can share any extra context, such as an order number or product details, that will help us look into it more quickly.\n\nWarm regards,\n[Your Team]",
      "Hello,\n\nI am sorry for any frustration here. Thank you for reaching out and giving us the chance to help.\n\nWe are reviewing your message now, and if you want to add any extra detail in the meantime, feel free to send it through.\n\nBest,\n[Your Team]",
      "Hi there,\n\nSorry for the inconvenience. We have your message and will review it carefully so we can point you in the right direction.\n\nIf there is an order number or specific issue we should focus on, please reply with that information as well.\n\nKind regards,\n[Your Team]",
      "Hello,\n\nI am sorry you have had to reach out about this. We appreciate the opportunity to help and are reviewing your message now.\n\nAny additional detail you can share will help us respond more accurately.\n\nSincerely,\n[Your Team]",
    ],
    Firm: [
      "Hello,\n\nThank you for your message. We have received your inquiry and are reviewing it.\n\nIf there is an order number or other relevant detail we should reference, please reply with that information.\n\nRegards,\n[Your Team]",
      "Hi,\n\nYour message has been received. We will review the details and follow up as needed.\n\nTo help us respond accurately, please provide any related order or product information if available.\n\nRegards,\n[Your Team]",
      "Hello,\n\nWe have your inquiry and will assess the next step based on the information provided.\n\nIf anything important was left out, please send it through in your reply.\n\nRegards,\n[Your Team]",
      "Hi there,\n\nThank you for contacting us. Your message is under review.\n\nIf additional details are needed, please reply with them so we can assist more effectively.\n\nRegards,\n[Your Team]",
    ],
  },
};

const scenarioHints: Record<Scenario, string> = {
  "Shipping Delay": "Best for late packages, stalled tracking, or carrier delays.",
  "Refund Request": "Useful when a customer wants money back or asks about eligibility.",
  "Order Status": "Ideal for where-is-my-order questions before or after shipping.",
  Exchange: "Great for size swaps, product swaps, or replacement item requests.",
  "General Inquiry": "Use when the customer question is broader or unclear.",
};

function extractCustomerName(email: string) {
  const greetingMatch = email.match(/hi\s+([A-Z][a-z]+)|hello\s+([A-Z][a-z]+)/i);
  return greetingMatch?.[1] || greetingMatch?.[2] || "there";
}

function extractOrderNumber(email: string) {
  const match = email.match(/#?[A-Z0-9-]{5,}/);
  return match?.[0] ?? null;
}

function customiseTemplate(template: string, customerEmail: string) {
  const customerName = extractCustomerName(customerEmail);
  const orderNumber = extractOrderNumber(customerEmail);

  let result = template.replace(/Hi there,/g, customerName === "there" ? "Hi there," : `Hi ${customerName},`);
  result = result.replace(/Hello there,/g, customerName === "there" ? "Hello there," : `Hello ${customerName},`);

  if (orderNumber) {
    result = result.replace(
      "I took a look and it appears the shipment is running a little behind while the carrier processes the next scan.",
      `I took a look at order ${orderNumber}, and it appears the shipment is running a little behind while the carrier processes the next scan.`,
    );
    result = result.replace(
      "I checked on this for you and your order is still in transit, but the carrier has delayed the next tracking update.",
      `I checked on order ${orderNumber} for you and it is still in transit, but the carrier has delayed the next tracking update.`,
    );
    result = result.replace("Please reply with your order number if it was not included,", "Thanks for including your order number. ");
    result = result.replace("Please send over your order number if needed,", "Thanks for sending your order number. ");
  }

  return result;
}

export default function AIEmailResponseGeneratorClient() {
  const [customerEmail, setCustomerEmail] = useState("");
  const [tone, setTone] = useState<Tone>("Friendly");
  const [scenario, setScenario] = useState<Scenario>("Shipping Delay");
  const [variationIndex, setVariationIndex] = useState(0);
  const [generatedResponse, setGeneratedResponse] = useState("");

  const templateCount = useMemo(() => templates[scenario][tone].length, [scenario, tone]);

  const handleGenerate = () => {
    const nextIndex = customerEmail.trim().length % templateCount;
    setVariationIndex(nextIndex);
    setGeneratedResponse(customiseTemplate(templates[scenario][tone][nextIndex], customerEmail));
  };

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-[2rem] border border-slate/10 dark:border-slate/20 bg-white dark:bg-[#20283A] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
        <div className="grid gap-6">
          <label className="block">
            <span className="text-sm font-medium text-ink">Paste the customer email</span>
            <textarea
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="Hi, my order still hasn't arrived and tracking hasn't moved for days..."
              rows={9}
              className="mt-2 w-full rounded-[1.5rem] border border-slate/15 bg-mist dark:bg-[#2A3347] dark:border-slate/40 dark:text-white px-4 py-3 text-ink placeholder:text-slate/50 focus:border-brass focus:bg-white dark:bg-[#20283A] dark:focus:bg-[#2A3347] focus:outline-none focus:ring-2 focus:ring-brass/30"
            />
          </label>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-ink">Tone</span>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as Tone)}
                className="mt-2 w-full rounded-2xl border border-slate/15 bg-mist dark:bg-[#2A3347] dark:border-slate/40 dark:text-white px-4 py-3 text-ink focus:border-brass focus:bg-white dark:bg-[#20283A] dark:focus:bg-[#2A3347] focus:outline-none focus:ring-2 focus:ring-brass/30"
              >
                {tones.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-ink">Scenario</span>
              <select
                value={scenario}
                onChange={(e) => setScenario(e.target.value as Scenario)}
                className="mt-2 w-full rounded-2xl border border-slate/15 bg-mist dark:bg-[#2A3347] dark:border-slate/40 dark:text-white px-4 py-3 text-ink focus:border-brass focus:bg-white dark:bg-[#20283A] dark:focus:bg-[#2A3347] focus:outline-none focus:ring-2 focus:ring-brass/30"
              >
                {scenarios.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="rounded-[1.5rem] border border-brass/20 bg-[#FFF9F3] dark:bg-[#2A2520] dark:text-white/80 p-5 text-sm leading-7 text-slate">
            <p className="font-medium text-ink">Tip</p>
            <p className="mt-1">{scenarioHints[scenario]}</p>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={!customerEmail.trim()}
            className="btn-primary inline-flex w-full justify-center disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            Generate Response
          </button>
        </div>
      </section>

      <aside className="rounded-[2rem] border border-brass/20 bg-white dark:bg-[#20283A] p-8 shadow-[0_8px_32px_rgba(176,141,87,0.12)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate">Generated reply</p>
        <div className="mt-5 rounded-[1.5rem] bg-[#FFF4E8] dark:bg-[#2A2520] dark:text-white/80 p-5">
          {generatedResponse ? (
            <pre className="whitespace-pre-wrap font-sans text-base leading-7 text-ink">{generatedResponse}</pre>
          ) : (
            <p className="text-base leading-7 text-slate">
              Choose a tone and scenario, then generate a ready-to-send customer support reply.
            </p>
          )}
        </div>

        <div className="mt-6 border-t border-slate/10 dark:border-slate/20 pt-6">
          <Link href="/#install" className="text-sm font-semibold text-brass hover:text-oxblood">
            Want this automated for every email? Try RegardsKim →
          </Link>
          {generatedResponse && (
            <p className="mt-3 text-xs text-slate/70">Variation {variationIndex + 1} of {templateCount}</p>
          )}
        </div>
      </aside>
    </div>
  );
}

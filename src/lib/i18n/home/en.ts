import type { HomeCopy } from "@/lib/i18n/types";

export const enHomeCopy = {
  locale: "en",
  metadata: {
    title: "Regards Kim - Answer Shopify Customer Emails Faster",
    description:
      "Regards Kim connects Shopify and Gmail, matches customer emails to real orders, and auto-drafts replies you can review, edit, and send.",
    ogLocale: "en_AU",
  },
  nav: {
    links: [
      { href: "/#how-it-works", label: "How it works" },
      { href: "/demo", label: "Demo" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/#compare", label: "Compare" },
      { href: "/security", label: "Security" },
      { href: "/#faq", label: "FAQ" },
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
    ],
    installCta: "Install on Shopify",
    menuLabel: "Menu",
    closeMenuLabel: "Close menu",
    openMenuLabel: "Open menu",
    toggleMenuLabel: "Toggle navigation menu",
    languageLabel: "Language",
  },
  hero: {
    title: "Answer Shopify customer emails faster.",
    badges: {
      shopify: "Built for Shopify",
      gmail: "Works with Gmail",
    },
    body:
      "Regards Kim connects Shopify and Gmail, matches customer emails to real orders, and auto-drafts replies you can review, edit, and send. Built for tracking questions, returns, refunds, exchanges, cancellations, and order updates.",
    primaryCta: "Install on Shopify",
    secondaryCta: "Watch the demo",
    workflowPoints: [
      "Keep Gmail as your inbox",
      "Shopify order context attached",
      "Auto-drafts from real store data",
      "Approve every reply",
    ],
    reassurance: "No auto-sending · No credit card · Billed through Shopify only if you stay",
  },
  howItWorks: {
    heading: "How Regards Kim answers with Shopify context",
    steps: [
      {
        number: "01",
        title: "Connect Gmail and Shopify",
        body:
          "Two minutes to connect. Regards Kim keeps Gmail as your support inbox and brings the work into a Shopify-aware queue.",
        image: "/images/how-it-works/step-1-inbox.png",
        alt:
          "Regards Kim inbox sorting customer emails: a tracking question, a return, an order change, and a newsletter marked no reply needed",
        width: 860,
        height: 728,
      },
      {
        number: "02",
        title: "Every support email gets matched to Shopify context",
        body:
          "Order, delivery status, tracking links, policy links, and customer details sit beside the conversation. No more copying between Gmail, Shopify, and tracking pages.",
        image: "/images/how-it-works/step-2-context.png",
        alt:
          "A customer email asking where their order is, automatically matched to Shopify order 1842 with fulfillment status, carrier, and tracking number",
        width: 1748,
        height: 530,
      },
      {
        number: "03",
        title: "AI drafts the reply before you open it",
        body:
          "As support emails come in, Regards Kim prepares replies grounded in the real order, tracking, policies, and saved replies. It never sends anything without your review.",
        video: {
          mp4: "/media/step3-loop.mp4",
          ariaLabel:
            "Regards Kim reads the matched Shopify order and prepares a friendly draft with the real tracking number, ready to review, edit, or send",
        },
      },
    ],
  },
  comparison: {
    eyebrow: "See the difference",
    heading: "Generic AI writes. Regards Kim checks Shopify first.",
    subheading: "Same customer question. Very different source of truth.",
    genericBadge: "One-size-fits-all",
    productBadge: "Built for ecommerce",
    genericTitle: "Generic AI email tools",
    productTitle: "Regards Kim",
    genericPoints: [
      "Built for every inbox, not ecommerce",
      "Can't access your order or tracking data",
      "Doesn't know your store policies",
      "Gives generic answers without support context",
      "No understanding of ecommerce support patterns",
    ],
    productPoints: [
      "Built specifically for Shopify stores",
      "Connects support conversations to orders, tracking, and products",
      "Uses your actual store policies and saved replies",
      "Auto-drafts Shopify-aware replies without a helpdesk migration",
      "Understands WISMO, returns, exchanges, order changes, and escalations",
    ],
    customerEmailLabel: "Customer email",
    customerEmail:
      "\"Hi, just checking on order #4721 — the tracking link hasn't updated in three days. Has it actually shipped?\"",
    genericReplyLabel: "Generic AI",
    genericReply:
      "Hi there, thanks for reaching out. I'm sorry for the confusion. Shipping updates can sometimes take a little longer than expected. Please keep an eye on your tracking link, and if it still doesn't update soon, contact the shipping carrier or reply here for further help.",
    productReplyLabel: "Regards Kim",
    draftedReplyLabel: "AI-drafted reply",
    replyToLabel: "To",
    replySubjectLabel: "Subject",
    replyRecipient: "Sarah M.",
    replySubject: "Re: Order #4721 - Shipping Update",
    productReplyParagraphs: [
      "Hey Sarah, thanks for checking in.",
      "I looked up order #4721 — it was dispatched from our warehouse on March 29 via Australia Post. Tracking is currently showing \"label created\", which means the carrier hasn't scanned it yet. This usually updates within 24-48 hours, but three days is longer than expected.",
      "I'll keep an eye on it from our side — if it hasn't moved by tomorrow afternoon, I'll follow up with the carrier directly and let you know.",
    ],
    trackingCta: "View tracking →",
    signoffLineOne: "Kind regards,",
    signoffName: "Kim",
  },
  proofBand: {
    eyebrow: "Early merchants",
    heading: "The first stores are already off inbox duty.",
    starsLabel: "5 out of 5 stars",
    reviews: [
      {
        quote:
          "We were spending hours every week digging through Gmail, Shopify orders, tracking pages and customer notes just to answer simple questions. Regards Kim pulls everything together and gives us a draft reply that's usually 90% there. It's cut our support workload dramatically without taking control away from our team.",
        name: "Sarah M.",
        store: "Marlo & Co",
      },
      {
        quote:
          "As a founder handling customer support myself, Regards Kim feels like having a support assistant sitting beside me. It quickly shows which emails actually need attention and saves me from constantly jumping between Shopify and Gmail. The time savings add up fast.",
        name: "James R.",
        store: "Cozie Co",
      },
      {
        quote:
          "We tested a few AI support tools and most wanted to automate replies completely. That wasn't something we were comfortable with. Regards Kim keeps us in control while doing all the heavy lifting behind the scenes. We reply faster, miss fewer emails and still know every message has been reviewed by a real person.",
        name: "Adam W.",
        store: "JOOSY Beverages",
      },
    ],
  },
  languages: {
    eyebrow: "Multilingual support",
    heading: "Reply in your customer's language.",
    body:
      "When a customer writes in another language, Regards Kim detects it and drafts the reply in that language for you to review, edit, and approve.",
    note:
      "The app interface is available in English, German, Spanish, French, Dutch, Danish, Swedish, Portuguese (Brazil), and Chinese (Simplified).",
    languageNames: [
      "English",
      "Deutsch",
      "Español",
      "Français",
      "Nederlands",
      "Dansk",
      "Svenska",
      "Português (BR)",
      "简体中文",
    ],
  },
  costAnchor: {
    heading: "What does support cost you right now?",
    body: "Support looks free when it hides inside founder hours. It is not.",
    options: [
      {
        title: "Your own time",
        cost: "$500+/mo",
        body:
          "Five hours a week of founder time on tracking lookups and copy-paste replies — the most expensive support agent your store will ever have.",
        highlight: false,
      },
      {
        title: "A part-time VA",
        cost: "$800+/mo",
        body:
          "Roughly 20 hours a week at typical VA rates — plus hiring, training, management, and time-zone gaps. Worth it eventually, but a big step while support is still mostly repetitive email.",
        highlight: false,
      },
      {
        title: "Regards Kim",
        cost: "$49/mo",
        body:
          "Gmail stays in place, Shopify context sits beside every email, and you still approve every send.",
        highlight: true,
      },
    ],
    cta: "Run your own numbers",
  },
  trustAndSafety: {
    eyebrow: "Trust first",
    heading: "AI help for Shopify emails, with humans in control.",
    body:
      "Regards Kim is designed for Shopify merchants who want faster email replies without handing customer conversations to an unsupervised bot or migrating into a helpdesk.",
    points: [
      {
        title: "No automatic sending",
        body: "Drafts are prepared for review. A human chooses what gets sent from Gmail.",
      },
      {
        title: "Built around Shopify context",
        body:
          "Replies are grounded in the customer email, Shopify order details, tracking, and your policies.",
      },
      {
        title: "Customer data stays protected",
        body:
          "Regards Kim uses customer communication data to run your support workflow, not to sell data or train general AI models.",
      },
      {
        title: "Safer than inbox guesswork",
        body:
          "The workflow keeps order facts, policy links, and human approval close to every customer reply.",
      },
    ],
    detailHeading: "Want the data details before installing?",
    detailBody:
      "Read the plain-language overview of Gmail access, Shopify permissions, AI use, and what Regards Kim does and does not do with customer communications.",
    detailCta: "Read Security & Data",
  },
  founderNote: {
    imageAlt: "Matt, founder of Regards Kim",
    eyebrow: "A note from the founder",
    quote:
      "I ran ecommerce stores for ten years. The best support person I ever worked with inspired Regards Kim: calm, clear, and able to turn an angry customer into a loyal one in two sentences. Regards Kim exists so every store owner gets that kind of support help.",
    attribution: "Matt · Founder, Regards Kim",
    link: "Read the whole story →",
  },
  pricing: {
    heading: "One plan for Shopify support emails.",
    body:
      "Regards Kim is for stores that need faster post-purchase replies, not a full helpdesk rollout. Keep Gmail, work from Shopify context, and approve every reply.",
    planName: "Regards Kim",
    price: "$49",
    period: "/month",
    rateBadge: "Early merchant rate — locked in for life",
    billingNote: "Billed monthly through your Shopify account",
    inclusions: [
      "Connects to your Shopify store and Gmail",
      "Sorts tracking, returns, order changes, sales, and escalations",
      "Shopify order, customer, delivery, tracking, and policy context in the inbox",
      "AI-drafted replies, saved replies, tracking links, and policy helpers",
      "Support analytics that show where the inbox pressure is coming from",
      "You keep the final say of every message sent from Gmail",
    ],
    cta: "Install on Shopify",
    reassurance: [
      "7-day free trial",
      "Billed through Shopify",
      "Cancel anytime",
      "No automatic customer replies",
    ],
    explainerHeading: "What you are paying for",
    explainerParagraphs: [
      "The expensive part of support is not the reply box. It is finding the order, checking tracking, remembering the policy, deciding what matters, and writing a clear customer response.",
      "Regards Kim removes that repeated searching and rewriting without forcing you into a helpdesk. Your existing Gmail workflow stays in place, and your team keeps control of every message that leaves the inbox.",
      "For a busy founder or small team, one saved hour a month is enough to justify the plan.",
    ],
    finalNote: "Start with a 7-day free trial. Keep it only if it makes support lighter.",
  },
  gettingStarted: {
    eyebrow: "Getting Started",
    heading: "Install from Shopify and get running in minutes",
    body:
      "Start by installing RegardsKim from the Shopify App Store, then connect Gmail and confirm your store policies so every draft has the right Shopify context.",
    steps: [
      { number: "01", title: "Install RegardsKim from the Shopify App Store" },
      { number: "02", title: "Connect your email" },
      { number: "03", title: "Confirm your store policies" },
      { number: "04", title: "Review Shopify-aware draft replies" },
    ],
  },
  faq: {
    heading: "FAQ",
    items: [
      {
        question: "What does Regards Kim do?",
        answer:
          "Regards Kim connects Shopify and Gmail, matches customer emails to real orders, and auto-drafts Shopify-aware replies you can review, edit, and send faster.",
      },
      {
        question: "Does Regards Kim send replies automatically?",
        answer:
          "No. You keep the final say of what leaves your inbox. Regards Kim helps organise the work, surface the right context, auto-draft or improve replies, and speed up sending from Gmail.",
      },
      {
        question: "Does Regards Kim replace our team?",
        answer:
          "No. It assists the person handling support. Regards Kim gathers Shopify context, sorts the inbox, and prepares AI drafts automatically so founders, VAs, or support teams can reply faster with better information.",
      },
      {
        question: "Is Regards Kim a helpdesk?",
        answer:
          "No. Regards Kim is for Shopify merchants who want faster support email replies without moving into a full helpdesk. It does not replace team ticketing, live chat, social inboxes, or phone support.",
      },
      {
        question: "Is it safe to use with customer emails?",
        answer:
          "Regards Kim is built around human approval and customer-data minimisation. It uses the email and Shopify context needed to help with support, but it does not send customer replies without you and does not sell customer communication data.",
      },
      {
        question: "What happens if an AI draft is wrong?",
        answer:
          "You review every draft before it is sent. If the wording is not right, edit it, improve it, use a saved reply, or write your own response. The product is designed to speed up support, not remove judgment.",
      },
      {
        question: "Do we have to move away from Gmail?",
        answer:
          "No. Regards Kim is built for Shopify merchants who already use Gmail for support. The goal is to keep your existing inbox workflow while adding Shopify context, triage, and automatic drafting help.",
      },
      {
        question: "What kinds of emails can Regards Kim help with?",
        answer:
          "It helps with tracking questions, returns, refunds, exchanges, cancellations, order changes, shipping address issues, product questions, complaints, and messages that need no reply.",
      },
      {
        question: "Is this a live chat widget?",
        answer:
          "No. Regards Kim works behind the scenes with your support email and Shopify admin, not as a chat bubble on your storefront.",
      },
      {
        question: "Does our agent have to be called Regards Kim?",
        answer:
          "Nope. You can change the sign-off name in your settings so replies go out under your brand or team name.",
      },
      {
        question: "Why do you need our store policies?",
        answer:
          "So the AI helper has the right guardrails. Your return window, shipping timeframes, exchange rules, and policy links help Regards Kim keep replies accurate instead of guessing.",
      },
      {
        question: "How much does it cost?",
        answer:
          "There is one plan: $49 per month, billed through Shopify. If it saves one support hour a month, it has likely paid for itself.",
      },
      {
        question: "Who is Regards Kim best for?",
        answer:
          "Shopify stores that have outgrown a messy Gmail inbox but do not want a full helpdesk yet. If support is stealing founder or operator time, Regards Kim is for you.",
      },
    ],
  },
  finalCta: {
    heading: "Keep Gmail. Work from Shopify. Approve every reply.",
    body:
      "Install free. If the first week does not make Shopify support emails faster to answer, walk away — no card, no lock-in.",
    cta: "Install free on Shopify",
    signoff: "Kind regards, Kim",
  },
  footer: {
    description:
      "AI email replies for Shopify support, drafted from real order data and reviewed by a human before sending.",
    subscribeHeading: "Stay in the loop",
    emailPlaceholder: "you@store.com",
    subscribeCta: "Subscribe",
    successMessage: "You're in! We'll keep you posted.",
    errorMessage: "Something went wrong — try again.",
    columns: [
      {
        title: "Get Started",
        links: [
          { href: "SHOPIFY_APP_STORE_INSTALL_URL", label: "Install on Shopify" },
          { href: "/#pricing", label: "Pricing" },
        ],
      },
      {
        title: "How It Works",
        links: [
          { href: "/#how-it-works", label: "How It Works" },
          { href: "/demo", label: "Demo" },
          { href: "/blog", label: "Blog" },
          { href: "/about", label: "About" },
          { href: "/#faq", label: "FAQ" },
        ],
      },
      {
        title: "Comparisons",
        links: [
          { href: "/compare/gorgias", label: "RegardsKim vs Gorgias" },
          { href: "/compare/zendesk", label: "RegardsKim vs Zendesk" },
          { href: "/compare/tidio", label: "RegardsKim vs Tidio" },
          { href: "/compare/reamaze", label: "RegardsKim vs Reamaze" },
          { href: "/compare/richpanel", label: "RegardsKim vs Richpanel" },
          { href: "/compare/freshdesk", label: "RegardsKim vs Freshdesk" },
          { href: "/compare/hiring-staff", label: "RegardsKim vs Hiring Staff" },
          { href: "/compare/va", label: "RegardsKim vs Hiring a VA" },
          { href: "/compare/diy", label: "RegardsKim vs Doing It Yourself" },
        ],
      },
      {
        title: "Free Tools",
        links: [
          { href: "/tools/ai-email-response-generator", label: "AI Email Response Generator" },
          { href: "/tools/return-policy-generator", label: "Return Policy Generator" },
          { href: "/tools/cs-email-templates", label: "CS Email Templates" },
          { href: "/tools/support-cost-calculator", label: "Support Cost Calculator" },
          { href: "/tools/ai-tone-rewriter", label: "AI Tone Rewriter" },
        ],
      },
    ],
    secondaryColumns: [
      {
        title: "Company",
        links: [
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/security", label: "Security & Data" },
          { href: "/terms", label: "Terms of Service" },
          { href: "/affiliate", label: "Affiliate Program" },
        ],
      },
      {
        title: "Resources",
        links: [
          { href: "/tools/support-cost-calculator", label: "Support Cost Calc" },
          { href: "/tools/cs-email-templates", label: "CS Email Templates" },
          { href: "/blog", label: "Blog" },
        ],
      },
    ],
    languageHeading: "Language",
    tagline: "Shopify support emails, drafted with order context.",
    signoff: "Kind regards, Kim",
    copyright: "© RegardsKim 2026. All rights reserved.",
  },
} satisfies HomeCopy;

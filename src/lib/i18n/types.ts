export const locales = ["de", "es", "fr", "nl", "da", "sv", "pt-br", "zh-cn"] as const;

export type Locale = (typeof locales)[number];
export type SupportedLanguageCode = "en" | Locale;

export const languageOptions: Array<{
  code: SupportedLanguageCode;
  label: string;
  href: string;
  htmlLang: string;
}> = [
  { code: "en", label: "English", href: "/", htmlLang: "en" },
  { code: "de", label: "Deutsch", href: "/de", htmlLang: "de" },
  { code: "es", label: "Español", href: "/es", htmlLang: "es" },
  { code: "fr", label: "Français", href: "/fr", htmlLang: "fr" },
  { code: "nl", label: "Nederlands", href: "/nl", htmlLang: "nl" },
  { code: "da", label: "Dansk", href: "/da", htmlLang: "da" },
  { code: "sv", label: "Svenska", href: "/sv", htmlLang: "sv" },
  { code: "pt-br", label: "Português (Brasil)", href: "/pt-br", htmlLang: "pt-BR" },
  { code: "zh-cn", label: "简体中文", href: "/zh-cn", htmlLang: "zh-CN" },
];

export type FAQCopyItem = {
  question: string;
  answer: string;
};

export type HomeCopy = {
  locale: SupportedLanguageCode;
  metadata: {
    title: string;
    description: string;
    ogLocale: string;
  };
  nav: {
    links: Array<{ href: string; label: string }>;
    installCta: string;
    menuLabel: string;
    closeMenuLabel: string;
    openMenuLabel: string;
    toggleMenuLabel: string;
    languageLabel: string;
  };
  hero: {
    title: string;
    badges: {
      shopify: string;
      gmail: string;
    };
    body: string;
    primaryCta: string;
    secondaryCta: string;
    workflowPoints: string[];
    reassurance: string;
  };
  howItWorks: {
    heading: string;
    steps: Array<{
      number: string;
      title: string;
      body: string;
      image?: string;
      alt?: string;
      width?: number;
      height?: number;
      video?: {
        mp4: string;
        ariaLabel: string;
      };
    }>;
  };
  comparison: {
    eyebrow: string;
    heading: string;
    subheading: string;
    genericBadge: string;
    productBadge: string;
    genericTitle: string;
    productTitle: string;
    genericPoints: string[];
    productPoints: string[];
    customerEmailLabel: string;
    customerEmail: string;
    genericReplyLabel: string;
    genericReply: string;
    productReplyLabel: string;
    draftedReplyLabel: string;
    replyToLabel: string;
    replySubjectLabel: string;
    replyRecipient: string;
    replySubject: string;
    productReplyParagraphs: string[];
    trackingCta: string;
    signoffLineOne: string;
    signoffName: string;
  };
  proofBand: {
    eyebrow: string;
    heading: string;
    starsLabel: string;
    reviews: Array<{
      quote: string;
      name: string;
      store: string;
    }>;
  };
  languages: {
    eyebrow: string;
    heading: string;
    body: string;
    note: string;
    languageNames: string[];
  };
  costAnchor: {
    heading: string;
    body: string;
    options: Array<{
      title: string;
      cost: string;
      body: string;
      highlight: boolean;
    }>;
    cta: string;
  };
  trustAndSafety: {
    eyebrow: string;
    heading: string;
    body: string;
    points: Array<{
      title: string;
      body: string;
    }>;
    detailHeading: string;
    detailBody: string;
    detailCta: string;
  };
  founderNote: {
    imageAlt: string;
    eyebrow: string;
    quote: string;
    attribution: string;
    link: string;
  };
  pricing: {
    heading: string;
    body: string;
    planName: string;
    price: string;
    period: string;
    rateBadge: string;
    billingNote: string;
    inclusions: string[];
    cta: string;
    reassurance: string[];
    explainerHeading: string;
    explainerParagraphs: string[];
    finalNote: string;
  };
  gettingStarted: {
    eyebrow: string;
    heading: string;
    body: string;
    steps: Array<{
      number: string;
      title: string;
    }>;
  };
  faq: {
    heading: string;
    items: FAQCopyItem[];
  };
  finalCta: {
    heading: string;
    body: string;
    cta: string;
    signoff: string;
  };
  footer: {
    description: string;
    subscribeHeading: string;
    emailPlaceholder: string;
    subscribeCta: string;
    successMessage: string;
    errorMessage: string;
    columns: Array<{
      title: string;
      links: Array<{ href: string; label: string }>;
    }>;
    secondaryColumns: Array<{
      title: string;
      links: Array<{ href: string; label: string }>;
    }>;
    languageHeading: string;
    tagline: string;
    signoff: string;
    copyright: string;
  };
};

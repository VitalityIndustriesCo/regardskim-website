import { enHomeCopy } from "@/lib/i18n/home/en";
import type { HomeCopy } from "@/lib/i18n/types";

export const deHomeCopy = {
  ...enHomeCopy,
  locale: "de",
  metadata: {
    title: "Regards Kim - Shopify-Supportantworten mit einem Klick",
    description:
      "Regards Kim sortiert Kunden-E-Mails und hängt die passende Shopify-Bestellung an. Klicke auf Antwort vorschlagen, prüfe den Entwurf und sende ihn aus Gmail.",
    ogLocale: "de_DE",
  },
  nav: {
    ...enHomeCopy.nav,
    links: [
      { href: "/#how-it-works", label: "So funktioniert es" },
      { href: "/demo", label: "Demo" },
      { href: "/#pricing", label: "Preise" },
      { href: "/#compare", label: "Vergleich" },
      { href: "/security", label: "Sicherheit" },
      { href: "/#faq", label: "FAQ" },
      { href: "/about", label: "Über uns" },
      { href: "/blog", label: "Blog" },
    ],
    installCta: "Auf Shopify installieren",
    menuLabel: "Menü",
    closeMenuLabel: "Menü schließen",
    openMenuLabel: "Menü öffnen",
    toggleMenuLabel: "Navigationsmenü umschalten",
    languageLabel: "Sprache",
  },
  hero: {
    ...enHomeCopy.hero,
    title: "Dein Support-Postfach, mit einem Klick beantwortet.",
    badges: { shopify: "Für Shopify gebaut", gmail: "Funktioniert mit Gmail" },
    body:
      "Regards Kim sortiert jede Kunden-E-Mail und hängt die passende Shopify-Bestellung an. Klicke auf Antwort vorschlagen und der Entwurf ist fertig. Du prüfst, bearbeitest und sendest aus Gmail.",
    primaryCta: "Auf Shopify installieren",
    secondaryCta: "Demo ansehen",
    workflowPoints: [
      "Regards Kim sortiert das Postfach",
      "Bestellkontext ist angehängt",
      "Antwort vorschlagen klicken",
      "Du prüfst und sendest",
    ],
    reassurance: "Kein automatisches Senden · Keine Kreditkarte · Abrechnung über Shopify nur, wenn du bleibst",
  },
  howItWorks: {
    heading: "So funktioniert es",
    steps: [
      {
        ...enHomeCopy.howItWorks.steps[0],
        title: "Gmail und Shopify verbinden",
        body:
          "Die Verbindung dauert zwei Minuten. Regards Kim sortiert Kunden-E-Mails nach Anliegen und filtert Müll heraus. Verkaufspitches, Benachrichtigungen und Bounces landen nicht in deiner Warteschlange.",
        alt:
          "Regards Kim sortiert Kunden-E-Mails im Postfach: Trackingfrage, Retoure, Bestelländerung und Newsletter als keine Antwort nötig markiert",
      },
      {
        ...enHomeCopy.howItWorks.steps[1],
        title: "Jede E-Mail kommt mit der passenden Bestellung",
        body:
          "Bestellung, Lieferstatus, Trackinglinks, Richtlinienlinks und Kundendetails stehen direkt neben der Unterhaltung. Kein Suchen mehr in zig Tabs.",
        alt:
          "Eine Kunden-E-Mail zur Bestellung wird automatisch Shopify-Bestellung 1842 mit Versandstatus, Paketdienst und Trackingnummer zugeordnet",
      },
      {
        ...enHomeCopy.howItWorks.steps[2],
        title: "Klicke auf Antwort vorschlagen und der Entwurf steht",
        body:
          "Ein Klick, und Regards Kim schreibt eine Antwort auf Basis der echten Bestellung. Kein Raten. Ohne deine Aufforderung wird nichts entworfen oder gesendet. Bearbeite den Text oder sende ihn direkt aus Gmail.",
        video: {
          ...enHomeCopy.howItWorks.steps[2].video!,
          ariaLabel:
            "Der Händler klickt auf Antwort vorschlagen, Regards Kim liest die zugeordnete Shopify-Bestellung und ein freundlicher Entwurf mit echter Trackingnummer wird zur Prüfung geschrieben",
        },
      },
    ],
  },
  comparison: {
    ...enHomeCopy.comparison,
    eyebrow: "Der Unterschied",
    heading: "Regards Kim kennt deinen Shop.",
    subheading: "Dieselbe Kundenfrage. Viel mehr Kontrolle.",
    genericBadge: "Einheitslösung",
    productBadge: "Für Ecommerce gebaut",
    genericTitle: "Allgemeine KI-E-Mail-Tools",
    genericPoints: [
      "Für jedes Postfach gebaut, nicht für Ecommerce",
      "Hat keinen Zugriff auf Bestell- oder Trackingdaten",
      "Kennt deine Shop-Richtlinien nicht",
      "Gibt generische Antworten ohne Supportkontext",
      "Versteht typische Ecommerce-Supportfälle nicht",
    ],
    productPoints: [
      "Speziell für Shopify-Shops gebaut",
      "Verknüpft Supportgespräche mit Bestellungen, Tracking und Produkten",
      "Nutzt deine echten Shop-Richtlinien und gespeicherten Antworten",
      "Entwirft Shopify-bewusste Antworten in deinem normalen Workflow",
      "Versteht WISMO, Retouren, Umtausch, Bestelländerungen und Eskalationen",
    ],
    customerEmailLabel: "Kunden-E-Mail",
    genericReplyLabel: "Generische KI",
    genericReply:
      "Hallo, danke für deine Nachricht. Es tut mir leid wegen der Verwirrung. Versandupdates können manchmal etwas länger dauern. Behalte den Trackinglink im Blick und melde dich wieder, wenn er sich weiterhin nicht aktualisiert.",
    draftedReplyLabel: "KI-entworfene Antwort",
    replyToLabel: "An",
    replySubjectLabel: "Betreff",
    replySubject: "Re: Bestellung #4721 - Versandupdate",
    productReplyParagraphs: [
      "Hey Sarah, danke fürs Nachfragen.",
      "Ich habe Bestellung #4721 geprüft. Sie wurde am 29. März per Australia Post aus unserem Lager versendet. Im Tracking steht aktuell \"label created\", das heißt, der Paketdienst hat sie noch nicht gescannt. Normalerweise aktualisiert sich das innerhalb von 24-48 Stunden, aber drei Tage sind länger als erwartet.",
      "Ich behalte es von unserer Seite im Blick. Wenn sich bis morgen Nachmittag nichts bewegt hat, frage ich direkt beim Paketdienst nach und gebe dir Bescheid.",
    ],
    trackingCta: "Tracking ansehen →",
    signoffLineOne: "Liebe Grüße,",
  },
  proofBand: {
    ...enHomeCopy.proofBand,
    eyebrow: "Erste Händler",
    heading: "Die ersten Shops sind schon raus aus dem Postfachstress.",
    starsLabel: "5 von 5 Sternen",
  },
  languages: {
    ...enHomeCopy.languages,
    eyebrow: "Mehrsprachiger Support",
    heading: "Antworte in der Sprache deiner Kunden.",
    body:
      "Wenn Kunden in einer anderen Sprache schreiben, erkennt Regards Kim die Sprache und entwirft die Antwort in dieser Sprache, damit du sie prüfen, bearbeiten und freigeben kannst.",
    note:
      "Die App-Oberfläche ist auf Englisch, Deutsch, Spanisch, Französisch, Niederländisch, Dänisch, Schwedisch, Portugiesisch (Brasilien) und Chinesisch (vereinfacht) verfügbar.",
    languageNames: ["English", "Deutsch", "Español", "Français", "Nederlands", "Dansk", "Svenska", "Português (BR)", "简体中文"],
  },
  costAnchor: {
    ...enHomeCopy.costAnchor,
    heading: "Was kostet dich Support gerade wirklich?",
    body: "Support wirkt kostenlos, wenn er in Gründerstunden verschwindet. Ist er aber nicht.",
    options: [
      {
        title: "Deine eigene Zeit",
        cost: "$500+/mo",
        body:
          "Fünf Stunden pro Woche für Trackingrecherche und Copy-Paste-Antworten. Das ist der teuerste Supportagent, den dein Shop je haben wird.",
        highlight: false,
      },
      {
        title: "Eine Teilzeit-VA",
        cost: "$800+/mo",
        body:
          "Rund 20 Stunden pro Woche zu typischen VA-Sätzen, plus Suche, Einarbeitung, Management und Zeitzonenlücken. Irgendwann sinnvoll, aber ein großer Schritt, solange Support vor allem repetitive E-Mail-Arbeit ist.",
        highlight: false,
      },
      {
        title: "Regards Kim",
        cost: "$49/mo",
        body:
          "Sortierung, Bestellkontext und Antwortentwürfe ab dem Moment der Verbindung. Regards Kim meldet sich nie krank, und du gibst weiterhin jede Antwort frei.",
        highlight: true,
      },
    ],
    cta: "Eigene Zahlen berechnen",
  },
  trustAndSafety: {
    ...enHomeCopy.trustAndSafety,
    eyebrow: "Vertrauen zuerst",
    heading: "KI-Hilfe für Kunden-E-Mails, mit Menschen in Kontrolle.",
    body:
      "Regards Kim ist für Shopify-Händler gebaut, die schneller antworten möchten, ohne Kundengespräche einem unbeaufsichtigten Bot zu überlassen.",
    points: [
      { title: "Kein automatisches Senden", body: "Entwürfe werden zur Prüfung vorbereitet. Ein Mensch entscheidet, was aus Gmail gesendet wird." },
      { title: "Auf Shopify-Kontext aufgebaut", body: "Antworten basieren auf Kunden-E-Mail, Shopify-Bestelldetails, Tracking und deinen Richtlinien." },
      { title: "Kundendaten bleiben geschützt", body: "Regards Kim nutzt Kommunikationsdaten für deinen Supportworkflow, nicht zum Verkauf von Daten oder Training allgemeiner KI-Modelle." },
      { title: "Sicherer als Raten im Postfach", body: "Der Workflow hält Bestellfakten, Richtlinienlinks und menschliche Freigabe nah an jeder Kundenantwort." },
    ],
    detailHeading: "Möchtest du vor der Installation die Datendetails sehen?",
    detailBody:
      "Lies die klare Übersicht zu Gmail-Zugriff, Shopify-Berechtigungen, KI-Nutzung und was Regards Kim mit Kundenkommunikation tut und nicht tut.",
    detailCta: "Sicherheit & Daten lesen",
  },
  founderNote: {
    ...enHomeCopy.founderNote,
    imageAlt: "Matt, Gründer von Regards Kim",
    eyebrow: "Eine Notiz vom Gründer",
    quote:
      "Ich habe zehn Jahre lang Ecommerce-Shops geführt. Die beste Supportperson, mit der ich je gearbeitet habe, inspirierte Regards Kim: ruhig, klar und in der Lage, einen verärgerten Kunden in zwei Sätzen loyal zu machen. Regards Kim existiert, damit jeder Shopbesitzer diese Art von Supporthilfe bekommt.",
    attribution: "Matt · Gründer, Regards Kim",
    link: "Die ganze Geschichte lesen →",
  },
  pricing: {
    ...enHomeCopy.pricing,
    heading: "Ein Plan. Ein Bruchteil deiner ersten Supportkraft.",
    body:
      "Eine Teilzeit-VA kostet etwa $800 im Monat. Deine eigene Zeit kostet mehr, als du denkst. Regards Kim kostet $49, arbeitet ab dem Moment der Verbindung und meldet sich nie krank.",
    period: "/Monat",
    rateBadge: "Früher Händlertarif - lebenslang gesichert",
    billingNote: "Monatliche Abrechnung über dein Shopify-Konto",
    inclusions: [
      "Verbindet deinen Shopify-Shop und Gmail",
      "KI-Supportkategorien für Tracking, Retouren, Bestelländerungen, Verkauf und Eskalationen",
      "Shopify-Bestell-, Kunden-, Liefer-, Tracking- und Richtlinienkontext im Postfach",
      "KI-Entwürfe, gespeicherte Antworten, Trackinglinks und Richtlinienhelfer",
      "Supportanalysen zeigen, wo der Druck im Postfach entsteht",
      "Du behältst das letzte Wort bei jeder aus Gmail gesendeten Nachricht",
    ],
    cta: "Auf Shopify installieren",
    reassurance: ["7 Tage kostenlos testen", "Abrechnung über Shopify", "Jederzeit kündbar", "Keine automatischen Kundenantworten"],
    explainerHeading: "Wofür du bezahlst",
    explainerParagraphs: [
      "Das Teure am Support ist nicht das Antwortfeld. Es ist die Bestellung zu finden, Tracking zu prüfen, Richtlinien zu erinnern, Wichtiges zu entscheiden und eine klare Kundenantwort zu schreiben.",
      "Regards Kim entfernt diese wiederholte Suche und Schreibarbeit. Dein bestehender Gmail-Workflow bleibt erhalten, und dein Team behält Kontrolle über jede Nachricht, die das Postfach verlässt.",
      "Für beschäftigte Gründer oder kleine Teams reicht eine gesparte Stunde pro Monat, damit sich der Plan lohnt.",
    ],
    finalNote: "Starte mit 7 Tagen kostenloser Testphase. Behalte es nur, wenn Support leichter wird.",
  },
  gettingStarted: {
    ...enHomeCopy.gettingStarted,
    eyebrow: "Loslegen",
    heading: "Aus Shopify installieren und in Minuten startklar sein",
    body:
      "Installiere RegardsKim aus dem Shopify App Store, verbinde dein Postfach und bestätige deine Shop-Richtlinien, damit die KI den richtigen Kontext hat.",
    steps: [
      { number: "01", title: "RegardsKim aus dem Shopify App Store installieren" },
      { number: "02", title: "E-Mail verbinden" },
      { number: "03", title: "Shop-Richtlinien bestätigen" },
      { number: "04", title: "Dein KI-Supportpostfach öffnen" },
    ],
  },
  faq: {
    heading: "FAQ",
    items: [
      { question: "Was macht Regards Kim?", answer: "Regards Kim verbindet sich mit deinem Shopify-Shop und Supportpostfach, sortiert Kunden-E-Mails in klare Supportkategorien, ordnet sie dem passenden Bestellkontext zu und entwirft Shopify-bewusste Antworten, die du schneller prüfen, bearbeiten und senden kannst." },
      { question: "Sendet Regards Kim Antworten automatisch?", answer: "Nein. Du behältst das letzte Wort darüber, was dein Postfach verlässt. Regards Kim hilft beim Organisieren, zeigt den richtigen Kontext, entwirft oder verbessert Antworten und beschleunigt das Senden aus Gmail." },
      { question: "Ersetzt Regards Kim unser Team?", answer: "Nein. Regards Kim unterstützt die Person, die Support bearbeitet. Regards Kim sammelt Kontext, sortiert das Postfach und bereitet Entwürfe vor, damit Gründer, VAs oder Supportteams schneller mit besseren Informationen antworten können." },
      { question: "Ist Regards Kim sicher für Kunden-E-Mails?", answer: "Regards Kim ist um menschliche Freigabe und Datensparsamkeit herum gebaut. Regards Kim nutzt E-Mail- und Shopify-Kontext, der für Support nötig ist, sendet aber keine Kundenantworten ohne dich und verkauft keine Kommunikationsdaten." },
      { question: "Was passiert, wenn ein KI-Entwurf falsch ist?", answer: "Du prüfst jeden Entwurf vor dem Senden. Wenn die Formulierung nicht passt, bearbeitest du sie, verbesserst sie, nutzt eine gespeicherte Antwort oder schreibst selbst. Das Produkt soll Support beschleunigen, nicht Urteilsvermögen entfernen." },
      { question: "Müssen wir Gmail verlassen?", answer: "Nein. Regards Kim ist für Shopify-Händler gebaut, die bereits Gmail für Support nutzen. Ziel ist, deinen bestehenden Postfachworkflow beizubehalten und Shopify-Kontext, Triage und Entwurfshilfe hinzuzufügen." },
      { question: "Bei welchen E-Mails hilft Regards Kim?", answer: "Regards Kim hilft bei Trackingfragen, Rückerstattungen und Umtausch, Bestelländerungen, Adressproblemen, Produktfragen, Verkaufsfragen, Beschwerden und Nachrichten, die keine Antwort brauchen." },
      { question: "Ist das ein Live-Chat-Widget?", answer: "Nein. Regards Kim arbeitet im Hintergrund mit deiner Support-E-Mail und Shopify-Admin, nicht als Chatblase im Storefront." },
      { question: "Muss unser Agent Regards Kim heißen?", answer: "Nein. Du kannst den Signatur-Namen in den Einstellungen ändern, damit Antworten unter deiner Marke oder deinem Teamnamen rausgehen." },
      { question: "Warum braucht Regards Kim unsere Shop-Richtlinien?", answer: "Damit die KI-Hilfe die richtigen Leitplanken hat. Rückgabefristen, Versandzeiten, Umtauschregeln und Richtlinienlinks helfen Regards Kim, präzise zu bleiben statt zu raten." },
      { question: "Was kostet es?", answer: "Es gibt einen Plan: $49 pro Monat, abgerechnet über Shopify. Wenn Regards Kim dir eine Supportstunde im Monat spart, hat es sich wahrscheinlich bezahlt gemacht." },
      { question: "Für wen ist Regards Kim am besten?", answer: "Für Shopify-Shops, die aus einem chaotischen Gmail-Postfach herausgewachsen sind, aber noch keinen schweren Helpdesk wollen. Wenn Support Gründerzeit frisst, ist Regards Kim für dich." },
    ],
  },
  finalCta: {
    heading: "Dein Postfach, erledigt.",
    body: "Kostenlos installieren. Wenn die erste Woche Support nicht leichter macht, gehst du einfach wieder. Keine Karte, keine Bindung.",
    cta: "Kostenlos auf Shopify installieren",
    signoff: "Liebe Grüße, Kim",
  },
  footer: {
    ...enHomeCopy.footer,
    description: "KI-gestützter Kundensupport für Shopify-Shops, bei dem jede Kundenantwort vor dem Senden von einem Menschen geprüft wird.",
    subscribeHeading: "Auf dem Laufenden bleiben",
    subscribeCta: "Abonnieren",
    successMessage: "Du bist dabei! Wir halten dich auf dem Laufenden.",
    errorMessage: "Etwas ist schiefgelaufen - bitte erneut versuchen.",
    languageHeading: "Sprache",
    tagline: "Dein Support-Postfach, unterstützt von KI.",
    signoff: "Liebe Grüße, Kim",
    copyright: "© RegardsKim 2026. Alle Rechte vorbehalten.",
  },
} satisfies HomeCopy;

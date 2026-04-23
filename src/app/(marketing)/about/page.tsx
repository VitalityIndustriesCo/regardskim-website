import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | RegardsKim",
  description:
    "The story behind RegardsKim — why we built it, who inspired it, and what we're working toward.",
};

export default function AboutPage() {
  return (
    <div
      className="min-h-screen paper-grain"
      style={{ backgroundColor: "#060B14", fontFamily: "var(--font-plus-jakarta)" }}
    >
      {/* Hero Image */}
      <div className="relative w-full overflow-hidden" style={{ maxHeight: "480px" }}>
        <Image
          src="/images/about-hero.jpg"
          alt="A neatly organised vintage office desk"
          width={1792}
          height={1024}
          className="w-full object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-2xl px-6 py-16">

        {/* Heading */}
        <h1
          className="font-display text-4xl font-bold leading-tight md:text-5xl"
          style={{ color: "#FFFFFF" }}
        >
          About Regards Kim
        </h1>

        <div
          className="mt-2 h-1 w-16 rounded-full"
          style={{ backgroundColor: "#B08D57" }}
        />

        {/* Body */}
        <div
          className="mt-10 space-y-6 text-base leading-8 md:text-lg"
          style={{ color: "#CBD5E1" }}
        >
          <p>
            I've been in ecommerce for over 10 years. Across every product, every niche, every
            stage of growth, one thing has always been true. Customer support is the hardest,
            most time-consuming, and most important part of running a store.
          </p>

          <p>
            Over the years I've worked with a lot of virtual assistants. Some great, some not so
            great. But every now and then you find someone who just gets it.
          </p>

          <p
            className="text-xl font-semibold md:text-2xl"
            style={{ color: "#FFFFFF" }}
          >
            Kim was one of those people.
          </p>

          <p>
            She had genuine pride in her work. She went above and beyond, treated every customer
            like she already knew them, and had an instinctive understanding of human behaviour
            that's almost impossible to teach. She could defuse a frustrated customer in two
            sentences. She made people feel heard. She turned complaints into loyalty.
          </p>

          <p>
            There's a real art to that. And for most small Shopify stores, that level of care is
            out of reach. Too expensive, too hard to find, too much to manage.
          </p>

          <p>
            I wanted to change that. I wanted every store owner to have their own Kim.
          </p>

          <p>
            Now, through the power of AI, that's possible.
          </p>

          {/* Product callout block */}
          <div
            className="rounded-2xl border p-6 md:p-8"
            style={{ backgroundColor: "#111827", borderColor: "#1E293B" }}
          >
            <p style={{ color: "#CBD5E1" }}>
              Regards Kim connects to your Gmail and Shopify store, reads your customer emails,
              pulls in the order and tracking context, and drafts the reply before you even open
              your inbox. You review, approve, and send. Nothing goes out without you.
            </p>
          </div>

          <p>
            It won't replace the art of being human. Yet.
          </p>

          <p>
            But right now, it handles the repetitive, time-consuming work so you can focus on
            the parts of your business that actually need you. And with every edit you make to
            a draft, Regards Kim learns. It adjusts to your tone, your store's voice, and the
            way you like to talk to your customers. The more you use it, the better it gets.
          </p>

          {/* Sign-off */}
          <div
            className="mt-10 border-t pt-8"
            style={{ borderColor: "#1E293B" }}
          >
            <p className="text-base italic" style={{ color: "#E2E8F0" }}>
              And Kim? She still works for me. She just doesn't answer customer emails anymore.
            </p>
            <p className="mt-6 font-semibold" style={{ color: "#FFFFFF" }}>
              Matt
            </p>
            <p className="text-sm" style={{ color: "#E2E8F0" }}>
              Founder, RegardsKim
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

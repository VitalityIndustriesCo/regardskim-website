import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | RegardsKim",
  description:
    "The story behind RegardsKim — why we built it, who inspired it, and what we're working toward.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Content */}
      <div className="mx-auto max-w-2xl px-6 py-16">

        {/* Heading */}
        <h1 className="font-display text-4xl font-bold leading-tight text-ink md:text-5xl">
          About Regards Kim
        </h1>

        <div className="mt-2 h-1 w-16 rounded-full bg-brass" />

        {/* Hero Image */}
        <div className="mt-8 overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.10)]">
          <Image
            src="/images/about-hero.jpg"
            alt="Abstract golden light on dark background"
            width={1536}
            height={1024}
            className="w-full object-cover"
            priority
          />
        </div>

        {/* Body */}
        <div className="mt-10 space-y-6 text-base leading-8 text-slate md:text-lg">
          <p>
            I&apos;ve been in ecommerce for over 10 years. Across every product, every niche, every
            stage of growth, one thing has always been true. Customer support is the hardest,
            most time-consuming, and most important part of running a store.
          </p>

          <p>
            Over the years I&apos;ve worked with a lot of virtual assistants. Some great, some not so
            great. But every now and then you find someone who just gets it.
          </p>

          <p className="text-xl font-semibold text-ink md:text-2xl">
            Kim was one of those people.
          </p>

          <p>
            She had genuine pride in her work. She went above and beyond, treated every customer
            like she already knew them, and had an instinctive understanding of human behaviour
            that&apos;s almost impossible to teach. She could defuse a frustrated customer in two
            sentences. She made people feel heard. She turned complaints into loyalty.
          </p>

          <p>
            There&apos;s a real art to that. And for most small Shopify stores, that level of care is
            out of reach. Too expensive, too hard to find, too much to manage.
          </p>

          <p>
            I wanted to change that. I wanted every store owner to have their own Kim.
          </p>

          <p>
            Now, the technology has caught up to the idea.
          </p>

          {/* Product callout block */}
          <div className="rounded-2xl border border-slate/15 bg-[#111827] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.25)] md:p-8">
            <p className="text-slate">
              Regards Kim connects to your Gmail and Shopify store, reads your customer emails,
              pulls in the order and tracking context, and drafts the reply before you even open
              your inbox. You review, approve, and send. Nothing goes out without you.
            </p>
          </div>

          <p>
            It won&apos;t replace the art of being human. Yet.
          </p>

          <p>
            But right now, it handles the repetitive, time-consuming work so you can focus on
            the parts of your business that actually need you. And with every edit you make to
            a draft, Regards Kim learns. It adjusts to your tone, your store&apos;s voice, and the
            way you like to talk to your customers. The more you use it, the better it gets.
          </p>

          {/* Sign-off */}
          <div className="mt-10 border-t border-slate/15 pt-8">
            <p className="text-base italic text-slate">
              And Kim? She still works for me. She just doesn&apos;t answer customer emails anymore, our app does.
            </p>
            <p className="mt-6 font-semibold text-ink">
              Matt
            </p>
            <p className="text-sm text-slate">
              Founder, RegardsKim
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

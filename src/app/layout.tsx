import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Regards Kim — Your inbox, handled.",
  description:
    "Regards Kim answers your customer emails so you don't have to. Tracking questions, returns, order updates — handled for $49/mo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <meta name="shopify-api-key" content="327e4daf19a338e5b04707172c2b39bc" />
      </head>
      <body className={cn("min-h-full font-sans", plusJakarta.className, geistMono.variable)}>
        <Script src="https://cdn.shopify.com/shopifycloud/app-bridge.js" strategy="beforeInteractive" />
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1609329553452333');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1609329553452333&ev=PageView&noscript=1" alt="" />`,
          }}
        />
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}

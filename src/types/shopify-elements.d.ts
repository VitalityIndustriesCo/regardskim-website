// Shopify App Bridge web components
// These are custom elements rendered by the App Bridge CDN script.
// See: https://shopify.dev/docs/api/app-home/app-bridge-web-components/app-nav

import "react";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "s-app-nav": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "s-link": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { href: string; rel?: string },
        HTMLElement
      >;
    }
  }
}

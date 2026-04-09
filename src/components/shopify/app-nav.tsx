export function ShopifyAppNav() {
  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `
          <s-app-nav>
            <s-link href="/" rel="home">Home</s-link>
            <s-link href="/inbox">Inbox</s-link>
            <s-link href="/settings">Setup</s-link>
            <s-link href="/billing">Subscription</s-link>
          </s-app-nav>
        `,
      }}
    />
  );
}

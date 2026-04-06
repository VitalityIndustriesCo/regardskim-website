import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";
import { SalesChatWidget } from "@/components/support/sales-chat-widget";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      {children}
      <Footer />
      <SalesChatWidget />
    </>
  );
}

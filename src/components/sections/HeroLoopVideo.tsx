export default function HeroLoopVideo() {
  return (
    <div className="relative mx-auto max-w-6xl">
      <div className="overflow-hidden rounded-[2rem] border border-[#E3D3C6] bg-[#FFF9F3] shadow-[0_22px_58px_rgba(35,53,71,0.30),0_6px_16px_rgba(35,53,71,0.14)] dark:border-slate/15 dark:bg-[#20283A]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Regards Kim demo: a customer email arrives, is matched to the Shopify order, a reply is drafted, and the merchant approves and sends it from Gmail."
          className="block w-full"
        >
          <source src="/media/hero-loop.webm" type="video/webm" />
          <source src="/media/hero-loop.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

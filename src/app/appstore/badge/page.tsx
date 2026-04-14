export default function AppStoreBadge() {
  return (
    <div className="flex h-[400px] w-[500px] flex-col items-center justify-center gap-6 bg-cream">
      {/* Regards Kim wordmark */}
      <div className="font-display text-[2.2rem] font-bold tracking-tight text-forest">
        Regards Kim
      </div>

      {/* Approve & Send button */}
      <button
        className="rounded-full bg-brass px-8 py-3.5 text-base font-semibold text-paper shadow-[0_8px_24px_rgba(232,93,58,0.30)] transition-none"
      >
        Approve &amp; Send ✓
      </button>
    </div>
  );
}

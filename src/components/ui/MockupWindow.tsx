import { ReactNode } from "react";

type MockupWindowProps = {
  children: ReactNode;
  title?: string;
  className?: string;
};

export default function MockupWindow({ children, title, className = "" }: MockupWindowProps) {
  return (
    <div
      className={`overflow-hidden rounded-3xl border border-forest/15 bg-paper shadow-[0_18px_42px_rgba(32,53,43,0.14)] ${className}`}
    >
      <div className="flex items-center justify-between border-b border-forest/10 bg-mist/70 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#EE6A5F]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#F4BD4F]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#61C554]" />
        </div>
        <p className="text-[11px] text-slate">{title ?? ""}</p>
        <span className="w-10" />
      </div>
      <div className="bg-paper">{children}</div>
    </div>
  );
}

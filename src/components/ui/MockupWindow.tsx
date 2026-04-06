import { ReactNode } from "react";

type MockupWindowProps = {
  children: ReactNode;
  title?: string;
  className?: string;
};

export default function MockupWindow({ children, title, className = "" }: MockupWindowProps) {
  return (
    <div
      className={`overflow-hidden rounded-[1.5rem] border border-forest/12 bg-paper shadow-[0_18px_42px_rgba(26,26,26,0.08)] sm:rounded-3xl ${className}`}
    >
      <div className="flex items-center justify-between border-b border-forest/10 bg-mist/70 px-3 py-2.5 sm:px-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#EE8A72]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E85D3A]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#F3C7B8]" />
        </div>
        <p className="truncate px-3 text-[11px] text-slate">{title ?? ""}</p>
        <span className="w-8 sm:w-10" />
      </div>
      <div className="bg-paper">{children}</div>
    </div>
  );
}

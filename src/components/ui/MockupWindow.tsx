import { ReactNode } from "react";

type MockupWindowProps = {
  children: ReactNode;
  title?: string;
  className?: string;
};

export default function MockupWindow({ children, title, className = "" }: MockupWindowProps) {
  return (
    <div
      className={`overflow-hidden rounded-[1.5rem] border border-slate/25 bg-cream shadow-[0_18px_42px_rgba(0,0,0,0.3)] sm:rounded-3xl ${className}`}
    >
      <div className="flex items-center justify-between border-b-2 border-[#D4AA60] bg-cream px-3 py-2.5 sm:px-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <p className="truncate px-3 text-[11px] text-slate">{title ?? ""}</p>
        <span className="w-8 sm:w-10" />
      </div>
      <div className="bg-cream">{children}</div>
    </div>
  );
}

import { ReactNode } from "react";

type MockupWindowProps = {
  children: ReactNode;
  title?: string;
  className?: string;
};

export default function MockupWindow({ children, title, className = "" }: MockupWindowProps) {
  return (
    <div
      className={`overflow-hidden rounded-[1.5rem] border border-slate/15 bg-[#111827] shadow-[0_8px_30px_rgba(0,0,0,0.30),0_2px_6px_rgba(0,0,0,0.15)] sm:rounded-3xl ${className}`}
    >
      {/* Browser-style titlebar — light grey like a real browser window */}
      <div className="flex items-center justify-between border-b border-slate/10 bg-[#0C1118] px-3 py-2.5 sm:px-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <p className="truncate px-3 text-xs font-semibold uppercase tracking-wider text-slate">{title ?? ""}</p>
        <span className="w-8 sm:w-10" />
      </div>
      {/* Content area */}
      <div className="bg-[#111827] p-3 sm:p-4">{children}</div>
    </div>
  );
}

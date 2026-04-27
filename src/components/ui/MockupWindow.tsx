import { ReactNode } from "react";

type MockupWindowProps = {
  children: ReactNode;
  title?: string;
  className?: string;
};

export default function MockupWindow({ children, title, className = "" }: MockupWindowProps) {
  return (
    <div
      className={`overflow-hidden rounded-[1.5rem] border border-slate/15 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.10),0_2px_6px_rgba(0,0,0,0.05)] dark:bg-[#1E2A3E] dark:shadow-[0_8px_30px_rgba(0,0,0,0.30)] sm:rounded-3xl ${className}`}
    >
      {/* Browser-style titlebar — light grey like a real browser window */}
      <div className="flex items-center justify-between border-b border-slate/10 bg-[#F1F3F4] px-3 py-2.5 dark:bg-[#151D2E] sm:px-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <p className="truncate px-3 text-xs font-semibold uppercase tracking-wider text-slate dark:text-white/70">{title ?? ""}</p>
        <span className="w-8 sm:w-10" />
      </div>
      {/* White content area */}
      <div className="bg-white p-3 sm:p-4 dark:bg-[#1E2A3E]">{children}</div>
    </div>
  );
}

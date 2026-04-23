import { ReactNode } from "react";

type MockupWindowProps = {
  children: ReactNode;
  title?: string;
  className?: string;
};

export default function MockupWindow({ children, title, className = "" }: MockupWindowProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_80px_rgba(176,141,87,0.06)] sm:rounded-3xl ${className}`}
    >
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-3 py-2 sm:px-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-gray-300" />
          <span className="h-2 w-2 rounded-full bg-gray-300" />
          <span className="h-2 w-2 rounded-full bg-gray-300" />
        </div>
        {title && <p className="truncate px-3 text-[11px] font-medium text-gray-400">{title}</p>}
        <span className="w-8 sm:w-10" />
      </div>
      <div>{children}</div>
    </div>
  );
}

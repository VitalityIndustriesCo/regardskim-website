import Image from "next/image";
import { cn } from "@/lib/utils";

type GmailLogoProps = {
  className?: string;
  imageClassName?: string;
  alt?: string;
};

export function GmailLogo({
  className,
  imageClassName,
  alt = "Gmail logo",
}: GmailLogoProps) {
  return (
    <span className={cn("inline-flex items-center justify-center", className)}>
      <Image
        src="/gmail-logo.png"
        alt={alt}
        width={20}
        height={20}
        className={cn("h-5 w-5 object-contain", imageClassName)}
      />
    </span>
  );
}

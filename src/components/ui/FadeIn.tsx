"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { sectionHeading } from "@/lib/animations";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={prefersReducedMotion ? undefined : sectionHeading}
      transition={prefersReducedMotion ? { duration: 0 } : { delay }}
      style={prefersReducedMotion ? { opacity: 1, transform: "none" } : undefined}
    >
      {children}
    </motion.div>
  );
}

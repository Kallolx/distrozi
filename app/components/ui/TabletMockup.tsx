"use client";

import { motion } from "framer-motion";
import BorderGlow from "@/components/BorderGlow";

interface TabletMockupProps {
  className?: string;
  children: React.ReactNode;
}

export function TabletMockup({ className = "", children }: TabletMockupProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <BorderGlow
          backgroundColor="#0a0a0a"
          borderRadius={24}
          className="w-full"
        >
          {/* The Screen */}
          <div className="relative aspect-square md:aspect-[16/10] overflow-hidden rounded-[0.8rem] md:rounded-[1.2rem] bg-[#050505] border border-white/5 m-1 sm:m-1.5">
            {children}

            {/* Glass Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/5 pointer-events-none z-20" />
          </div>
        </BorderGlow>
      </motion.div>
    </div>
  );
}

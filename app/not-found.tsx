"use client";

import Link from "next/link";
import { RiDiscLine, RiArrowRightLine, RiHome4Line } from "react-icons/ri";
import ServiceLayout from "./components/layout/ServiceLayout";
import Button from "./components/ui/Button";
import BorderGlow from "@/components/BorderGlow";

export default function NotFound() {
  return (
    <ServiceLayout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center relative z-10">
        <div className="max-w-md mx-auto flex flex-col items-center gap-6">
          
          {/* Glowing Vinyl Record Decoration */}
          <BorderGlow
            backgroundColor="#050505"
            borderRadius={50}
            glowColor="280 85% 55%"
            glowIntensity={0.6}
            className="h-28 w-28 flex items-center justify-center select-none"
            enableViewportActive={false}
          >
            <div className="h-full w-full flex items-center justify-center bg-black/40 rounded-full">
              <RiDiscLine
                size={54}
                className="text-indigo-400 animate-spin"
                style={{ animationDuration: "8s" }}
              />
            </div>
          </BorderGlow>

          {/* Error Code & Text */}
          <div className="flex flex-col gap-2">
            <h1 className="title-text text-4xl sm:text-5xl font-medium text-foreground leading-tight">
              Are you lost?
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-4">
            <Button as="a" href="/" variant="primary" size="md" className="w-full sm:w-auto flex items-center justify-center gap-2">
              <RiHome4Line size={16} />
              Return Home
            </Button>
          </div>
        </div>
      </div>
    </ServiceLayout>
  );
}

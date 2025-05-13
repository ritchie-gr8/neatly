"use client";

import React from "react";
import { cn } from "@/lib/utils";

export default function LoadingOverlay({ isLoading, message = "Loading..." }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-lg shadow-lg flex flex-col items-center">
        <div className="flex space-x-3 mb-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "w-3 h-3 bg-orange-500 rounded-full animate-bounce",
                i === 0 && "animation-delay-0",
                i === 1 && "animation-delay-100",
                i === 2 && "animation-delay-200"
              )}
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            ></div>
          ))}
        </div>
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  );
}

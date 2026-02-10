"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { pipelineData, feasibilityBadges } from "@/lib/constants";
import { ChevronRight, Check, Zap } from "lucide-react";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-teal-950/20 to-dark-bg pointer-events-none" />

      {/* Subtle Dubai skyline */}
      <div className="absolute bottom-0 left-0 right-0 h-[250px] pointer-events-none opacity-30">
        <Image
          src="/dubai-skyline.svg"
          alt=""
          fill
          className="object-cover object-bottom"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-dark-bg to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-text mb-6">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-teal-200/60 max-w-4xl mx-auto font-[family-name:var(--font-inter)]">
            UrbanBrik Sense&#8482; combines machine learning, large language
            models, and location intelligence into a living, continuously
            updated predictive engine.
          </p>
        </motion.div>

        {/* Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 lg:gap-0 items-stretch mb-16">
          {pipelineData.map((column, colIndex) => (
            <div key={column.title} className="contents">
              {/* Arrow connector (between columns on desktop) */}
              {colIndex > 0 && (
                <div className="hidden lg:flex items-center justify-center px-4">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + colIndex * 0.2 }}
                  >
                    <ChevronRight className="w-8 h-8 text-teal-400/50" />
                  </motion.div>
                </div>
              )}

              {/* Mobile arrow (between stacked cards) */}
              {colIndex > 0 && (
                <div className="flex lg:hidden items-center justify-center py-2">
                  <ChevronRight className="w-8 h-8 text-teal-400/50 rotate-90" />
                </div>
              )}

              {/* Column Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: colIndex * 0.15 }}
                className={`glass-card p-8 transition-all duration-300 ${
                  column.color === "blue"
                    ? "border-blue-500/30 animate-pulse-glow"
                    : ""
                }`}
              >
                {/* Column Header */}
                <div className={`flex items-center gap-3 mb-6 ${column.color === "blue" ? "justify-center" : ""}`}>
                  {column.color === "blue" && (
                    <Zap className="w-6 h-6 text-blue-400" />
                  )}
                  <h3
                    className={`font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold tracking-wide ${
                      column.color === "blue"
                        ? "text-blue-400"
                        : "text-teal-400"
                    }`}
                  >
                    {column.title}
                  </h3>
                </div>

                {/* Items */}
                <ul className="space-y-3">
                  {column.items.map((item) => (
                    <li key={item} className={`flex items-center gap-3 ${column.color === "blue" ? "justify-center" : ""}`}>
                      <div
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          column.color === "blue"
                            ? "bg-blue-400"
                            : "bg-teal-400"
                        }`}
                      />
                      <span className="text-teal-200/70 text-base md:text-lg font-[family-name:var(--font-inter)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Feasibility Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4"
        >
          {feasibilityBadges.map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-teal-400/30 bg-teal-500/5 hover:bg-teal-500/10 hover:border-teal-400/50 transition-all duration-300"
            >
              <Check className="w-4 h-4 text-teal-400" />
              <span className="text-sm md:text-base font-medium text-teal-300 font-[family-name:var(--font-inter)]">
                {badge}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

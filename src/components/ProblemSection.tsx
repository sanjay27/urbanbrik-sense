"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { problemCards } from "@/lib/constants";

export default function ProblemSection() {
  return (
    <section id="problem" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-teal-950/20 to-dark-bg pointer-events-none" />

      {/* Subtle Dubai skyline in background */}
      <div className="absolute bottom-0 left-0 right-0 h-[300px] pointer-events-none opacity-40">
        <Image
          src="/dubai-skyline.svg"
          alt=""
          fill
          className="object-cover object-bottom"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-bg to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-text mb-6">
            The Problem
          </h2>
          <p className="text-lg md:text-xl text-teal-200/60 max-w-3xl mx-auto font-[family-name:var(--font-inter)]">
            Real estate decisions today are slow, unclear, and heavily
            guesswork-driven.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {problemCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card p-8 transition-all duration-300 group ${
                index >= 3 ? "lg:col-span-1 lg:mx-auto lg:w-full" : ""
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500/20 to-blue-500/20 border border-teal-400/20 flex items-center justify-center mb-6 group-hover:from-teal-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                <card.icon className="w-7 h-7 text-teal-400 group-hover:text-teal-300 transition-colors" />
              </div>
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl md:text-2xl font-semibold text-teal-100 mb-3">
                {card.title}
              </h3>
              <p className="text-teal-200/50 text-base md:text-lg leading-relaxed font-[family-name:var(--font-inter)]">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

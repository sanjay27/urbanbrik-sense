"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  TrendingUp,
  Brain,
  MapPin,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* ── Cinematic Background Layers ── */}
      <div className="absolute inset-0">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#0a0a1a] to-dark-bg" />

        {/* Atmospheric glow — top center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full bg-teal-500/8 blur-[160px]" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-blue-500/6 blur-[140px]" />

        {/* Side accent glows */}
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-teal-600/5 blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[120px]" />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-40" />

        {/* Dubai Skyline SVG — bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none">
          <Image
            src="/hero-skyline.svg"
            alt=""
            fill
            className="object-cover object-bottom"
            priority
          />
        </div>

        {/* Gradient fade over skyline bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg to-transparent" />

        {/* Horizon glow line */}
        <div className="absolute bottom-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent" />
        <div className="absolute bottom-[30%] left-0 right-0 h-16 bg-gradient-to-t from-transparent via-teal-500/3 to-transparent" />
      </div>

      {/* ── Floating Particles ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-teal-400/30"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* ── Left Column: Text Content ── */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-400/20 text-teal-300 text-sm font-medium tracking-wide mb-6">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  Founded by Riya Jadhav
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="font-[family-name:var(--font-space-grotesk)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mt-4"
              >
                <span className="gradient-text animate-shimmer">
                  UrbanBrik
                </span>
                <br className="hidden sm:block" />{" "}
                <span className="gradient-text-blue">Sense</span>
                <span className="text-blue-400 text-2xl md:text-3xl align-super">
                  &#8482;
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-6 md:mt-8 text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-semibold text-teal-200/90 max-w-2xl mx-auto lg:mx-0"
              >
                AI-Powered Rental, Sentiment &amp; Investment Intelligence
                Engine
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65 }}
                className="mt-4 text-base md:text-lg lg:text-xl text-teal-300/50 max-w-xl mx-auto lg:mx-0 font-[family-name:var(--font-inter)] leading-relaxed"
              >
                A living predictive model replacing guesswork with clarity for
                smarter real estate decisions across the UAE.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-10 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
              >
                <a
                  href="#value"
                  className="group w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 text-white text-base md:text-lg font-semibold hover:from-blue-400 hover:to-teal-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105 active:scale-95 transition-all duration-200 tracking-wide flex items-center justify-center gap-2"
                >
                  Explore the Platform
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-teal-400/30 text-teal-300 text-base md:text-lg font-semibold hover:border-teal-400/60 hover:bg-teal-400/5 transform hover:scale-105 active:scale-95 transition-all duration-200 tracking-wide text-center"
                >
                  Get in Touch
                </a>
              </motion.div>
            </div>

            {/* ── Right Column: Problem → Solution Visual ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="lg:col-span-5 hidden lg:block"
            >
              <div className="relative">
                {/* Glow backdrop */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-3xl blur-xl" />

                {/* Card container */}
                <div className="relative space-y-4">
                  {/* Problem Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="glass-card p-6 border-red-500/10 hover:border-red-500/20"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-red-400/80" />
                      </div>
                      <span className="text-sm font-semibold text-red-400/70 uppercase tracking-wider font-[family-name:var(--font-space-grotesk)]">
                        The Problem
                      </span>
                    </div>
                    <p className="text-teal-200/40 text-sm leading-relaxed font-[family-name:var(--font-inter)]">
                      Slow decisions, fragmented data, guesswork-driven
                      valuations costing billions in missed opportunities.
                    </p>
                  </motion.div>

                  {/* Arrow indicator */}
                  <div className="flex justify-center">
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-8 h-8 rounded-full bg-gradient-to-b from-red-500/10 to-teal-500/10 border border-white/5 flex items-center justify-center"
                    >
                      <ArrowRight className="w-4 h-4 text-teal-400/60 rotate-90" />
                    </motion.div>
                  </div>

                  {/* Solution Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="glass-card p-6 border-blue-500/30 hover:border-blue-400/40 animate-pulse-glow"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-400/20 flex items-center justify-center">
                        <Brain className="w-5 h-5 text-teal-400" />
                      </div>
                      <span className="text-sm font-semibold text-teal-400 uppercase tracking-wider font-[family-name:var(--font-space-grotesk)]">
                        The Solution
                      </span>
                    </div>
                    <p className="text-teal-200/50 text-sm leading-relaxed font-[family-name:var(--font-inter)]">
                      AI-powered predictive intelligence combining ML, LLMs, and
                      location data for real-time market clarity.
                    </p>
                  </motion.div>

                  {/* Stat Badges */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="grid grid-cols-3 gap-3 pt-2"
                  >
                    {[
                      {
                        icon: TrendingUp,
                        label: "Yield Boost",
                        value: "+12-18%",
                      },
                      {
                        icon: MapPin,
                        label: "UAE Coverage",
                        value: "100%",
                      },
                      {
                        icon: Brain,
                        label: "AI Accuracy",
                        value: "94%+",
                      },
                    ].map((stat, i) => (
                      <div
                        key={stat.label}
                        className="glass-card p-3 text-center hover:border-teal-400/20"
                      >
                        <stat.icon className="w-4 h-4 text-blue-400 mx-auto mb-1.5" />
                        <p className="text-lg font-bold text-teal-100 font-[family-name:var(--font-space-grotesk)]">
                          {stat.value}
                        </p>
                        <p className="text-[11px] text-teal-200/40 font-[family-name:var(--font-inter)]">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="relative z-10 pb-8 flex justify-center"
      >
        <div className="w-6 h-10 rounded-full border-2 border-teal-400/20 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 rounded-full bg-teal-400/60"
          />
        </div>
      </motion.div>
    </section>
  );
}

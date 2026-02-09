"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main teal blob */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[120px] animate-float" />
        {/* Blue accent blob */}
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[120px] animate-float"
          style={{ animationDelay: "3s" }}
        />
        {/* Large subtle center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal-600/5 blur-[150px]" />
        {/* Extra floating orb */}
        <div
          className="absolute top-1/3 right-1/3 w-[300px] h-[300px] rounded-full bg-blue-400/5 blur-[100px] animate-float-slow"
          style={{ animationDelay: "1.5s" }}
        />
        {/* Rotating gradient ring (very subtle) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-teal-500/5 animate-rotate-slow" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Glassmorphism hero card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hero-glass p-8 md:p-12 lg:p-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-teal-400/60 text-sm md:text-base tracking-widest uppercase mb-6 font-[family-name:var(--font-inter)]">
              Presented by Riya Jadhav
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="font-[family-name:var(--font-space-grotesk)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]"
          >
            <span className="gradient-text animate-shimmer">UrbanBrik</span>{" "}
            <span className="gradient-text-blue">Sense</span>
            <span className="text-blue-400 text-2xl md:text-3xl align-super">
              &#8482;
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="mt-6 md:mt-8 text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-semibold text-teal-200/90 max-w-3xl mx-auto"
          >
            AI-Powered Rental, Sentiment &amp; Investment Intelligence Engine
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
            className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl text-teal-300/60 max-w-2xl mx-auto font-[family-name:var(--font-inter)]"
          >
            A living predictive model for smarter real estate decisions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#value"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 text-white text-base md:text-lg font-semibold hover:from-blue-400 hover:to-teal-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105 active:scale-95 transition-all duration-200 tracking-wide"
            >
              Explore the Platform
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-teal-400/50 text-teal-300 text-base md:text-lg font-semibold hover:border-teal-400 hover:bg-teal-400/10 transform hover:scale-105 active:scale-95 transition-all duration-200 tracking-wide"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16 md:mt-20"
        >
          <div className="w-6 h-10 rounded-full border-2 border-teal-400/30 mx-auto flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-teal-400"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

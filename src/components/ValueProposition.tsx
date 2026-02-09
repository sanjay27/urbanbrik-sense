"use client";

import { motion } from "framer-motion";
import { coreSignals, benefitCards } from "@/lib/constants";
import { Sparkles } from "lucide-react";

export default function ValueProposition() {
  return (
    <section id="value" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-teal-950/30 to-dark-bg pointer-events-none" />

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
            Our Value Proposition
          </h2>
          <p className="text-lg md:text-xl text-teal-200/60 max-w-3xl mx-auto italic font-[family-name:var(--font-inter)]">
            &ldquo;Delivering clarity, speed, and accuracy in a way that
            transforms real estate outcomes for everyone.&rdquo;
          </p>
        </motion.div>

        {/* Signal Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          {/* Signal Pills */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
            {coreSignals.map((signal, index) => (
              <motion.div
                key={signal.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-2 px-5 py-3 rounded-full glass-card border border-teal-400/20 hover:border-teal-400/40 transition-all duration-300"
              >
                <signal.icon className="w-5 h-5 text-teal-400" />
                <span className="text-sm md:text-base font-medium text-teal-200 font-[family-name:var(--font-inter)]">
                  {signal.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Converging lines (visual) */}
          <div className="flex justify-center my-6">
            <div className="w-px h-12 bg-gradient-to-b from-teal-400/40 to-blue-500/40" />
          </div>

          {/* Central Badge */}
          <div className="flex justify-center">
            <motion.div
              whileInView={{ scale: [0.95, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="px-8 py-5 rounded-2xl bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-teal-500/10 border border-blue-500/30 animate-pulse-glow"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-blue-400" />
                <span className="font-[family-name:var(--font-space-grotesk)] text-lg md:text-xl lg:text-2xl font-bold text-white tracking-wide">
                  A LIVING PREDICTIVE MODEL
                </span>
                <Sparkles className="w-6 h-6 text-teal-400" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {benefitCards.map((card, index) => (
            <motion.div
              key={card.audience}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Accent stripe */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${
                  index % 2 === 0
                    ? "bg-gradient-to-r from-teal-400 to-teal-600"
                    : "bg-gradient-to-r from-blue-400 to-blue-600"
                }`}
              />

              <div className="flex items-start gap-5">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                    index % 2 === 0
                      ? "bg-teal-500/15 border border-teal-400/20"
                      : "bg-blue-500/15 border border-blue-400/20"
                  }`}
                >
                  <card.icon
                    className={`w-7 h-7 ${
                      index % 2 === 0 ? "text-teal-400" : "text-blue-400"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl md:text-2xl font-semibold text-teal-100">
                      {card.audience}
                    </h3>
                    {card.metric && (
                      <span
                        className={`text-sm font-bold px-3 py-1 rounded-full ${
                          index % 2 === 0
                            ? "bg-teal-500/15 text-teal-300"
                            : "bg-blue-500/15 text-blue-300"
                        }`}
                      >
                        {card.metric}
                      </span>
                    )}
                  </div>
                  <p className="text-teal-200/50 text-base md:text-lg leading-relaxed font-[family-name:var(--font-inter)]">
                    {card.benefit}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

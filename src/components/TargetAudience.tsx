"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { audienceCards } from "@/lib/constants";

export default function TargetAudience() {
  return (
    <section id="audience" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-teal-950/30 to-dark-bg pointer-events-none" />

      {/* Subtle Dubai skyline */}
      <div className="absolute bottom-0 left-0 right-0 h-[250px] pointer-events-none opacity-25">
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
            Built For Everyone
          </h2>
          <p className="text-lg md:text-xl text-teal-200/60 max-w-3xl mx-auto font-[family-name:var(--font-inter)]">
            A solution for higher yields, faster decisions, better ROI, and
            improved planning.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {audienceCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 transition-all duration-300 group text-center"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6 transition-all duration-300 ${
                  index % 2 === 0
                    ? "bg-gradient-to-br from-teal-500/20 to-teal-700/20 border border-teal-400/20 group-hover:from-teal-500/30 group-hover:to-teal-700/30"
                    : "bg-gradient-to-br from-blue-500/20 to-blue-700/20 border border-blue-400/20 group-hover:from-blue-500/30 group-hover:to-blue-700/30"
                }`}
              >
                <card.icon
                  className={`w-8 h-8 ${
                    index % 2 === 0 ? "text-teal-400" : "text-blue-400"
                  } group-hover:scale-110 transition-transform duration-300`}
                />
              </div>

              {/* Title */}
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl md:text-2xl font-semibold text-teal-100 mb-2">
                {card.title}
              </h3>

              {/* Tagline */}
              <p
                className={`text-sm font-semibold mb-4 ${
                  index % 2 === 0 ? "text-teal-400" : "text-blue-400"
                }`}
              >
                {card.tagline}
              </p>

              {/* Description */}
              <p className="text-teal-200/50 text-base leading-relaxed font-[family-name:var(--font-inter)]">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

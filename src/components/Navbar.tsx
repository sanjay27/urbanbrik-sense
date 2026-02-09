"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-teal-950/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-1 group">
            <span className="font-[family-name:var(--font-space-grotesk)] text-xl md:text-2xl font-bold text-teal-300 tracking-tight group-hover:text-teal-200 transition-colors">
              UrbanBrik
            </span>
            <span className="font-[family-name:var(--font-space-grotesk)] text-xl md:text-2xl font-bold text-pink-500 tracking-tight group-hover:text-pink-400 transition-colors">
              Sense
            </span>
            <span className="text-pink-400 text-xs align-super">&#8482;</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-teal-200/70 hover:text-teal-200 tracking-wide uppercase transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-teal-400 text-white text-sm font-semibold hover:from-pink-400 hover:to-teal-300 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 transform hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-teal-300 hover:text-teal-200 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-teal-950/95 backdrop-blur-xl border-t border-white/5">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium text-teal-200/80 hover:text-teal-200 tracking-wide uppercase transition-colors py-2"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block mt-4 text-center px-5 py-3 rounded-full bg-gradient-to-r from-pink-500 to-teal-400 text-white font-semibold shadow-lg shadow-pink-500/20"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

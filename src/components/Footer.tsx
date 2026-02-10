import Image from "next/image";
import { navItems } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />

      {/* Subtle skyline background */}
      <div className="absolute bottom-0 left-0 right-0 h-[150px] pointer-events-none opacity-15">
        <Image
          src="/dubai-skyline.svg"
          alt=""
          fill
          className="object-cover object-bottom"
        />
      </div>

      <div className="relative z-10 bg-teal-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex items-center gap-1">
              <span className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-teal-300 tracking-tight">
                UrbanBrik
              </span>
              <span className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-blue-500 tracking-tight">
                Sense
              </span>
              <span className="text-blue-400 text-xs align-super">
                &#8482;
              </span>
            </div>

            {/* Nav Links */}
            <div className="flex flex-wrap justify-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-teal-200/50 hover:text-teal-200 transition-colors font-[family-name:var(--font-inter)]"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-sm text-teal-200/40 font-[family-name:var(--font-inter)]">
              &copy; 2026 UrbanBrik. All rights reserved.
            </p>
          </div>

          {/* Credit line */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-teal-200/30 font-[family-name:var(--font-inter)]">
              Presented by Riya Jadhav
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

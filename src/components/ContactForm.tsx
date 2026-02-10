"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { userTypes } from "@/lib/constants";

interface FormState {
  name: string;
  email: string;
  userType: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    userType: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", userType: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-teal-950/20 to-dark-bg pointer-events-none" />

      {/* Subtle Dubai skyline */}
      <div className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none opacity-20">
        <Image
          src="/dubai-skyline.svg"
          alt=""
          fill
          className="object-cover object-bottom"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-dark-bg to-transparent pointer-events-none" />

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
            Get in Touch
          </h2>
          <p className="text-lg md:text-xl text-teal-200/60 max-w-3xl mx-auto font-[family-name:var(--font-inter)]">
            Interested in UrbanBrik Sense&#8482;? Drop us a message and
            we&apos;ll get back to you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold text-teal-100 mb-6">
              We&apos;d love to hear from you
            </h3>
            <p className="text-teal-200/60 text-base md:text-lg mb-8 font-[family-name:var(--font-inter)] leading-relaxed">
              Whether you&apos;re a landlord optimising yields, a family finding
              the perfect neighbourhood, an investor seeking the next growth
              corridor, or a developer planning your next launch &mdash;
              we&apos;re here to help.
            </p>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-teal-500/15 border border-teal-400/20 flex items-center justify-center">
                <Mail className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <p className="text-teal-200/50 text-sm font-[family-name:var(--font-inter)]">
                  Email us at
                </p>
                <a
                  href="mailto:sanjay@urbanbrik.co.uk"
                  className="text-teal-300 hover:text-teal-200 font-medium text-lg transition-colors"
                >
                  sanjay@urbanbrik.co.uk
                </a>
              </div>
            </div>

            <p className="text-teal-200/40 text-sm font-[family-name:var(--font-inter)]">
              We typically respond within 24 hours.
            </p>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {status === "success" ? (
              <div className="glass-card p-12 text-center">
                <CheckCircle className="w-16 h-16 text-teal-400 mx-auto mb-6" />
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-teal-100 mb-3">
                  Thank You!
                </h3>
                <p className="text-teal-200/60 text-lg font-[family-name:var(--font-inter)]">
                  Your message has been sent. We&apos;ll be in touch shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 px-6 py-3 rounded-full border border-teal-400/30 text-teal-300 hover:bg-teal-400/10 transition-all duration-200 font-medium"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10">
                {/* Honeypot */}
                <input
                  type="text"
                  name="botcheck"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-teal-200/70 mb-2 font-[family-name:var(--font-inter)]"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all duration-200 font-[family-name:var(--font-inter)]"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-teal-200/70 mb-2 font-[family-name:var(--font-inter)]"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all duration-200 font-[family-name:var(--font-inter)]"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* User Type */}
                  <div>
                    <label
                      htmlFor="userType"
                      className="block text-sm font-medium text-teal-200/70 mb-2 font-[family-name:var(--font-inter)]"
                    >
                      I am a...
                    </label>
                    <select
                      id="userType"
                      value={form.userType}
                      onChange={(e) =>
                        setForm({ ...form, userType: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all duration-200 font-[family-name:var(--font-inter)] appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-teal-950 text-white">
                        Select your role
                      </option>
                      {userTypes.map((type) => (
                        <option
                          key={type}
                          value={type}
                          className="bg-teal-950 text-white"
                        >
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-teal-200/70 mb-2 font-[family-name:var(--font-inter)]"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all duration-200 resize-none font-[family-name:var(--font-inter)]"
                      placeholder="Tell us about your needs..."
                    />
                  </div>

                  {/* Error message */}
                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 text-white text-base md:text-lg font-semibold hover:from-blue-400 hover:to-teal-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

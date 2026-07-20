"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Book, Gamepad2, GraduationCap, ArrowRight, Star } from "lucide-react";
import { SpellingCycler } from "@/components/ui/SpellingCycler";
import { useTranslations } from "@/lib/i18n/LocaleProvider";

export default function Home() {
  const t = useTranslations('home');

  const features = [
    {
      title: t('dictionaryCardTitle'),
      description: t('dictionaryCardBody'),
      icon: Book,
      href: "/dictionary",
      bg: "bg-white",
      fg: "text-black",
    },
    {
      title: t('educationCardTitle'),
      description: t('educationCardBody'),
      icon: GraduationCap,
      href: "/education",
      bg: "bg-accent",
      fg: "text-black",
    },
    {
      title: t('gamesCardTitle'),
      description: t('gamesCardBody'),
      icon: Gamepad2,
      href: "/education",
      bg: "bg-secondary",
      fg: "text-white",
    },
  ];

  return (
    <main className="min-h-screen md:h-screen bg-background pt-28 overflow-y-auto md:overflow-hidden flex flex-col">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-grid pointer-events-none" />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 flex flex-col justify-start md:justify-center">
        {/* Hero Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center mb-12">
          <div className="space-y-4 sm:space-y-6 md:space-y-8 text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-1.5 bg-foreground text-background font-bold uppercase tracking-widest text-[10px] sm:text-xs"
            >
              <Star className="w-2 h-2 sm:w-3 sm:h-3 fill-current" />
              {t('badge')}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tighter"
            >
              {t('titleLine1')} <br />
              <span className="text-accent-ink relative inline-block">
                <SpellingCycler />
              </span> <br />
              {t('titleLine3')}
            </motion.h1>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative w-full"
          >
            <div className="relative w-full aspect-square max-w-[200px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px] mx-auto rounded-2xl overflow-hidden">
              <img
                src="/assets/Images/fn_hero.png"
                alt="Mi'gmaq Foundation"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Link
                href={feature.href}
                className={`group block h-full p-4 sm:p-5 md:p-6 border-4 border-foreground transition-all hover:-translate-y-2 ${feature.bg} ${feature.fg}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-white/20 backdrop-blur-sm border-2 border-current rounded-none">
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" aria-hidden="true" />
                </div>
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black mb-2 tracking-tighter">{feature.title}</h2>
                <p className="text-xs sm:text-sm md:text-base font-bold opacity-90 leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

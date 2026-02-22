/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Skull,
  Dice5,
  Zap,
  ShieldCheck,
  Crown,
  Twitter,
  Wallet,
  X,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Dna,
  Palette,
  FileText
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Types ---
type AppPhase = 'hero' | 'lab';

// --- Components ---

const GrainyBackground = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-br from-lavender via-[#5A4B5A] to-[#2A1A2A]" />
    <div className="absolute inset-0 opacity-20 grainy-bg" />
    {/* Floating Particles */}
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-neon-pink rounded-full blur-[1px]"
        initial={{
          x: Math.random() * 100 + '%',
          y: Math.random() * 100 + '%',
          opacity: Math.random() * 0.5 + 0.2
        }}
        animate={{
          y: [null, '-20%'],
          opacity: [null, 0]
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    ))}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
  </div>
);

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-12 sm:py-10 flex justify-between items-center pointer-events-none">
    <motion.a
      href="https://x.com/MrSkelz_"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pointer-events-auto glass p-3 sm:p-4 rounded-xl border border-gold/20 flex items-center justify-center group hover:border-gold/50 transition-all duration-500 shadow-lg hover:shadow-gold/10"
    >
      <Twitter className="w-5 h-5 sm:w-6 sm:h-6 text-beige group-hover:text-gold transition-colors duration-500" />
    </motion.a>
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pointer-events-auto flex items-center gap-3 sm:gap-4 group cursor-pointer"
    >
      <div className="text-right hidden sm:block">
        <p className="text-gold font-display text-2xl leading-none group-hover:text-beige transition-colors">MR. SKELZ</p>
        <p className="text-beige/40 text-[10px] font-bold tracking-[0.3em] uppercase mt-1">Underground Society</p>
      </div>
      <div className="relative">
        <div className="absolute -inset-2 bg-gold/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative w-12 h-12 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl border-2 border-gold/30 overflow-hidden shadow-2xl glass p-1 sm:p-1.5 transform group-hover:rotate-3 transition-transform">
          <img
            src="/images/profile-logo.png"
            alt="Mr Skelz Logo"
            className="w-full h-full object-cover rounded-lg sm:rounded-xl"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </motion.div>
  </header>
);

const TripleThreat = () => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
    <div className="text-center mb-10 sm:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-gold font-display text-xl sm:text-2xl mb-2 opacity-40"
      >
        01
      </motion.div>
      <h2 className="text-4xl sm:text-5xl font-display text-beige uppercase tracking-tight">The Setup</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
      {[
        {
          title: "High-Stakes Utility",
          icon: <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-neon-pink" />,
          desc: "Vintage rubber-hose hand holding a glowing neon Ace."
        },
        {
          title: "Secure Society",
          icon: <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-gold" />,
          desc: "Classic cartoon safe with a neon digital keypad."
        },
        {
          title: "Exclusive Rewards",
          icon: <Crown className="w-10 h-10 sm:w-12 sm:h-12 text-beige" />,
          desc: "Floating gold poker chip with a mini skeleton crown."
        }
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="glass p-6 sm:p-10 rounded-3xl flex flex-col items-center text-center group hover:border-gold/50 transition-all duration-500"
        >
          <div className="mb-6 p-4 rounded-2xl bg-burgundy/30 group-hover:scale-110 transition-transform duration-500">
            {item.icon}
          </div>
          <h3 className="text-xl sm:text-2xl font-vintage mb-4 text-gold">{item.title}</h3>
          <p className="text-base sm:text-lg text-beige/70 leading-relaxed font-medium">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const ManifestoSection = () => (
  <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-32 relative overflow-hidden">
    {/* Decorative Elements */}
    <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-gold/20 rounded-tl-[3rem] -translate-x-6 -translate-y-6 hidden sm:block" />
    <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-gold/20 rounded-br-[3rem] translate-x-6 translate-y-6 hidden sm:block" />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="glass p-8 sm:p-20 rounded-[2.5rem] sm:rounded-[4rem] border-2 sm:border-4 border-white/10 relative z-10 text-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-burgundy/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-10 flex flex-col items-center gap-4">
          <div className="text-gold font-display text-xl sm:text-2xl opacity-40">
            02
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-px bg-gold/20" />
            <Skull className="w-6 h-6 text-gold/60" />
            <div className="w-10 h-px bg-gold/20" />
          </div>
        </div>

        <h2 className="text-4xl sm:text-7xl font-display text-beige mb-10 tracking-tight uppercase leading-[0.9]">
          The Dealer’s <br />
          <span className="text-gold">Manifesto</span>
        </h2>

        <div className="space-y-6 text-lg sm:text-2xl text-beige/80 leading-relaxed max-w-3xl mx-auto">
          <p>
            Every frame of Mr. Skelz is a gut punch. You know that feeling when you first saw the animation that split-second where your brain short-circuited? That’s the high we’re chasing.
          </p>
          <div className="py-6 px-8 bg-white/5 rounded-3xl border border-white/10">
            <p className="text-gold font-bold italic tracking-wide">
              Most projects try to sell you a roadmap. We’re selling a vibe that’s been buried since 1930.
            </p>
          </div>
          <p>
            Mr. Skelz is a middle finger to the sterile, low-effort "art" suffocating your timeline. We’re digging up the grain, the ink, and the energy of the underground.
          </p>
        </div>

      </div>
    </motion.div>
  </section>
);

const BoneYardSection = () => (
  <section className="py-20 sm:py-32 px-6 bg-black/40 relative overflow-hidden border-y border-white/5">
    {/* Background Text */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] sm:text-[20vw] font-display text-white/[0.02] whitespace-nowrap pointer-events-none select-none">
      BONE YARD
    </div>

    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center relative z-10">
      {/* Tombstone Decorative Background - Bottom Left */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [-5, -2, -5]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-10 -left-10 sm:-bottom-20 sm:-left-40 pointer-events-none opacity-[0.08] sm:opacity-[0.15] z-0"
      >
        <img
          src="/images/Tombstone.png"
          alt="Tombstone"
          className="w-[280px] sm:w-[500px] grayscale brightness-50"
        />
      </motion.div>

      {/* Second Tombstone Accent - Top Right */}
      <motion.div
        animate={{
          y: [0, 8, 0],
          rotate: [10, 12, 10]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute -top-10 -right-10 sm:-top-20 sm:-right-40 pointer-events-none opacity-[0.04] sm:opacity-[0.08] z-0"
      >
        <img
          src="/images/Tombstone.png"
          alt="Tombstone"
          className="w-[220px] sm:w-[450px] grayscale brightness-50"
        />
      </motion.div>

      <motion.div
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-6 sm:space-y-8"
      >
        <div className="flex items-center gap-4">
          <div className="text-gold font-display text-xl sm:text-2xl opacity-40">
            04
          </div>
          <div className="h-px w-12 bg-gold/20" />
        </div>

        <h2 className="text-5xl sm:text-8xl font-display text-beige leading-[0.9] uppercase">
          The <br />
          <span className="text-neon-pink drop-shadow-neon">Bone Yard</span>
        </h2>
        <p className="text-lg sm:text-2xl text-beige/70 leading-relaxed italic max-w-lg">
          "If you’re looking for a hero, you’ve walked into the wrong bar."
        </p>
      </motion.div>

      <motion.div
        initial={{ x: 20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="glass p-6 sm:p-12 rounded-[2.5rem] border-2 border-white/10 bg-burgundy/20 relative mt-8 lg:mt-0"
      >
        <div className="absolute -top-6 -right-2 sm:-top-8 sm:-right-8 w-12 h-12 sm:w-16 sm:h-16 bg-gold rounded-full flex items-center justify-center text-burgundy shadow-2xl rotate-12 z-20">
          <Dice5 className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>

        <div className="space-y-6 text-base sm:text-lg font-medium text-beige/80 leading-relaxed">
          <p>
            The Bone Yard isn’t for the faint of heart. It’s a smoke-filled purgatory where the jazz is deafening and the stakes are higher than your life.
          </p>
          <p>
            At the center of it all? <span className="text-gold font-bold font-display tracking-tight text-xl">Mr. Skelz</span>. He’s the dealer. He’s the boss. He’s the one holding the dice.
          </p>
          <div className="relative group">
            <div className="absolute -inset-1 bg-neon-pink/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <p className="relative text-beige font-bold border-l-4 border-neon-pink pl-6 py-4 bg-white/5 rounded-r-2xl">
              You aren't just buying a digital image; you’re claiming your seat at the table.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const CraftSection = () => (
  <section className="py-24 px-6 relative">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative p-1 sm:p-2 bg-gold/10 rounded-[3rem] border-2 border-gold/20 shadow-2xl"
      >
        <div className="bg-burgundy/30 backdrop-blur-md rounded-[2.5rem] p-10 sm:p-20 border-2 border-white/5 relative overflow-hidden">
          {/* Vintage Corner Accents */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-gold/40" />
          <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-gold/40" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-gold/40" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-gold/40" />

          <div className="text-center space-y-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold font-display text-2xl mb-2 opacity-40"
            >
              05
            </motion.div>
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-6xl font-display text-gold leading-none tracking-tighter uppercase">
                No Slop. No Shortcuts.
              </h2>
              <p className="text-xl sm:text-2xl text-beige italic">
                This isn’t AI-generated noise. This is real ink and a relentless obsession with the craft.
              </p>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

            <div className="max-w-3xl mx-auto space-y-8">
              <p className="text-lg sm:text-xl font-medium text-beige/80 leading-relaxed">
                Every frame is a love letter to the Golden Era when games were punishing, quarters were the only currency that mattered, and graphics peaked at a glorious 320x224 resolution. This is the franchise for those who miss the smoke, the grit, and the gamble.
              </p>

              <div className="pt-8">
                <p className="text-3xl sm:text-5xl font-display text-beige uppercase tracking-tight">
                  The dice are on the table. <br />
                  <span className="text-gold">Are you in, or are you out?</span>
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-6 pt-8 opacity-40">
              <Dice5 className="w-8 h-8" />
              <Skull className="w-8 h-8" />
              <Dice5 className="w-8 h-8" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const QnASection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What exactly is Mr. Skelz? A project? A roadmap?",
      a: "Most people want to sell you a promise on a piece of paper. We’re selling a vibe that’s been dead since 1930. Mr. Skelz isn’t a 'project' he’s the boss, the dealer, and a middle finger to the sterile, low-effort art clogging up your life. We brought back the grain, the ink, and the high-stakes adrenaline of the underground."
    },
    {
      q: "What happened to my brain when I saw that animation?",
      a: "That’s the 'short-circuit.' Every frame of Mr. Skelz is designed to be a gut punch. We’re chasing that raw, visceral high the feeling of seeing something that feels alive, jagged, and dangerous for the first time."
    },
    {
      q: "Where does this all take place?",
      a: "The Bone Yard. It’s a smoke-filled purgatory where the jazz is deafening and the stakes are higher than your life. If you’re looking for a hero to save you, you’ve walked into the wrong bar. Here, you don't just 'buy in' you claim your seat at the table."
    },
    {
      q: "Why does the art look so… 'dirty'?",
      a: "Because 'clean' is soulless. We’re tired of plastic, vector-perfect art. We went back to the Rubber-Hose era because it’s raw. We kept the film grain and the 'dirty' textures so it looks like a 100-year-old film reel recovered from a flooded basement."
    },
    {
      q: "Is this just another AI-generated collection?",
      a: "Not a chance. This isn’t AI-generated slop. This is real ink and a relentless obsession with the craft. Every frame is a love letter to the Golden Era when games were punishing, quarters were the only currency that mattered, and graphics peaked at a glorious 320x224 resolution."
    },
    {
      q: "How many seats are at the table?",
      a: "Only 1,991 of you are getting in. It’s a tight circle, just the way the Boss likes it. Once the supply is claimed, the doors to the Yard are locked tight."
    },
    {
      q: "Where is this heist going down?",
      a: "We’re hitting the Ethereum network. It’s the high-stakes playground where the real players live. You can find the launching on OpenSea that’s where the exchange happens. No side-streets, no back-alleys, just the main stage."
    },
    {
      q: "How do I know a Skelz when I see one?",
      a: "The silhouette. In a sea of boring, generic characters, a Skelz is unmistakable. From the lethal tilt of the fedora to the crooked smirk on the skull, every detail is crafted to ensure he commands the room."
    },
    {
      q: "So, what’s the move?",
      a: "The dice are on the table. You either take the gamble or you stay out of the Yard. Are you in, or are you out?"
    }
  ];

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-black/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-6xl sm:text-8xl font-display text-beige leading-none uppercase mb-6 drop-shadow-2xl">
            THE <span className="text-gold">DEAL</span>
          </h2>
          <p className="text-gold/60 font-vintage tracking-[0.2em] text-lg sm:text-2xl italic">
            "Everything is a gamble, if you play it right."
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isExpanded = expandedIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div
                  onClick={() => setExpandedIndex(isExpanded ? null : i)}
                  className={`group cursor-pointer transition-all duration-500 rounded-[2rem] border-2 ${isExpanded
                    ? 'bg-burgundy/20 border-gold/40 shadow-[0_0_30px_rgba(212,175,55,0.1)]'
                    : 'bg-white/5 border-white/5 hover:border-white/10'
                    }`}
                >
                  <div className="p-8 sm:p-10">
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex gap-6 items-center">
                        <span className={`font-display text-4xl transition-colors duration-500 ${isExpanded ? 'text-gold' : 'text-white/10'}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className={`text-xl sm:text-2xl font-display leading-tight transition-colors duration-500 ${isExpanded ? 'text-gold' : 'text-beige group-hover:text-gold'
                          }`}>
                          {faq.q}
                        </h3>
                      </div>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 border-current flex items-center justify-center transition-all duration-500 ${isExpanded ? 'text-gold rotate-180' : 'text-white/20 group-hover:text-white/40'
                        }`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-8 mt-8 border-t border-white/5">
                            <div className="flex gap-6">
                              <div className="w-1 h-auto bg-gradient-to-b from-gold via-gold/50 to-transparent rounded-full opacity-50" />
                              <p className="text-lg sm:text-xl font-medium text-beige/70 leading-relaxed py-2">
                                {faq.a}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const EarlyAccessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    twitterUsername: '',
    retweetLink: '',
    quoteLink: '',
    walletAddress: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setFormData({
        twitterUsername: '',
        retweetLink: '',
        quoteLink: '',
        walletAddress: ''
      });
      setErrors({});
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.twitterUsername) newErrors.twitterUsername = 'Required';

    const twitterLinkRegex = /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/.+\/status\/\d+/;
    if (!formData.quoteLink) {
      newErrors.quoteLink = 'Required';
    } else if (!twitterLinkRegex.test(formData.quoteLink)) {
      newErrors.quoteLink = 'Invalid Quote Link';
    }

    const walletRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!formData.walletAddress) {
      newErrors.walletAddress = 'Required';
    } else if (!walletRegex.test(formData.walletAddress)) {
      newErrors.walletAddress = 'Invalid EVM address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxzH7xjk78EXADq1_hg0jLfzgLd-5fo5Uj58hc2KP075SuXvdbBFsBUAJyktuODB8MNAg/exec";

        // We use a normal fetch without no-cors to try and read the response
        // Note: Google Apps Script with JSON return might still cause CORS redirect issues
        // so we handle it with a fallback
        const response = await fetch(SCRIPT_URL, {
          method: 'POST',
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.result === 'success') {
          setIsSubmitted(true);
        } else if (result.message === "Duplicate address") {
          setErrors({ ...errors, walletAddress: "This address has already joined!" });
        } else {
          alert("Error: " + (result.message || "Unknown error"));
        }
      } catch (error) {
        // Fallback for CORS: If it fails because of redirect but data actually sent
        // we can't be 100% sure, but for now we'll show a generic error 
        // OR warn user to check their connection.
        console.error("Submission error:", error);
        alert("Terjadi kesalahan saat mengirim data. Pastikan alamat belum terdaftar.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl flex flex-col items-center my-auto"
          >
            {/* Logo */}
            <div className="mb-2 sm:mb-4">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-2xl border-4 border-[#4A2B4A] shadow-[0_4px_0_rgba(74,43,74,1)]">
                  <img
                    src="/images/profile-logo.png"
                    alt="Mr Skelz Logo"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            <div className="relative w-full bg-[#C5A3C5] rounded-[2rem] sm:rounded-[3rem] border-[6px] sm:border-[12px] border-[#4A2B4A] p-5 sm:p-8 shadow-[0_0_40px_rgba(197,163,197,0.5)]">
              {/* Inner Glow */}
              <div className="absolute inset-0 rounded-[1.6rem] sm:rounded-[2.2rem] shadow-[inset_0_0_20px_rgba(255,255,255,0.3)] pointer-events-none" />

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="text-center mb-4 sm:mb-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#4A2B4A]">Join Early Access!</h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 relative z-10">
                      {/* X Username */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-end">
                        <div className="flex-1 space-y-1">
                          <div className="bg-[#F5E6D3] border-2 border-[#4A2B4A] rounded-full px-4 py-1.5 sm:py-2">
                            <input
                              type="text"
                              placeholder="X (Twitter) Username"
                              value={formData.twitterUsername}
                              onChange={(e) => setFormData({ ...formData, twitterUsername: e.target.value })}
                              className="w-full bg-transparent text-[#4A2B4A] font-bold text-sm sm:text-base placeholder:text-[#4A2B4A]/40 focus:outline-none"
                            />
                          </div>
                        </div>
                        <button type="button" className="bg-[#8B6B8B] border-2 border-[#4A2B4A] text-white px-6 py-1.5 sm:py-2 rounded-full font-bold text-sm sm:text-base shadow-[0_3px_0_0_#4A2B4A] hover:translate-y-[1px] hover:shadow-[0_2px_0_0_#4A2B4A] active:translate-y-[3px] active:shadow-none transition-all">
                          Follow
                        </button>
                      </div>
                      {errors.twitterUsername && <p className="text-[10px] text-red-600 font-bold ml-4 uppercase">{errors.twitterUsername}</p>}

                      {/* Retweet & Quote */}
                      <div className="space-y-2">
                        <div className="bg-[#F5E6D3] border-2 border-[#4A2B4A] rounded-2xl p-3 sm:p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                            <label className="text-[10px] sm:text-xs font-bold text-[#4A2B4A] uppercase tracking-wider">Required Tasks</label>
                            <div className="flex gap-2">
                              <button type="button" className="flex-1 sm:flex-none bg-[#C5A3C5] border-2 border-[#4A2B4A] text-[#4A2B4A] text-[10px] py-1.5 px-4 rounded-full flex items-center justify-center gap-1.5 font-bold shadow-[0_2px_0_0_#4A2B4A] hover:translate-y-[1px] hover:shadow-[0_1px_0_0_#4A2B4A] transition-all">
                                <Twitter className="w-3 h-3" />
                                Retweet
                              </button>
                              <button type="button" className="flex-1 sm:flex-none bg-[#C5A3C5] border-2 border-[#4A2B4A] text-[#4A2B4A] text-[10px] py-1.5 px-4 rounded-full flex items-center justify-center gap-1.5 font-bold shadow-[0_2px_0_0_#4A2B4A] hover:translate-y-[1px] hover:shadow-[0_1px_0_0_#4A2B4A] transition-all">
                                <Twitter className="w-3 h-3" />
                                Quote
                              </button>
                            </div>
                          </div>
                          <div className="bg-white/20 border border-[#4A2B4A]/20 rounded-xl px-4 py-2">
                            <input
                              type="text"
                              placeholder="Paste your Quote Tweet link here..."
                              value={formData.quoteLink}
                              onChange={(e) => setFormData({ ...formData, quoteLink: e.target.value })}
                              className="w-full bg-transparent text-[#4A2B4A] font-bold text-sm placeholder:text-[#4A2B4A]/30 focus:outline-none"
                            />
                          </div>
                        </div>
                        {errors.quoteLink && <p className="text-[10px] text-red-600 font-bold ml-4 uppercase">{errors.quoteLink}</p>}
                      </div>

                      {/* Wallet */}
                      <div className="space-y-1">
                        <div className="bg-[#F5E6D3] border-2 border-[#4A2B4A] rounded-full px-4 py-1.5 sm:py-2">
                          <input
                            type="text"
                            placeholder="EVM Wallet Address"
                            value={formData.walletAddress}
                            onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                            className="w-full bg-transparent text-[#4A2B4A] font-bold text-sm sm:text-base placeholder:text-[#4A2B4A]/40 focus:outline-none"
                          />
                        </div>
                        {errors.walletAddress && <p className="text-[10px] text-red-600 font-bold ml-4 uppercase">{errors.walletAddress}</p>}
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 relative">
                        <button
                          type="button"
                          onClick={onClose}
                          className="w-full sm:w-auto bg-[#8B6B8B] text-white px-10 py-2.5 sm:py-3 rounded-full font-display text-xl sm:text-2xl border-4 border-[#4A2B4A] shadow-[0_4px_0_0_#4A2B4A] hover:translate-y-1 hover:shadow-[0_2px_0_0_#4A2B4A] active:translate-y-2 active:shadow-none transition-all"
                        >
                          BACK
                        </button>
                        <button
                          disabled={isSubmitting}
                          className="w-full sm:w-auto bg-[#F5E6D3] text-[#4A2B4A] px-12 sm:px-16 py-2.5 sm:py-3 rounded-full font-display text-xl sm:text-2xl border-4 border-[#4A2B4A] shadow-[0_6px_0_0_#4A2B4A] hover:translate-y-1 hover:shadow-[0_2px_0_0_#4A2B4A] active:translate-y-2 active:shadow-none transition-all disabled:opacity-50"
                        >
                          {isSubmitting ? '...' : 'SUBMIT'}
                        </button>

                        <div className="sm:absolute right-0 flex items-center gap-3">
                          <button onClick={onClose} className="text-[#4A2B4A] hover:scale-110 transition-transform">
                            <X className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-8 sm:py-12"
                  >
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full animate-pulse" />
                      <div className="relative w-24 h-24 bg-[#F5E6D3] rounded-full border-4 border-[#4A2B4A] flex items-center justify-center shadow-[0_6px_0_0_#4A2B4A]">
                        <Sparkles className="w-12 h-12 text-[#4A2B4A]" />
                      </div>
                    </div>

                    <h3 className="text-4xl sm:text-5xl font-display text-white mb-4 drop-shadow-[0_4px_0_rgba(74,43,74,1)]">
                      YOU'RE IN!
                    </h3>

                    <p className="text-[#4A2B4A] font-bold text-lg sm:text-xl mb-8 max-w-xs">
                      Welcome to the Mr. Skelz Society. Your spot is secured.
                    </p>

                    <button
                      onClick={onClose}
                      className="bg-[#F5E6D3] text-[#4A2B4A] px-12 py-3 rounded-full font-display text-2xl border-4 border-[#4A2B4A] shadow-[0_6px_0_0_#4A2B4A] hover:translate-y-1 hover:shadow-[0_2px_0_0_#4A2B4A] active:translate-y-2 active:shadow-none transition-all"
                    >
                      AWESOME!
                    </button>

                    <div className="mt-8 flex gap-4">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            y: [0, -10, 0],
                            rotate: [0, 10, -10, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                        >
                          <Skull className="w-6 h-6 text-[#4A2B4A]/40" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="mt-4 sm:mt-6 text-white text-xs sm:text-sm font-medium">Terms & Conditions apply.</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

interface SkelzLabProps {
  onBack: () => void;
}

const GallerySection = () => {
  const images = [
    "/images/nft/nft-1.png",
    "/images/nft/nft-2.png",
    "/images/nft/nft-3.png",
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 sm:py-32">
      <div className="text-center mb-12 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gold font-display text-xl sm:text-2xl mb-2 opacity-40"
        >
          03
        </motion.div>
        <h2 className="text-4xl sm:text-8xl font-display text-beige mb-6 uppercase tracking-tight leading-[0.9]">The Minted <br className="sm:hidden" /><span className="text-gold">Archive</span></h2>
        <p className="text-gold font-vintage tracking-[0.2em] text-lg sm:text-xl italic">"OWN THE ANARCHY"</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border-4 border-white/10 glass shadow-2xl"
          >
            <img
              src={img}
              alt={`Skelz NFT ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy via-burgundy/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-gold font-display text-3xl mb-1">SKELZ #{888 + i}</p>
                  <p className="text-beige/60 text-sm font-bold tracking-widest uppercase">Legendary Tier</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-burgundy shadow-lg">
                  <Crown className="w-6 h-6" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const SkelzLab: React.FC<SkelzLabProps> = ({ onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [style, setStyle] = useState<'classic' | 'neon'>('neon');
  const [leverPulled, setLeverPulled] = useState(false);

  const generatePFP = async (customPrompt?: string) => {
    setIsGenerating(true);
    setLeverPulled(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const finalPrompt = customPrompt || prompt || "Neon Fedora, Cyber-Cigar, Tuxedo";
      const styleDesc = style === 'classic' ? "Black and white 1930s rubber-hose ink style" : "Vibrant 1930s rubber-hose style with neon noir colors";

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{
            text: `A high-quality 1930s rubber-hose animation style (Cuphead aesthetic) mischievous skeleton character.
        Features: Large expressive eyes with pie-slice pupils, thick clean black outlines, muted vintage color palette (cream, burgundy, gold, navy), and a subtle grainy/noisy texture.
        Character is Mr. Skelz, a skeleton in a tuxedo.
        Traits to include: ${finalPrompt}.
        Style details: ${styleDesc}. 
The composition should be a close-up portrait with a simple muted background, exactly matching the iconic rubber-hose cartoon look.` }]
        },
        config: {
          imageConfig: { aspectRatio: "1:1" }
        }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
      setTimeout(() => setLeverPulled(false), 1000);
    }
  };

  const handleRandomize = () => {
    const traits = [
      "Navy Fedora with Red Feather, Smoking a Cigar, Fur-lined Coat",
      "Tall Top Hat with Burgundy Ribbon, Holding Red Dice, Purple Suit",
      "Golden Crown with Purple Jewels, Holding Ace of Spades, Royal Burgundy Uniform",
      "Monocle, Gold Pocket Watch, Tuxedo with Bowtie",
      "Holding a Poker Chip, Grinning with Sharp Teeth, Vintage Bowler Hat"
    ];
    const randomTrait = traits[Math.floor(Math.random() * traits.length)];
    setPrompt(randomTrait);
    generatePFP(randomTrait);
  };

  return (
    <motion.div
      initial={{ scale: 1.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.5, opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-10 relative bg-black/40 overflow-x-hidden"
    >
      <button
        onClick={onBack}
        className="absolute top-6 left-6 sm:top-10 sm:left-10 glass px-5 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-white/20 transition-all text-xs sm:text-sm z-50 border border-white/10"
      >
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 rotate-180" />
        BACK
      </button>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-[1fr_auto_320px] gap-6 sm:gap-12 items-center py-20 sm:py-0">
        {/* Preview Canvas */}
        <div className="relative group order-1">
          <div className="absolute -inset-4 bg-gold/20 blur-2xl rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="glass aspect-square rounded-[30px] sm:rounded-[40px] overflow-hidden relative border-4 border-white/10">
            {isGenerating ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-burgundy/20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Dna className="w-12 h-12 sm:w-16 sm:h-16 text-gold" />
                </motion.div>
                <p className="mt-4 font-display text-gold animate-pulse text-sm sm:text-base">MUTATING...</p>
              </div>
            ) : generatedImage ? (
              <img src={generatedImage} alt="Generated Skelz" className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-beige/30">
                <Skull className="w-20 h-20 sm:w-32 sm:h-32 mb-4" />
                <p className="font-vintage text-lg sm:text-xl">AWAITING MUTATION</p>
              </div>
            )}

            {/* Electrical Sparks Overlay (Rubber-hose style) */}
            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-6 h-6 sm:w-8 sm:h-8 text-neon-pink"
                      initial={{
                        x: Math.random() * 100 + '%',
                        y: Math.random() * 100 + '%'
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0, 1, 0],
                        rotate: [0, 45, -45, 0]
                      }}
                      transition={{ duration: 0.2, repeat: Infinity }}
                    >
                      <Sparkles />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-6 sm:mt-8 flex justify-center">
            <button className="w-full sm:w-auto bg-gold text-burgundy px-8 sm:px-12 py-3 sm:py-4 rounded-2xl font-display text-xl sm:text-2xl shadow-[0_6px_0_0_#A6892C] hover:translate-y-1 hover:shadow-[0_2px_0_0_#A6892C] active:translate-y-2 active:shadow-none transition-all flex items-center justify-center gap-4">
              MINT YOUR ALTER EGO
              <div className="w-3 h-3 bg-burgundy rounded-full animate-ping" />
            </button>
          </div>
        </div>

        {/* The Lever */}
        <div className="flex flex-col items-center gap-4 order-3 lg:order-2 py-4 lg:py-0">
          <div className="h-48 lg:h-64 w-10 lg:w-12 bg-burgundy rounded-full relative border-4 border-gold/30 shadow-inner">
            <motion.div
              animate={leverPulled ? { y: 120 } : { y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="absolute -top-4 -left-4 w-16 h-16 lg:w-20 lg:h-20 cursor-pointer"
              onClick={handleRandomize}
            >
              <div className="w-full h-full bg-gold rounded-full border-4 border-burgundy shadow-lg flex items-center justify-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-burgundy rounded-full flex items-center justify-center">
                  <Dice5 className="text-gold w-5 h-5 lg:w-6 lg:h-6" />
                </div>
              </div>
            </motion.div>
          </div>
          <p className="font-display text-gold text-xs sm:text-sm tracking-widest">PULL</p>
        </div>

        {/* Controls */}
        <div className="space-y-6 sm:space-y-8 order-2 lg:order-3">
          <div className="glass p-5 sm:p-6 rounded-3xl space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] sm:text-xs font-bold text-gold/50 uppercase tracking-widest flex items-center gap-2">
                <Palette className="w-3 h-3" />
                Whisper your traits...
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Neon Fedora, Cyber-Cigar..."
                className="w-full bg-black/20 border-2 border-white/10 rounded-xl p-3 sm:p-4 text-beige placeholder:text-beige/20 focus:outline-none focus:border-gold/30 transition-colors resize-none h-24 sm:h-32 text-sm sm:text-base"
              />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <label className="text-[10px] sm:text-xs font-bold text-gold/50 uppercase tracking-widest">Style Palette</label>
              <div className="flex p-1 bg-black/20 rounded-xl border border-white/10">
                <button
                  onClick={() => setStyle('classic')}
                  className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${style === 'classic' ? 'bg-gold text-burgundy' : 'text-beige/50 hover:text-beige'}`}
                >
                  Classic Ink
                </button>
                <button
                  onClick={() => setStyle('neon')}
                  className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${style === 'neon' ? 'bg-neon-pink text-white' : 'text-beige/50 hover:text-beige'}`}
                >
                  Neon Noir
                </button>
              </div>
            </div>

            <button
              onClick={() => generatePFP()}
              disabled={isGenerating}
              className="w-full bg-white/10 hover:bg-white/20 py-3 sm:py-4 rounded-xl font-bold transition-all border border-white/10 hover:border-white/30 disabled:opacity-50 text-sm sm:text-base"
            >
              GENERATE
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [phase, setPhase] = useState<AppPhase>('hero');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen text-beige selection:bg-neon-pink selection:text-white">
      <GrainyBackground />

      {phase === 'hero' && <Header />}

      <AnimatePresence mode="wait">
        {phase === 'hero' ? (
          <motion.main
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative pt-20"
          >
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center min-h-[80vh] py-12 lg:py-0">
              {/* Illustration Placeholder */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative order-2 lg:order-1 flex justify-center"
              >
                <div className="absolute -inset-10 bg-neon-pink/20 blur-[100px] rounded-full" />
                <div className="relative glass w-full max-w-[280px] sm:max-w-none aspect-square rounded-[2.5rem] sm:rounded-[60px] flex items-center justify-center overflow-hidden border-2 sm:border-4 border-white/10 group">
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                    <Skull className="w-40 h-40 sm:w-64 sm:h-64 text-beige drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]" />
                    <div className="absolute -top-8 -left-6 sm:-top-12 sm:-left-8 w-20 h-20 sm:w-32 sm:h-32 bg-burgundy rounded-full -z-10 border-4 border-gold" />
                    <div className="absolute top-1/2 -right-8 sm:-right-12 flex gap-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        <Dice5 className="w-10 h-10 sm:w-16 sm:h-16 text-gold drop-shadow-lg" />
                      </motion.div>
                    </div>
                  </motion.div>
                  {/* Floating Stars */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-gold"
                      initial={{
                        x: Math.random() * 80 + 10 + '%',
                        y: Math.random() * 80 + 10 + '%'
                      }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2 + i, repeat: Infinity }}
                    >
                      <Sparkles className="w-4 h-4 sm:w-6 sm:h-6" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Copy */}
              <div className="order-1 lg:order-2 space-y-6 sm:space-y-8 text-center lg:text-left">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-5xl sm:text-8xl md:text-9xl font-display text-beige leading-[0.9] mb-4 sm:mb-6 drop-shadow-2xl">
                    MR. <br />
                    <span className="text-gold">SKELZ</span>
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-gold/80 tracking-wide max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    a middle finger to the boring, low-effort art filling up your timeline. We’re bringing back the grain, the ink, and the high-stakes energy of the underground.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start"
                >
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto px-10 py-4 sm:py-5 bg-gold text-burgundy rounded-2xl font-display text-xl sm:text-2xl shadow-[0_6px_0_0_#A6892C] hover:translate-y-1 hover:shadow-[0_2px_0_0_#A6892C] active:translate-y-2 active:shadow-none transition-all"
                  >
                    EARLY ACCESS
                  </button>

                  <button
                    disabled
                    className="w-full sm:w-auto glass px-10 py-4 sm:py-5 rounded-2xl font-bold flex items-center justify-center lg:justify-start gap-4 opacity-50 cursor-not-allowed transition-all"
                  >
                    <div className="relative">
                      <div className="w-3 h-3 bg-white/20 rounded-full" />
                    </div>
                    MR.SKELZ LAB AI (LOCKED)
                  </button>
                </motion.div>
              </div>
            </div>

            <TripleThreat />

            <ManifestoSection />

            <GallerySection />

            <BoneYardSection />

            <CraftSection />

            <QnASection />

            {/* Footer Accents */}
            <div className="py-12 sm:py-20 flex flex-wrap justify-center gap-8 sm:gap-12 opacity-30 grayscale hover:grayscale-0 transition-all">
              <Skull className="w-8 h-8 sm:w-12 sm:h-12" />
              <Dice5 className="w-8 h-8 sm:w-12 sm:h-12" />
              <Crown className="w-8 h-8 sm:w-12 sm:h-12" />
              <Zap className="w-8 h-8 sm:w-12 sm:h-12" />
            </div>
          </motion.main>
        ) : (
          <SkelzLab key="lab" onBack={() => setPhase('hero')} />
        )}
      </AnimatePresence>

      <EarlyAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

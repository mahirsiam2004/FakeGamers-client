import React, { useState, useRef, useEffect } from "react";
import Banner from "../../components/Banner";
import { motion, useScroll, useTransform } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PremiumCard from "../../components/premiumCard/PremiumCard";
import manWithPhone from "../../assets/man-with-phone.webp";
import {
  FaShieldAlt, FaRocket, FaHeadset, FaMicrochip, FaMemory,
  FaApple, FaGooglePlay, FaStar, FaCheckCircle,
  FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcStripe, FaCcApplePay,
  FaPlus, FaArrowRight, FaServer, FaGlobe,
} from "react-icons/fa";
import { Link } from "react-router";

/* ── helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: "easeOut" },
});

const SectionLabel = ({ children }) => (
  <div className="inline-flex items-center gap-2 bg-purple-600/10 border border-purple-600/20 px-4 py-1.5 rounded-full text-purple-400 mb-5">
    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
    <span className="font-orbitron text-[10px] font-bold uppercase tracking-[0.15em]">{children}</span>
  </div>
);

/* ── Parallax wrapper ── */
const ParallaxSection = ({ children, className = "", speed = 0.15 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 blur-[150px] rounded-full" />
      </motion.div>
      {children}
    </div>
  );
};

/* ─────────────────────────────────────────── */
const Home = () => {
  const axiosPublic = useAxiosPublic();
  const [openFaq, setOpenFaq] = useState(null);
  const [billingYearly, setBillingYearly] = useState(false);

  const { data: games = [], isLoading } = useQuery({
    queryKey: ["featured-games"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/games");
      return data.slice(0, 8);
    },
  });

  const features = [
    { icon: <FaMicrochip />, title: "Super Quick Setup",  desc: "Get your server up and running in minutes with our automated deployment system." },
    { icon: <FaMemory />,    title: "Premium Hardware",   desc: "High-performance NVMe SSDs and enterprise-grade CPUs for zero lag gaming." },
    { icon: <FaShieldAlt />, title: "DDoS Protection",    desc: "Advanced mitigation system to keep your game server online 24/7." },
    { icon: <FaHeadset />,   title: "Fast Support",       desc: "Expert technical assistance available whenever you need it, day or night." },
  ];

  const plans = [
    { slots: "4 Slots",  monthly: "3.59",  yearly: "2.99",  old: "9.99"  },
    { slots: "10 Slots", monthly: "5.59",  yearly: "4.79",  old: "15.99" },
    { slots: "20 Slots", monthly: "8.59",  yearly: "7.29",  old: "24.99", best: true },
    { slots: "Custom",   monthly: "15.59", yearly: "12.99", old: "36.99" },
  ];

  const faqs = [
    { q: "What is game hosting?",                   a: "Game hosting provides the server infrastructure needed to run multiplayer games smoothly with low latency and high uptime." },
    { q: "Why do I need game hosting?",              a: "Professional hosting ensures low latency, 24/7 uptime, DDoS protection, and professional management tools for your community." },
    { q: "How do I choose a game hosting provider?", a: "Look for hardware quality, network locations, customer support responsiveness, and transparent pricing with no hidden fees." },
    { q: "What types of games can I host?",          a: "We support a wide range of popular multiplayer titles like Minecraft, Rust, ARK, Valheim, and many more." },
    { q: "What is server latency or ping?",          a: "Latency is the time it takes for data to travel between you and the server. Lower ping means a smoother gaming experience." },
    { q: "Can I manage my server from mobile?",      a: "Yes! Our mobile app lets you start, stop, and configure your server from anywhere in the world." },
  ];

  const reviews = [
    { name: "Ryan D.",    role: "Minecraft Host", text: "The DDoS protection is top-notch. We used to get attacked regularly but since switching, zero downtime.", stars: 5 },
    { name: "Michael S.", role: "Rust Admin",     text: "Fastest hardware I've ever used. My community has never been happier with the performance.", stars: 5 },
    { name: "Robert L.",  role: "ARK Owner",      text: "Support team helped me migrate my entire cluster in under an hour. Incredible service!", stars: 5 },
  ];

  return (
    <div className="bg-[#07071a] text-white overflow-x-hidden">

      {/* ══ HERO ══ */}
      <Banner />

      {/* ══ FEATURES ══ */}
      <ParallaxSection className="py-28 border-y border-purple-900/20">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div {...fadeUp()} className="mb-16 text-center">
            <SectionLabel>Incredible Features</SectionLabel>
            <h2 className="font-orbitron text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
              Premium <span className="text-gray-600">Game Server</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((f, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="group flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-600/10 border border-purple-600/20 rounded-2xl flex items-center justify-center text-purple-400 text-3xl mb-6 group-hover:bg-purple-600/20 group-hover:scale-110 transition-all duration-300">
                  {f.icon}
                </div>
                <h3 className="font-orbitron text-sm font-bold uppercase tracking-wide mb-3 text-white">{f.title}</h3>
                <p className="font-rajdhani text-gray-500 leading-relaxed text-base">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* ══ PRICING ══ */}
      <section className="py-28 bg-[#07071a]">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <SectionLabel>Server Hosting</SectionLabel>
            <h2 className="font-orbitron text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
              Thunder and <span className="text-purple-400">City</span>
            </h2>
            <div className="flex justify-center items-center gap-2 text-yellow-400 mb-8">
              {[1,2,3,4,5].map(i => <FaStar key={i} size={16} />)}
              <span className="font-rajdhani font-bold text-white ml-2 text-lg">4.75</span>
              <span className="font-rajdhani text-gray-500 text-sm">based on 4086 reviews.</span>
            </div>
            {/* Toggle */}
            <div className="flex justify-center items-center gap-4">
              <span className={`font-orbitron text-[11px] font-bold uppercase tracking-widest ${!billingYearly ? "text-white" : "text-gray-500"}`}>Monthly Plan</span>
              <button
                onClick={() => setBillingYearly(b => !b)}
                className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${billingYearly ? "bg-purple-600" : "bg-purple-900/40 border border-purple-800/40"}`}
              >
                <span className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${billingYearly ? "left-8" : "left-1"}`} />
              </button>
              <span className={`font-orbitron text-[11px] font-bold uppercase tracking-widest ${billingYearly ? "text-white" : "text-gray-500"}`}>Yearly Plan</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)}
                className={`pricing-card p-8 relative ${plan.best ? "best" : ""}`}>
                {plan.best && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-5 py-1 rounded-full font-orbitron text-[9px] font-black uppercase tracking-widest shadow-lg shadow-purple-600/40">
                    Best Seller
                  </div>
                )}
                <div className="text-center mb-8">
                  <div className="inline-block bg-purple-900/30 border border-purple-800/30 rounded-xl py-2 px-4 font-orbitron font-black text-white text-xs uppercase mb-5">
                    {plan.slots}
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-start">
                      <span className="font-orbitron text-2xl font-black text-white mt-2">$</span>
                      <span className="font-orbitron text-5xl font-black text-white leading-none">
                        {billingYearly ? plan.yearly : plan.monthly}
                      </span>
                      <span className="font-orbitron text-purple-400 font-black text-sm mt-6">/mo</span>
                    </div>
                    <span className="font-rajdhani text-gray-500 text-sm font-bold mt-1">Normally ${plan.old}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="font-orbitron text-[9px] font-black text-gray-500 uppercase tracking-widest border-b border-purple-900/20 pb-3 mb-4">Top Features</p>
                  <ul className="space-y-3">
                    {["Super Quick Setup", "Premium Hardware", "DDoS Protection", "24/7 Customer Support"].map((f, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <FaCheckCircle className="text-purple-500 flex-shrink-0" size={12} />
                        <span className="font-rajdhani text-gray-300 text-sm font-semibold">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className={`w-full py-3.5 rounded-xl font-orbitron font-bold uppercase tracking-widest text-[10px] transition-all ${
                  plan.best ? "purple-btn text-white" : "bg-purple-900/20 hover:bg-purple-900/40 border border-purple-800/30 text-white"
                }`}>
                  Get {billingYearly ? "Yearly" : "Monthly"} Plan
                </button>
                <p className="font-rajdhani text-center text-[11px] text-gray-600 mt-3 font-semibold">Auto re-news at regular rate</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ UNLOCK SECTION (parallax) ══ */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[40px] overflow-hidden border border-purple-900/30"
            style={{ background: "linear-gradient(135deg, #0d0d2b 0%, #12083a 50%, #0d0d2b 100%)" }}
          >
            {/* Parallax bg image */}
            <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1000&q=80"
                alt="Gaming"
                className="w-full h-full object-cover opacity-20 lg:opacity-35"
                style={{ transform: "scale(1.1)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0d0d2b]" />
            </div>
            <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-purple-600/15 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 p-10 lg:p-20 max-w-2xl text-left">
              <SectionLabel>Start your game</SectionLabel>
              <h2 className="font-orbitron text-4xl lg:text-6xl font-black uppercase tracking-tight leading-tight mb-8 text-left">
                Unlock <br />
                <span className="text-gray-500">Your Gaming</span> <br />
                Full Potential
              </h2>
              <p className="font-rajdhani text-gray-400 mb-10 text-lg leading-relaxed max-w-lg text-left">
                Take control of your gaming experience with our high-performance hosting solutions and pro tools for pro gamers.
              </p>
              <Link to="/games" className="inline-block purple-btn font-orbitron text-white font-bold px-10 py-5 rounded-2xl uppercase tracking-widest text-[11px]">
                Choose Your Game Server Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ REVIEWS ══ */}
      <ParallaxSection className="py-28 bg-[#07071a]">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div {...fadeUp()} className="flex flex-col items-center text-center mb-16">
            <SectionLabel>Customer Reviews</SectionLabel>
            <div className="font-orbitron font-black mb-4 flex items-baseline justify-center gap-3">
              <span className="text-7xl text-white">4.85</span>
              <span className="font-orbitron text-2xl font-black text-gray-500 uppercase tracking-tight">out of 5</span>
            </div>
            <div className="flex gap-1.5 text-purple-500 text-2xl justify-center">
              {[1,2,3,4,5].map(i => <FaStar key={i} />)}
            </div>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}
                className="bg-[#0d0d2b] border border-purple-900/20 p-8 rounded-[24px] hover:border-purple-600/30 transition-all duration-300 flex flex-col">
                <div className="flex gap-1 text-purple-500 mb-5 text-base justify-center">
                  {[1,2,3,4,5].map(j => <FaStar key={j} />)}
                </div>
                <p className="font-rajdhani text-gray-400 italic mb-6 leading-relaxed text-base flex-1 text-center">"{r.text}"</p>
                <div className="flex items-center gap-4 pt-5 border-t border-purple-900/20 mt-auto justify-center">
                  <div className="w-11 h-11 rounded-full bg-purple-600/20 border border-purple-600/30 flex items-center justify-center font-orbitron font-black text-purple-400 text-sm flex-shrink-0">
                    {r.name[0]}
                  </div>
                  <div className="text-left">
                    <div className="font-orbitron font-black uppercase tracking-tight text-white text-xs">{r.name}</div>
                    <div className="font-rajdhani text-xs text-gray-500 font-semibold mt-0.5">{r.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* ══ LOCATIONS ══ */}
      <section className="py-28 border-t border-purple-900/20">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1 relative"
          >
            <div className="absolute -inset-4 bg-purple-600/10 blur-3xl rounded-full pointer-events-none" />
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"
              alt="Servers"
              className="rounded-[28px] w-full object-cover brightness-75 relative z-10 border border-purple-900/20"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <SectionLabel>Server Locations</SectionLabel>
            <h2 className="font-orbitron text-4xl lg:text-6xl font-black uppercase tracking-tight leading-tight mb-8">
              <span className="text-purple-400">25</span> servers available{" "}
              <span className="text-gray-600">worldwide for your game.</span>
            </h2>
            <div className="flex flex-wrap gap-2 mb-8">
              {["London, England", "Paris, France", "Frankfurt, Germany", "Amsterdam, Netherlands", "Stockholm, Sweden", "Madrid, Spain", "Hong Kong, China"].map(l => (
                <span key={l} className="bg-purple-900/20 border border-purple-800/30 px-4 py-2 rounded-full font-rajdhani text-xs font-bold uppercase tracking-widest text-gray-400 hover:border-purple-600/50 hover:text-white transition-all cursor-default">
                  {l}
                </span>
              ))}
            </div>
            <Link to="/games" className="inline-flex items-center gap-2 text-purple-400 font-orbitron text-[11px] font-bold uppercase tracking-widest hover:gap-4 transition-all">
              View All Locations <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══ GAME COLLECTION ══ */}
      <ParallaxSection className="py-28 bg-[#07071a]">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div {...fadeUp()} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <SectionLabel>Most Complete</SectionLabel>
              <h2 className="font-orbitron text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">
                Game <span className="text-gray-600">Collection</span>
              </h2>
            </div>
            <Link to="/games" className="bg-purple-900/20 hover:bg-purple-900/40 border border-purple-800/30 hover:border-purple-600/50 px-8 py-4 rounded-xl font-orbitron font-bold uppercase text-[10px] tracking-widest transition-all">
              View All Games
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? [1,2,3,4,5,6,7,8].map(i => (
                  <div key={i} className="h-80 bg-purple-900/10 animate-pulse rounded-[24px] border border-purple-900/20" />
                ))
              : games.map((game, idx) => (
                  <motion.div key={game._id} {...fadeUp(idx * 0.05)}>
                    <PremiumCard game={game} />
                  </motion.div>
                ))}
          </div>
        </div>
      </ParallaxSection>

      {/* ══ FAQ ══ */}
      <section className="py-28 border-t border-purple-900/20">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <SectionLabel>For you host</SectionLabel>
            <h2 className="font-orbitron text-5xl md:text-7xl font-black uppercase tracking-tight">
              Any <span className="text-purple-400">questions?</span>
            </h2>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {faqs.map((faq, i) => (
              <motion.div key={i} {...fadeUp(i * 0.05)}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full text-left bg-[#0d0d2b] border rounded-2xl overflow-hidden transition-all duration-300 ${
                    openFaq === i ? "border-purple-600/40" : "border-purple-900/20 hover:border-purple-800/40"
                  }`}
                >
                  <div className="flex items-center justify-between p-6">
                    <span className={`font-orbitron text-xs font-bold tracking-wide uppercase transition-colors ${openFaq === i ? "text-purple-300" : "text-white"}`}>
                      {faq.q}
                    </span>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-300 ${
                      openFaq === i ? "bg-purple-600 text-white rotate-45" : "bg-purple-900/30 text-purple-400"
                    }`}>
                      <FaPlus size={11} />
                    </div>
                  </div>
                  {openFaq === i && (
                    <div className="px-6 pb-6 font-rajdhani text-gray-400 text-base leading-relaxed border-t border-purple-900/20 pt-4">
                      {faq.a}
                    </div>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MOBILE APP — man-with-phone image ══ */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[40px] overflow-hidden border border-purple-900/30"
            style={{ background: "linear-gradient(135deg, #0d0d2b 0%, #12083a 60%, #0d0d2b 100%)", minHeight: "380px" }}
          >
            {/* glow */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Man with phone — positioned absolutely on the right */}
            <div className="absolute bottom-0 right-0 h-full flex items-end pointer-events-none select-none">
              <img
                src={manWithPhone}
                alt="Manage from mobile"
                className="h-full max-h-[420px] w-auto object-contain object-bottom relative z-10"
              />
              {/* fade left edge of image into bg */}
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0d0d2b] to-transparent z-20" />
            </div>

            {/* Text — always left-aligned */}
            <div className="relative z-30 p-10 lg:p-14 max-w-lg text-left">
              <SectionLabel>Download App</SectionLabel>
              <h2 className="font-orbitron text-3xl lg:text-5xl font-black uppercase tracking-tight leading-tight mb-8 text-left">
                Manage <br />
                <span className="text-gray-500">your server</span> <br />
                from mobile device
              </h2>
              <div className="flex flex-wrap gap-4">
                <button className="bg-black/80 border border-purple-800/50 hover:border-purple-600/70 px-6 py-3.5 rounded-2xl flex items-center gap-3 hover:bg-purple-900/30 transition-all duration-300">
                  <FaApple size={26} className="text-white flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-orbitron text-[8px] uppercase font-bold text-gray-500 tracking-widest leading-none mb-1">Download on the</div>
                    <div className="font-orbitron text-sm font-black tracking-tight leading-none text-white">App Store</div>
                  </div>
                </button>
                <button className="bg-black/80 border border-purple-800/50 hover:border-purple-600/70 px-6 py-3.5 rounded-2xl flex items-center gap-3 hover:bg-purple-900/30 transition-all duration-300">
                  <FaGooglePlay size={22} className="text-white flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-orbitron text-[8px] uppercase font-bold text-gray-500 tracking-widest leading-none mb-1">Get it on</div>
                    <div className="font-orbitron text-sm font-black tracking-tight leading-none text-white">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ WE ACCEPT ══ */}
      <section className="py-20 border-y border-purple-900/20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div {...fadeUp()}>
            <div className="font-orbitron text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-1">Payment methods</div>
            <h3 className="font-orbitron text-4xl font-black uppercase tracking-tight italic text-white">
              We <span className="text-purple-400">accept</span>
            </h3>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="flex flex-wrap justify-center gap-8 text-gray-600">
            {[FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcStripe, FaCcApplePay].map((Icon, i) => (
              <Icon key={i} size={44} className="hover:text-white transition-colors cursor-pointer" />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

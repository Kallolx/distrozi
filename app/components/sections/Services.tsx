"use client";

import { motion } from "framer-motion";
import { TabletMockup } from "../ui/TabletMockup";
import { 
  RiGlobalLine, 
  RiMoneyDollarCircleLine, 
  RiBarChartGroupedLine, 
  RiFolderMusicLine, 
  RiShieldCheckLine,
  RiArrowRightLine,
  RiSpotifyLine,
  RiAppleLine,
  RiYoutubeLine
} from "react-icons/ri";

const services = [
  {
    id: "distribution",
    title: "Digital Distribution",
    description: "Deliver your catalog to 150+ platforms worldwide with lightning speed and flawless metadata precision.",
    icon: RiGlobalLine,
  },
  {
    id: "royalty",
    title: "Royalty Accounting",
    description: "Automated, transparent royalty splits and payments. Never worry about manual accounting again.",
    icon: RiMoneyDollarCircleLine,
  },
  {
    id: "analytics",
    title: "Analytics & Insights",
    description: "Real-time streaming data, demographic insights, and playlist tracking to power your next move.",
    icon: RiBarChartGroupedLine,
  },
  {
    id: "catalog",
    title: "Catalog Management",
    description: "Organize, update, and manage unlimited releases from a single, intuitive centralized hub.",
    icon: RiFolderMusicLine,
  },
  {
    id: "rights",
    title: "Rights Management",
    description: "Protect your intellectual property with automated Content ID and global rights enforcement.",
    icon: RiShieldCheckLine,
  },
];

const DistributionVisual = () => (
  <div className="w-full h-full flex items-center justify-center relative p-6 sm:p-10">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-gradient-start)_0%,transparent_70%)] opacity-5 pointer-events-none" />
    
    <div className="flex items-center justify-between w-full max-w-lg relative z-10 gap-0">
      {/* Left Node */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-14 h-14 sm:w-20 sm:h-20 shrink-0 rounded-xl bg-white/5 border border-[var(--color-gradient-start)]/30 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.15)] relative z-10"
      >
        <RiFolderMusicLine size={28} className="text-[var(--color-gradient-start)]" />
      </motion.div>
      
      {/* Curved Connectors (SVG) */}
      <div className="flex-1 h-36 sm:h-48 relative mx-[-1px] z-0">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="dist-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-gradient-start)" />
              <stop offset="50%" stopColor="var(--color-gradient-mid)" />
              <stop offset="100%" stopColor="var(--color-gradient-end)" />
            </linearGradient>
          </defs>
          
          {/* Top curve */}
          <motion.path 
            d="M 0 50 C 45 50, 55 12, 100 12" 
            stroke="url(#dist-grad)" 
            strokeWidth="2" 
            fill="none" 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          
          {/* Middle line with microscopic vertical offset to fix horizontal path length bugs */}
          <motion.path 
            d="M 0 50 Q 50 49.9, 100 50" 
            stroke="url(#dist-grad)" 
            strokeWidth="2" 
            fill="none" 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
          />
          
          {/* Bottom curve */}
          <motion.path 
            d="M 0 50 C 45 50, 55 88, 100 88" 
            stroke="url(#dist-grad)" 
            strokeWidth="2" 
            fill="none" 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
          />
        </svg>
      </div>

      {/* Right Column of Nodes */}
      <div className="flex flex-col justify-between h-36 sm:h-48 shrink-0 relative z-10">
        {[
          { icon: RiSpotifyLine, color: "text-[#1DB954]" },
          { icon: RiAppleLine, color: "text-[#FC3C44]" },
          { icon: RiYoutubeLine, color: "text-[#FF0000]" }
        ].map((platform, i) => (
          <motion.div 
            key={i} 
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            viewport={{ once: true }}
            className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.02)]"
          >
            <platform.icon size={22} className={`${platform.color} opacity-80 sm:scale-110`} />
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const RoyaltyVisual = () => (
  <div className="w-full h-full flex items-end justify-center gap-2 sm:gap-4 pt-16 pb-8 sm:pb-12 px-6 sm:px-12 relative">
    {/* Animated background grid lines */}
    <div className="absolute inset-0 flex flex-col justify-between pt-16 pb-12 px-8 sm:px-12 pointer-events-none opacity-20">
      {[1,2,3,4].map(i => (
         <div key={i} className="w-full h-px bg-white/30 border-dashed border-b border-white/20" />
      ))}
    </div>
    
    {[25, 45, 35, 65, 55, 80, 70, 78].map((h, i) => (
      <motion.div 
        key={i} 
        initial={{ height: 0 }} 
        whileInView={{ height: `${h}%` }} 
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
        className="w-6 sm:w-10 rounded-t-sm bg-gradient-to-t from-[var(--color-gradient-start)] via-[var(--color-gradient-mid)] to-[var(--color-gradient-end)] relative group cursor-pointer z-10"
      >
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 + (i * 0.05) }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] sm:text-xs font-mono font-bold text-white bg-black/80 border border-white/10 px-2 py-1 rounded transition-opacity pointer-events-none whitespace-nowrap"
        >
          ${h}k
        </motion.div>
      </motion.div>
    ))}
  </div>
);

const AnalyticsVisual = () => (
  <div className="w-full h-full relative flex flex-col justify-end p-6 sm:p-10">
    <div className="absolute top-8 left-8 z-10">
      <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-sm text-white/50 mb-1">Total Streams</div>
        <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">12,482,900</div>
        <div className="text-sm text-green-400 mt-2 flex items-center gap-1">
          <RiArrowRightLine className="-rotate-45" /> +24.5% this week
        </div>
      </motion.div>
    </div>
    <div className="w-full h-[55%] relative">
      <svg className="w-full h-full absolute inset-0 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
        <motion.path 
          d="M0,80 Q10,70 20,80 T40,50 T60,60 T80,30 T100,10" 
          fill="none" 
          stroke="url(#gradient-stroke)" 
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.path 
          d="M0,80 Q10,70 20,80 T40,50 T60,60 T80,30 T100,10 L100,100 L0,100 Z" 
          fill="url(#gradient-analytics)" 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
        <defs>
          <linearGradient id="gradient-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-gradient-start)" />
            <stop offset="50%" stopColor="var(--color-gradient-mid)" />
            <stop offset="100%" stopColor="var(--color-gradient-end)" />
          </linearGradient>
          <linearGradient id="gradient-analytics" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-gradient-mid)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Interactive data points along the path */}
      {[
        { left: "20%", top: "80%", delay: 0.4 },
        { left: "40%", top: "50%", delay: 0.8 },
        { left: "60%", top: "60%", delay: 1.0 },
        { left: "80%", top: "30%", delay: 1.3 },
        { left: "100%", top: "10%", delay: 1.5 }
      ].map((point, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, scale: 0 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }}
          transition={{ delay: point.delay, type: "spring" }}
          className="absolute w-3 h-3 sm:w-4 sm:h-4 -mt-1.5 -ml-1.5 sm:-mt-2 sm:-ml-2 bg-[var(--color-gradient-mid)] rounded-full shadow-[0_0_15px_var(--color-gradient-mid)] border-2 border-[#0a0a0a] z-10"
          style={{ left: point.left, top: point.top }}
        />
      ))}
      
      {/* Floating Tooltip at the end */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.8, duration: 0.4 }}
        className="absolute top-[0%] right-[5%] -translate-y-[120%] bg-white/10 backdrop-blur-md border border-white/20 p-2 sm:p-3 rounded-lg shadow-xl z-20 flex flex-col gap-1 min-w-[100px]"
      >
        <div className="text-[9px] sm:text-[10px] text-white/50 font-medium uppercase tracking-wider">Peak Listeners</div>
        <div className="text-sm sm:text-base font-bold text-white">142,890</div>
      </motion.div>
    </div>
  </div>
);

const CatalogVisual = () => (
  <div className="w-full h-full flex items-center justify-center p-6 sm:p-10">
    <div className="w-full grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
      {[1,2,3,4,5,6].map((i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="flex flex-col gap-2"
        >
          {/* Album Cover Upload Animation */}
          <div className="w-full aspect-square rounded-xl bg-white/[0.02] border border-white/5 relative overflow-hidden shadow-lg">
            {/* The Gradient Cover rising up like a filling liquid */}
            <motion.div 
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-gradient-to-br from-[var(--color-gradient-start)] to-[var(--color-gradient-mid)] opacity-90"
            />
          </div>
          
          {/* Tiny abstract metadata lines */}
          <div className="w-3/4 h-1.5 bg-white/20 rounded-full mt-1" />
          <div className="w-1/2 h-1 bg-white/10 rounded-full" />
        </motion.div>
      ))}
    </div>
  </div>
);

const RightsVisual = () => (
  <div className="w-full h-full flex flex-col sm:flex-row items-center justify-between p-4 sm:p-10 gap-4 sm:gap-10">
    {/* Left Side: Abstract Asset List */}
    <div className="w-full sm:flex-1 flex flex-col justify-center gap-3 sm:gap-5 h-full">
      {[1, 2, 3].map((i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className="flex items-center gap-4 w-full p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5"
        >
          {/* Abstract Image Placeholder */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/5 border border-white/10 shrink-0" />
          
          {/* Abstract Text Lines */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="w-full max-w-[100px] sm:max-w-[120px] h-2 bg-white/20 rounded-full" />
            <div className="w-2/3 max-w-[60px] sm:max-w-[80px] h-1.5 bg-white/10 rounded-full" />
          </div>

          {/* UI Toggle Switch (Active) */}
          <div className="w-8 h-4 sm:w-10 sm:h-5 rounded-full bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-mid)] relative shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
          </div>
        </motion.div>
      ))}
    </div>

    {/* Right Side: Abstract Fingerprint Scanner */}
    <div className="w-full sm:w-32 h-24 sm:h-full py-4 sm:py-8 rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden flex sm:flex-col items-center justify-center shrink-0">
      {/* Fingerprint Pattern */}
      <div className="w-16 sm:w-16 h-full flex flex-col justify-between opacity-30 mx-auto">
        {[80, 60, 90, 70, 100, 85, 65, 95, 75, 80, 60, 90, 100, 70, 85].map((w, i) => (
          <div 
            key={i} 
            className="h-1 sm:h-1.5 bg-white rounded-full mx-auto" 
            style={{ width: `${w}%` }}
          />
        ))}
      </div>

      {/* Scanning Laser Line */}
      <motion.div 
        className="absolute left-0 w-full h-[2px] bg-[var(--color-gradient-mid)] shadow-[0_0_20px_4px_rgba(236,72,153,0.6)] z-10"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      {/* Glow Wash */}
      <motion.div 
        className="absolute left-0 w-full h-16 bg-gradient-to-b from-transparent via-[var(--color-gradient-mid)]/20 to-transparent pointer-events-none"
        animate={{ top: ["-20%", "100%", "-20%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </div>
  </div>
);

export default function Services() {
  const iconColors = [
    "text-[var(--color-gradient-start)]",
    "text-[var(--color-gradient-mid)]",
    "text-[var(--color-gradient-end)]",
    "text-[var(--color-gradient-start)]",
    "text-[var(--color-gradient-mid)]"
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[var(--color-bg)] overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20 lg:mb-32">
          <h2 className="text-3xl sm:text-5xl tracking-tight text-white mb-6">
            Everything you need to <br className="hidden sm:block" />
            <span className="gradient-text">scale your catalog.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-24 lg:gap-40">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;
            const iconColor = iconColors[index % iconColors.length];

            let Visualizer;
            switch (service.id) {
              case "distribution": Visualizer = DistributionVisual; break;
              case "royalty": Visualizer = RoyaltyVisual; break;
              case "analytics": Visualizer = AnalyticsVisual; break;
              case "catalog": Visualizer = CatalogVisual; break;
              case "rights": Visualizer = RightsVisual; break;
              default: Visualizer = DistributionVisual;
            }

            return (
              <div 
                key={service.id} 
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
              >
                {/* Text Content */}
                <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                  <div className="flex items-center gap-4 mb-5">
                    <Icon size={32} className={`${iconColor} shrink-0`} />
                    <h3 className="text-3xl sm:text-4xl text-white tracking-tight">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-lg text-white/60 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Tablet Mockup */}
                <div className="w-full lg:w-1/2">
                  <TabletMockup>
                    <div className="w-full h-full relative bg-[#050505] flex flex-col font-sans">
                      <Visualizer />
                    </div>
                  </TabletMockup>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

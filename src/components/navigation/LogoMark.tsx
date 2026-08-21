'use client';
import { motion } from 'framer-motion';

export default function LogoMark() {
  return (
    <motion.div
      className="relative h-9 w-9"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="navbar-sos-gradient" x1="40" y1="40" x2="280" y2="280">
            <stop stopColor="#8BFFE5" />
            <stop offset="1" stopColor="#45B9FF" />
          </linearGradient>
        </defs>
        <rect x="20" y="20" width="280" height="280" rx="56" fill="#081327" />
        <motion.rect x="20" y="20" width="280" height="280" rx="56" fill="none" stroke="url(#navbar-sos-gradient)" strokeWidth="8" variants={{ rest: { opacity: 0.9 }, hover: { opacity: 1 } }} />
        <text x="160" y="188" textAnchor="middle" fontSize="94" fontFamily="Segoe UI, Arial, sans-serif" fontWeight="900" fill="url(#navbar-sos-gradient)" letterSpacing="3">SoS</text>
      </svg>
    </motion.div>
  );
}

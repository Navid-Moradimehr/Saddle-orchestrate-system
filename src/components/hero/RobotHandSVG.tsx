'use client';
import { motion } from 'framer-motion';

interface Props {
  theme: 'light' | 'dark';
}

export default function RobotHandSVG({ theme }: Props) {
  const strokeColor = theme === 'dark' ? '#F5F5F5' : '#1A1A1A';

  return (
    <motion.svg
      viewBox="0 0 200 400"
      className="w-[180px] md:w-[220px] lg:w-[280px] h-auto"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Forearm structure */}
      <rect x="78" y="300" width="44" height="80" rx="4" stroke={strokeColor} strokeWidth="2" fill="none" />
      <line x1="78" y1="340" x2="122" y2="340" stroke={strokeColor} strokeWidth="0.8" opacity="0.4" />
      <line x1="78" y1="360" x2="122" y2="360" stroke={strokeColor} strokeWidth="0.8" opacity="0.4" />

      {/* Wrist joint */}
      <rect x="74" y="285" width="52" height="20" rx="6" stroke={strokeColor} strokeWidth="2" fill="none" />
      <circle cx="85" cy="295" r="2.5" className="fill-orange" opacity="0.8">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="115" cy="295" r="2.5" className="fill-orange" opacity="0.8">
        <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Palm plate */}
      <rect x="72" y="170" width="56" height="120" rx="8" stroke={strokeColor} strokeWidth="2" fill="none" />
      <line x1="85" y1="185" x2="115" y2="185" stroke={strokeColor} strokeWidth="0.6" opacity="0.3" />
      <rect x="88" y="220" width="24" height="30" rx="3" stroke={strokeColor} strokeWidth="0.8" fill="none" opacity="0.5" />
      <circle cx="100" cy="235" r="4" className="fill-orange" opacity="0.3" />

      {/* Thumb (mechanical) */}
      <motion.g
        animate={{ rotate: [0, -1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '72px 200px' }}
      >
        <rect x="52" y="195" width="22" height="8" rx="3" stroke={strokeColor} strokeWidth="1.8" fill="none" />
        <rect x="38" y="190" width="16" height="6" rx="2" stroke={strokeColor} strokeWidth="1.5" fill="none" />
        <circle cx="52" cy="199" r="2" className="fill-orange" opacity="0.6" />
      </motion.g>

      {/* Index finger (mechanical segments) */}
      <motion.g
        animate={{ rotate: [0, 1.5, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '85px 170px' }}
      >
        <rect x="81" y="140" width="10" height="32" rx="4" stroke={strokeColor} strokeWidth="1.8" fill="none" />
        <circle cx="86" cy="150" r="2" className="fill-orange" opacity="0.5" />
        <rect x="82" y="112" width="8" height="30" rx="3" stroke={strokeColor} strokeWidth="1.5" fill="none" />
        <circle cx="86" cy="120" r="1.5" className="fill-orange" opacity="0.4" />
        <rect x="84" y="92" width="5" height="22" rx="2" stroke={strokeColor} strokeWidth="1.2" fill="none" />
        <circle cx="86.5" cy="130" r="1.5" stroke={strokeColor} strokeWidth="0.8" fill="none" opacity="0.4" />
      </motion.g>

      {/* Middle finger */}
      <motion.g
        animate={{ rotate: [0, 2, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '100px 170px' }}
      >
        <rect x="96" y="130" width="10" height="42" rx="4" stroke={strokeColor} strokeWidth="1.8" fill="none" />
        <circle cx="101" cy="140" r="2" className="fill-orange" opacity="0.5" />
        <rect x="97" y="100" width="8" height="32" rx="3" stroke={strokeColor} strokeWidth="1.5" fill="none" />
        <circle cx="101" cy="110" r="1.5" className="fill-orange" opacity="0.4" />
        <rect x="99" y="78" width="5" height="24" rx="2" stroke={strokeColor} strokeWidth="1.2" fill="none" />
      </motion.g>

      {/* Ring finger */}
      <motion.g
        animate={{ rotate: [0, 1, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '115px 170px' }}
      >
        <rect x="111" y="135" width="10" height="37" rx="4" stroke={strokeColor} strokeWidth="1.8" fill="none" />
        <circle cx="116" cy="145" r="2" className="fill-orange" opacity="0.5" />
        <rect x="112" y="108" width="8" height="29" rx="3" stroke={strokeColor} strokeWidth="1.5" fill="none" />
        <rect x="114" y="90" width="5" height="20" rx="2" stroke={strokeColor} strokeWidth="1.2" fill="none" />
      </motion.g>

      {/* Pinky */}
      <motion.g
        animate={{ rotate: [0, 0.5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '128px 170px' }}
      >
        <rect x="124" y="148" width="8" height="24" rx="3" stroke={strokeColor} strokeWidth="1.5" fill="none" />
        <circle cx="128" cy="156" r="1.5" className="fill-orange" opacity="0.4" />
        <rect x="125" y="125" width="6" height="25" rx="2" stroke={strokeColor} strokeWidth="1.3" fill="none" />
        <rect x="127" y="112" width="4" height="15" rx="1.5" stroke={strokeColor} strokeWidth="1" fill="none" />
      </motion.g>

      {/* Mechanical lines on palm */}
      <line x1="80" y1="240" x2="100" y2="250" stroke={strokeColor} strokeWidth="0.6" opacity="0.3" />
      <line x1="100" y1="242" x2="120" y2="252" stroke={strokeColor} strokeWidth="0.6" opacity="0.3" />
    </motion.svg>
  );
}

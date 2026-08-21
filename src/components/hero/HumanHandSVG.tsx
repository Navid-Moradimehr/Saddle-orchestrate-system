'use client';
import { motion } from 'framer-motion';

interface Props {
  theme: 'light' | 'dark';
}

export default function HumanHandSVG({ theme }: Props) {
  const strokeColor = theme === 'dark' ? '#F5F5F5' : '#1A1A1A';
  const fillColor = theme === 'dark' ? 'rgba(245,245,245,0.03)' : 'rgba(26,26,26,0.02)';

  return (
    <motion.svg
      viewBox="0 0 200 400"
      className="w-[180px] md:w-[220px] lg:w-[280px] h-auto"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Wrist */}
      <path
        d="M85 380 Q80 340 78 300 Q75 260 78 220"
        stroke={strokeColor}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M115 380 Q120 340 122 300 Q125 260 122 220"
        stroke={strokeColor}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Palm */}
      <path
        d="M70 220 Q68 180 72 150 Q75 120 85 100 Q100 80 120 85 Q140 90 145 110 Q148 130 140 155 Q135 180 130 220"
        stroke={strokeColor}
        strokeWidth="2.5"
        fill={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="78" y1="220" x2="130" y2="220" stroke={strokeColor} strokeWidth="1" opacity="0.4" />

      {/* Thumb */}
      <motion.path
        d="M72 150 Q55 145 42 135 Q30 122 28 105 Q26 88 40 80"
        stroke={strokeColor}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        animate={{ rotate: [0, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '72px 150px' }}
      />

      {/* Index finger */}
      <motion.path
        d="M85 100 Q82 72 80 50 Q78 28 82 15"
        stroke={strokeColor}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        animate={{ rotate: [0, 1.5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '85px 100px' }}
      />

      {/* Middle finger */}
      <motion.path
        d="M98 88 Q96 58 95 35 Q94 12 98 5"
        stroke={strokeColor}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        animate={{ rotate: [0, 2, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '98px 88px' }}
      />

      {/* Ring finger */}
      <motion.path
        d="M115 92 Q116 65 118 42 Q120 20 122 10"
        stroke={strokeColor}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        animate={{ rotate: [0, 1, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '115px 92px' }}
      />

      {/* Pinky */}
      <motion.path
        d="M132 105 Q135 82 138 62 Q140 42 138 30"
        stroke={strokeColor}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        animate={{ rotate: [0, 0.5, 0] }}
        transition={{ duration: 3.3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '132px 105px' }}
      />

      {/* Life line / subtle detail */}
      <path
        d="M90 180 Q100 170 115 168 Q130 170 132 178"
        stroke={strokeColor}
        strokeWidth="0.8"
        fill="none"
        opacity="0.3"
        strokeLinecap="round"
      />

      {/* Small organic detail dots */}
      <circle cx="70" cy="250" r="1.5" fill={strokeColor} opacity="0.3" />
      <circle cx="135" cy="240" r="1" fill={strokeColor} opacity="0.2" />
      <circle cx="68" cy="270" r="1" fill={strokeColor} opacity="0.25" />
    </motion.svg>
  );
}

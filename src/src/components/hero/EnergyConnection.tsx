'use client';

export default function EnergyConnection() {
  return (
    <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-28 md:h-28" aria-hidden="true">
      {/* Outer glow ring */}
      <circle cx="50" cy="50" r="30" fill="none" className="stroke-orange" strokeWidth="0.5" opacity="0.5">
        <animate attributeName="r" values="28;35;28" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Middle ring */}
      <circle cx="50" cy="50" r="18" fill="none" className="stroke-orange" strokeWidth="1" opacity="0.6">
        <animate attributeName="r" values="16;22;16" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite" />
      </circle>

      {/* Inner glow */}
      <circle cx="50" cy="50" r="8" className="fill-orange" opacity="0.4">
        <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Center point */}
      <circle cx="50" cy="50" r="3" className="fill-orange" opacity="0.9">
        <animate attributeName="r" values="2.5;4;2.5" dur="1.5s" repeatCount="indefinite" />
      </circle>

      {/* Orbiting particles */}
      {[0, 120, 240].map((angle, i) => (
        <circle key={i} cx={50} cy={50} r="1.5" className="fill-orange" opacity="0.7">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`${angle} 50 50`}
            to={`${angle + 360} 50 50`}
            dur={`${3 + i * 0.5}s`}
            repeatCount="indefinite"
          />
          <animate attributeName="cx" values="50;58;50" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* Thin energy arcs */}
      {[0, 60, 180, 240].map((angle, i) => (
        <line
          key={`arc-${i}`}
          x1="50"
          y1="50"
          x2={(50 + Math.cos((angle * Math.PI) / 180) * 25).toFixed(4)}
          y2={(50 + Math.sin((angle * Math.PI) / 180) * 25).toFixed(4)}
          className="stroke-orange"
          strokeWidth="0.5"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.1;0.6;0.1" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur={`${5 + i * 0.7}s`}
            repeatCount="indefinite"
          />
        </line>
      ))}
    </svg>
  );
}

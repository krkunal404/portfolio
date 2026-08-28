export default function Logo({ className = 'w-8 h-8' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Dark metallic badge gradient */}
        <linearGradient id="logo-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A1A1E" />
          <stop offset="50%" stopColor="#111114" />
          <stop offset="100%" stopColor="#08080A" />
        </linearGradient>

        {/* Outer rim highlight */}
        <linearGradient id="logo-rim-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#52525B" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#27272A" stopOpacity="0.05" />
        </linearGradient>

        {/* Stem gradient */}
        <linearGradient id="logo-stem-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#D4D4D8" />
        </linearGradient>

        {/* Upper branch gradient */}
        <linearGradient id="logo-upper-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E4E4E7" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>

        {/* Lower branch gradient */}
        <linearGradient id="logo-lower-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4D4D8" />
          <stop offset="100%" stopColor="#9999A1" />
        </linearGradient>

        {/* Soft shadow */}
        <filter id="logo-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Modern squircle badge */}
      <rect
        x="6"
        y="6"
        width="88"
        height="88"
        rx="22"
        fill="url(#logo-bg-grad)"
        filter="url(#logo-shadow)"
      />

      {/* Precision inner hairline rim */}
      <rect
        x="6.75"
        y="6.75"
        width="86.5"
        height="86.5"
        rx="21.25"
        stroke="url(#logo-rim-grad)"
        strokeWidth="1.5"
      />

      {/* Vertical stem — architectural pillar */}
      <rect
        x="26"
        y="23"
        width="11"
        height="54"
        rx="5.5"
        fill="url(#logo-stem-grad)"
      />

      {/* Upper diagonal blade — clean precision vector without any dots */}
      <path
        d="M45 48.5 L73 22.5"
        stroke="url(#logo-upper-grad)"
        strokeWidth="10.5"
        strokeLinecap="round"
      />

      {/* Lower diagonal strut */}
      <path
        d="M45 51.5 L73 77.5"
        stroke="url(#logo-lower-grad)"
        strokeWidth="10.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

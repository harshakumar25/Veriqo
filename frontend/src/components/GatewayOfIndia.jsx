import React from 'react';

/**
 * High-detail architectural vector silhouette of the iconic Gateway of India (Mumbai, Maharashtra).
 * Includes Indo-Saracenic grand central arch, side arches, four octagonal minarets/turrets,
 * dome finials, jali lattice screens, and stepped plinth with warm twilight amber back-glow.
 */
export default function GatewayOfIndia({
  className = '',
  style = {},
  glow = true,
  opacity = 0.9,
  width = '100%',
  height = '100%',
}) {
  return (
    <div
      className={`gateway-of-india-wrapper ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        width,
        height,
        ...style,
      }}
      aria-hidden="true"
    >
      {/* Ambient twilight golden back-glow */}
      {glow && (
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '20%',
            right: '20%',
            height: '70%',
            background:
              'radial-gradient(ellipse at center bottom, rgba(245, 158, 11, 0.45) 0%, rgba(249, 115, 22, 0.22) 45%, transparent 75%)',
            filter: 'blur(32px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      <svg
        viewBox="0 0 600 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          position: 'relative',
          zIndex: 1,
          opacity,
        }}
      >
        <defs>
          {/* Golden Twilight Gradient for stone highlights */}
          <linearGradient id="gatewayStone" x1="300" y1="50" x2="300" y2="420" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#d97706" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#92400e" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#451a03" stopOpacity="0.9" />
          </linearGradient>

          {/* Golden Silhouette / Warm Backlit Gradient */}
          <linearGradient id="gatewaySilhouette" x1="0" y1="100" x2="600" y2="420" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#b45309" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#78350f" stopOpacity="0.8" />
          </linearGradient>

          {/* Shadow Arch gradient */}
          <linearGradient id="archShadow" x1="300" y1="180" x2="300" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#030712" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0b1329" stopOpacity="0.85" />
          </linearGradient>

          {/* Golden Rim Light */}
          <linearGradient id="rimGlow" x1="300" y1="40" x2="300" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── BASE PLINTH & STEPS ── */}
        <rect x="30" y="405" width="540" height="15" rx="3" fill="url(#gatewayStone)" />
        <rect x="50" y="394" width="500" height="12" rx="2" fill="url(#gatewayStone)" />
        <rect x="65" y="384" width="470" height="11" rx="1.5" fill="url(#gatewayStone)" />

        {/* ── MAIN MONUMENT BULK BODY ── */}
        {/* Central Facade block */}
        <path
          d="M100 384 L100 145 L135 145 L135 130 L160 130 L160 145 L440 145 L440 130 L465 130 L465 145 L500 145 L500 384 Z"
          fill="url(#gatewayStone)"
        />

        {/* ── PARAPET & ATTIC CORNICE ── */}
        <rect x="95" y="140" width="410" height="12" rx="2" fill="#fbbf24" fillOpacity="0.75" />
        <rect x="110" y="125" width="380" height="16" fill="url(#gatewayStone)" />
        <rect x="105" y="120" width="390" height="6" rx="1" fill="#fef08a" fillOpacity="0.6" />

        {/* Ornamental crenellations / Merlons across attic */}
        {Array.from({ length: 27 }, (_, i) => (
          <rect
            key={`merlon-${i}`}
            x={120 + i * 13.5}
            y={112}
            width="8"
            height="9"
            rx="1.5"
            fill="#f59e0b"
            opacity="0.8"
          />
        ))}

        {/* ── CENTRAL GRAND INDO-SARACENIC ARCH ── */}
        {/* Arch outer decorative frame */}
        <path
          d="M210 384 L210 240 C210 180 250 155 300 155 C350 155 390 180 390 240 L390 384 Z"
          stroke="#fde047"
          strokeWidth="6"
          strokeOpacity="0.65"
          fill="none"
        />
        {/* Arch main void / portal */}
        <path
          d="M218 384 L218 245 C218 190 255 165 300 165 C345 165 382 190 382 245 L382 384 Z"
          fill="url(#archShadow)"
        />
        {/* Custodial cusped inner arch detailing */}
        <path
          d="M232 384 L232 255 C232 210 262 185 300 185 C338 185 368 210 368 255 L368 384 Z"
          stroke="#f59e0b"
          strokeWidth="2.5"
          strokeDasharray="4 3"
          strokeOpacity="0.75"
          fill="none"
        />

        {/* Central arch back-illumination portal light */}
        <ellipse cx="300" cy="310" rx="65" ry="75" fill="#f59e0b" fillOpacity="0.12" />

        {/* ── JALI / PERFORATED LATTICE WINDOW ABOVE ARCH ── */}
        <circle cx="300" cy="200" r="16" fill="url(#archShadow)" stroke="#f59e0b" strokeWidth="2" strokeOpacity="0.7" />
        <circle cx="300" cy="200" r="10" stroke="#fbbf24" strokeWidth="1.5" strokeOpacity="0.8" fill="none" />
        <circle cx="300" cy="200" r="4" fill="#fef08a" opacity="0.9" />

        {/* ── LEFT & RIGHT SIDE ARCHES (WINGS) ── */}
        {/* Left Side Portal */}
        <path
          d="M125 384 L125 275 C125 240 145 225 170 225 C195 225 215 240 215 275 L215 384 Z"
          fill="url(#archShadow)"
          stroke="#f59e0b"
          strokeWidth="3.5"
          strokeOpacity="0.5"
        />
        {/* Right Side Portal */}
        <path
          d="M385 384 L385 275 C385 240 405 225 430 225 C455 225 475 240 475 275 L475 384 Z"
          fill="url(#archShadow)"
          stroke="#f59e0b"
          strokeWidth="3.5"
          strokeOpacity="0.5"
        />

        {/* Side decorative roundels */}
        <circle cx="170" cy="205" r="9" fill="url(#archShadow)" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.6" />
        <circle cx="430" cy="205" r="9" fill="url(#archShadow)" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.6" />

        {/* ── 4 ICONIC OCTAGONAL CORNER TURRETS / MINARETS ── */}
        {/* Outer Far-Left Turret */}
        <rect x="75" y="115" width="28" height="269" fill="url(#gatewayStone)" />
        <rect x="70" y="110" width="38" height="8" rx="2" fill="#fbbf24" opacity="0.8" />
        {/* Balcony / Chhatri */}
        <path d="M72 110 L76 75 L102 75 L106 110 Z" fill="url(#gatewayStone)" />
        <rect x="74" y="73" width="30" height="4" rx="1" fill="#fef08a" opacity="0.85" />
        {/* Dome / Chhatri top */}
        <path d="M78 73 C78 52 89 42 89 42 C89 42 100 52 100 73 Z" fill="url(#gatewaySilhouette)" />
        {/* Finial spire */}
        <line x1="89" y1="42" x2="89" y2="28" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="89" cy="26" r="2" fill="#fef08a" />

        {/* Inner-Left Flanking Turret */}
        <rect x="185" y="90" width="22" height="294" fill="url(#gatewayStone)" opacity="0.9" />
        <rect x="181" y="85" width="30" height="7" rx="1.5" fill="#fbbf24" opacity="0.85" />
        <path d="M183 85 L186 58 L206 58 L209 85 Z" fill="url(#gatewayStone)" />
        <path d="M187 58 C187 40 196 32 196 32 C196 32 205 40 205 58 Z" fill="url(#gatewaySilhouette)" />
        <line x1="196" y1="32" x2="196" y2="18" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="196" cy="16" r="2" fill="#fef08a" />

        {/* Inner-Right Flanking Turret */}
        <rect x="393" y="90" width="22" height="294" fill="url(#gatewayStone)" opacity="0.9" />
        <rect x="389" y="85" width="30" height="7" rx="1.5" fill="#fbbf24" opacity="0.85" />
        <path d="M391 85 L394 58 L414 58 L417 85 Z" fill="url(#gatewayStone)" />
        <path d="M395 58 C395 40 404 32 404 32 C404 32 413 40 413 58 Z" fill="url(#gatewaySilhouette)" />
        <line x1="404" y1="32" x2="404" y2="18" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="404" cy="16" r="2" fill="#fef08a" />

        {/* Outer Far-Right Turret */}
        <rect x="497" y="115" width="28" height="269" fill="url(#gatewayStone)" />
        <rect x="492" y="110" width="38" height="8" rx="2" fill="#fbbf24" opacity="0.8" />
        {/* Balcony / Chhatri */}
        <path d="M494 110 L498 75 L524 75 L528 110 Z" fill="url(#gatewayStone)" />
        <rect x="496" y="73" width="30" height="4" rx="1" fill="#fef08a" opacity="0.85" />
        {/* Dome / Chhatri top */}
        <path d="M500 73 C500 52 511 42 511 42 C511 42 522 52 522 73 Z" fill="url(#gatewaySilhouette)" />
        {/* Finial spire */}
        <line x1="511" y1="42" x2="511" y2="28" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="511" cy="26" r="2" fill="#fef08a" />

        {/* ── CENTRAL DOME FINIAL / PINNACLE (Visible above center attic) ── */}
        <path d="M280 112 C280 82 300 70 300 70 C300 70 320 82 320 112 Z" fill="url(#gatewaySilhouette)" opacity="0.85" />
        <line x1="300" y1="70" x2="300" y2="48" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
        <circle cx="300" cy="46" r="3" fill="#fef08a" />

        {/* Architectural horizontal string courses / friezes */}
        <line x1="100" y1="210" x2="500" y2="210" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.4" />
        <line x1="100" y1="260" x2="500" y2="260" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.3" />
        <line x1="100" y1="310" x2="500" y2="310" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.3" />
      </svg>
    </div>
  );
}


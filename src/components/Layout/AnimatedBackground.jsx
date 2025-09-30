import React from 'react'
import './AnimatedBackground.css'

const AnimatedBackground = () => {
  return (
    <div className="animated-background">
      {/* Floating light particles */}
      <div className="light-particles">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="light-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>

      {/* Flowing light streams */}
      <div className="light-streams">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="light-stream"
            style={{
              left: `${i * 12.5}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Orbiting light rings */}
      <div className="light-rings">
        <div className="light-ring ring-1">
          <div className="ring-particle"></div>
          <div className="ring-particle"></div>
          <div className="ring-particle"></div>
        </div>
        <div className="light-ring ring-2">
          <div className="ring-particle"></div>
          <div className="ring-particle"></div>
          <div className="ring-particle"></div>
          <div className="ring-particle"></div>
        </div>
        <div className="light-ring ring-3">
          <div className="ring-particle"></div>
          <div className="ring-particle"></div>
        </div>
      </div>

      {/* Pulsing light orbs */}
      <div className="light-orbs">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="light-orb"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Gradient light waves */}
      <div className="light-waves">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>
    </div>
  )
}

export default AnimatedBackground

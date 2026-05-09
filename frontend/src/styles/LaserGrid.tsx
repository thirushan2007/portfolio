"use client"

import React, { useMemo } from "react"
import { motion } from "framer-motion"
import { cn } from "../lib/utils"

export interface LaserGridProps {
  className?: string
  gridColor?: string
  laserColor?: string
  cellCount?: number
  speed?: number
}

export const LaserGrid = React.memo(({
  className,
  gridColor = "#FFFDD0", // Cream Vanilla default
  laserColor = "#B22222", // Crimson default
  cellCount = 20,
  speed = 10
}: LaserGridProps) => {
  const lines = useMemo(() => Array.from({ length: cellCount + 1 }), [cellCount])

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {/* The 3D Grid Perspective Container */}
      <div 
        className="absolute inset-0"
        style={{
          perspective: "500px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div 
          className="absolute inset-0 w-full h-[200%]"
          style={{
            transform: "rotateX(60deg) translateY(-50%)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Grid Lines */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, ${gridColor}40 1px, transparent 1px),
              linear-gradient(to bottom, ${gridColor}40 1px, transparent 1px)
            `,
            backgroundSize: `${100 / cellCount}% ${100 / cellCount}%`,
          }} />

          {/* Vertical Glowing Lasers */}
          {lines.map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-[1px]"
              style={{
                left: `${(i / cellCount) * 100}%`,
                background: `linear-gradient(to bottom, transparent, ${laserColor}, transparent)`,
                boxShadow: `0 0 15px ${laserColor}`,
                opacity: 0.4,
              }}
            />
          ))}

          {/* Horizontal Moving Lasers (Scanning) */}
          <motion.div
            className="absolute left-0 right-0 h-[3px]"
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{
              duration: speed,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: `linear-gradient(to right, transparent, ${laserColor}, transparent)`,
              boxShadow: `0 0 35px 5px ${laserColor}`,
              zIndex: 1,
            }}
          />
          
          <motion.div
            className="absolute left-0 right-0 h-[3px]"
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{
              duration: speed,
              repeat: Infinity,
              ease: "linear",
              delay: speed / 2
            }}
            style={{
              background: `linear-gradient(to right, transparent, ${laserColor}, transparent)`,
              boxShadow: `0 0 35px 5px ${laserColor}`,
              zIndex: 1,
            }}
          />
        </div>
      </div>

      {/* Radial Gradient overlay to fade the edges */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 20%, var(--bg) 80%)"
        }}
      />
      
      {/* Bottom fade for grounding */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{
          background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)"
        }}
      />
    </div>
  )
})

LaserGrid.displayName = "LaserGrid"

export default LaserGrid

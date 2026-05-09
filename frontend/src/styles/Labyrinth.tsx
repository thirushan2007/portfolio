"use client"

import React, { useMemo } from "react"
import { motion } from "framer-motion"
import { cn } from "../lib/utils"

export interface LabyrinthProps {
  className?: string
  color?: string
  strokeWidth?: number
  cellCount?: number
}

export const Labyrinth = React.memo(({
  className,
  color = "#B22222", // Crimson default
  strokeWidth = 1,
  cellCount = 12
}: LabyrinthProps) => {
  const grid = useMemo(() => {
    const paths = []
    for (let i = 0; i < cellCount; i++) {
      for (let j = 0; j < cellCount; j++) {
        // Randomly decide between two diagonal lines to create a maze pattern
        if (Math.random() > 0.5) {
          paths.push(`M ${i * 10} ${j * 10} L ${(i + 1) * 10} ${(j + 1) * 10}`)
        } else {
          paths.push(`M ${(i + 1) * 10} ${j * 10} L ${i * 10} ${(j + 1) * 10}`)
        }
      }
    }
    return paths
  }, [cellCount])

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <svg
        viewBox={`0 0 ${cellCount * 10} ${cellCount * 10}`}
        className="w-full h-full opacity-70"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 2px ${color})` }}>
          {grid.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 1, 0],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "easeInOut"
              }}
            />
          ))}
        </g>
      </svg>

      {/* Decorative Overlay gradients */}
      <div className="absolute inset-0 bg-radial-fade" style={{
        background: "radial-gradient(circle at 50% 50%, transparent 0%, var(--bg) 90%)"
      }} />
    </div>
  )
})

Labyrinth.displayName = "Labyrinth"

export default Labyrinth

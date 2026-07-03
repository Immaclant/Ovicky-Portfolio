import { motion } from "framer-motion";
import { useState } from "react";

function createParticles(count) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      duration: 20 + Math.random() * 20,
      delay: Math.random() * 5,
    });
  }
  return arr;
}

export function AnimatedBackground({
  className = "",
  particleCount = 50,
  color = "rgba(251, 191, 36, 0.4)",
}) {
  const [particles] = useState(() => createParticles(particleCount));

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: color,
            opacity: particle.opacity,
          }}
          initial={false}
          animate={{
            x: particle.speedX * 100,
            y: particle.speedY * 100,
            scale: [1, 1.5, 1],
            opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
    </div>
  );
}

export function GradientOrb({
  className = "",
  size = "lg",
  color = "primary",
  blur = "3xl",
}) {
  const sizes = {
    sm: "w-48 h-48",
    md: "w-72 h-72",
    lg: "w-96 h-96",
    xl: "w-[300px] h-[300px]",
  };

  const colors = {
    primary: "bg-primary/20",
    secondary: "bg-blue-500/20",
    accent: "bg-pink-500/20",
  };

  const blurs = {
    xl: "blur-xl",
    "2xl": "blur-2xl",
    "3xl": "blur-3xl",
  };

  return (
    <motion.div
      className={`${sizes[size]} ${colors[color]} ${blurs[blur]} rounded-full absolute ${className}`}
      initial={false}
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

import { forwardRef } from "react";
import { motion } from "framer-motion";

const sizeStyles = {
  sm: "py-16 md:py-20",
  md: "py-20 md:py-28",
  lg: "py-24 md:py-32",
  xl: "py-28 md:py-40",
  full: "min-h-screen flex items-center justify-center",
};

const backgroundStyles = {
  default: "bg-slate-950",
  muted: "bg-slate-900/50",
  gradient: "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950",
  dark: "bg-black",
  pattern:
    "bg-slate-950 relative before:absolute before:inset-0 before:bg-[url('/grid.svg')] before:opacity-5",
};

export const Section = forwardRef(
  (
    { children, size = "md", background = "default", className = "", id, ...props },
    ref,
  ) => (
    <motion.section
      ref={ref}
      id={id}
      className={`relative w-full ${sizeStyles[size]} ${backgroundStyles[background]} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      {...props}
    >
      {children}
    </motion.section>
  ),
);

Section.displayName = "Section";

const containerSizes = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[80rem]",
  full: "max-full",
};

export const Container = forwardRef(
  ({ children, size = "lg", className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`mx-auto px-4 sm:px-6 lg:px-8 ${containerSizes[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  ),
);

Container.displayName = "Container";

export const SectionHeader = ({
  title,
  subtitle,
  description,
  align = "center",
  className = "",
}) => (
  <div className={`text-${align} ${className}`}>
    {subtitle && (
      <motion.span
        className="inline-block text-primary font-medium tracking-widest uppercase text-sm mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {subtitle}
      </motion.span>
    )}
    <motion.h2
      className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-100 tracking-tight"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p
        className="mt-4 md:mt-6 text-slate-400 text-lg max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {description}
      </motion.p>
    )}
  </div>
);

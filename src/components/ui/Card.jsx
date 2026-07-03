import { motion } from "framer-motion";
import { forwardRef } from "react";

export const Card = forwardRef(
  (
    {
      children,
      variant = "default",
      hover = true,
      padding = "md",
      className = "",
      ...props
    },
    ref,
  ) => {
    const variants = {
      default: "bg-slate-900/50 backdrop-blur-sm border border-slate-800/50",
      glass: "bg-slate-900/30 backdrop-blur-md border border-slate-800/30",
      elevated:
        "bg-slate-900/70 backdrop-blur-lg border border-slate-800/50 shadow-xl",
    };

    const paddings = {
      none: "",
      sm: "p-4 sm:p-6",
      md: "p-6 sm:p-8",
      lg: "p-8 sm:p-10",
    };

    const hoverStyles = hover
      ? "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
      : "";

    return (
      <motion.div
        ref={ref}
        className={`rounded-2xl ${variants[variant]} ${paddings[padding]} ${hoverStyles} transition-all duration-500 ${className}`}
        whileHover={hover ? { y: -4, transition: { duration: 0.3 } } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

Card.displayName = "Card";

export const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = "", ...props }) => (
  <h3
    className={`text-xl font-semibold text-slate-100 ${className}`}
    {...props}
  >
    {children}
  </h3>
);

export const CardDescription = ({ children, className = "", ...props }) => (
  <p className={`text-slate-400 mt-1 ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({ children, className = "", ...props }) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = "", ...props }) => (
  <div
    className={`mt-6 pt-4 border-t border-slate-800/50 flex items-center gap-4 ${className}`}
    {...props}
  >
    {children}
  </div>
);

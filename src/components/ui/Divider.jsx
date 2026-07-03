import { motion } from "framer-motion";
import { forwardRef } from "react";

export const Divider = forwardRef(
  (
    { variant = "default", label, className = "", ...props },
    ref,
  ) => {
    const variants = {
      default: "border-slate-800",
      gradient:
        "border-transparent bg-gradient-to-r from-transparent via-primary/50 to-transparent h-px",
      dashed: "border-slate-800 border-dashed",
    };

    if (label) {
      return (
        <div
          className="flex items-center gap-4 w-full"
          role="separator"
          aria-label={label}
        >
          <motion.hr
            ref={ref}
            className={`flex-1 ${variants[variant]}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            {...props}
          />
          <span className="text-slate-500 text-sm font-medium whitespace-nowrap">
            {label}
          </span>
          <motion.hr
            className={`flex-1 ${variants[variant]}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          />
        </div>
      );
    }

    return (
      <motion.hr
        ref={ref}
        className={`w-full ${variants[variant]} ${className}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        {...props}
      />
    );
  },
);

Divider.displayName = "Divider";

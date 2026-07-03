import { motion } from "framer-motion";
import { forwardRef } from "react";

export const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className = "",
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary:
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40",
      secondary:
        "bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700 hover:border-slate-600",
      outline:
        "bg-transparent text-slate-100 border-2 border-slate-600 hover:border-primary hover:text-primary hover:bg-primary/5",
      ghost:
        "bg-transparent text-slate-300 hover:text-slate-100 hover:bg-slate-800/50",
      gradient:
        "bg-gradient-to-r from-primary to-amber-500 text-primary-foreground hover:from-primary/90 hover:to-amber-500/90 shadow-lg shadow-primary/25",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm gap-1.5",
      md: "px-6 py-3 text-base gap-2",
      lg: "px-8 py-4 text-lg gap-2.5",
      xl: "px-10 py-5 text-xl gap-3",
    };

    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none";

    const hoverStyles =
      "hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] active:translate-y-0";

    return (
      <motion.button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${hoverStyles} ${fullWidth ? "w-full" : ""} ${className}`}
        disabled={disabled || loading}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {loading ? (
          <>
            <motion.span
              className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  },
);

Button.displayName = "Button";

export const IconButton = forwardRef(
  ({ children, size = "md", className = "", ...props }, ref) => {
    const sizes = {
      sm: "w-9 h-9",
      md: "w-11 h-11",
      lg: "w-13 h-13",
    };

    return (
      <motion.button
        ref={ref}
        className={`${sizes[size]} inline-flex items-center justify-center rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-slate-100 border border-slate-700 hover:border-slate-600 transition-all duration-300 ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

IconButton.displayName = "IconButton";

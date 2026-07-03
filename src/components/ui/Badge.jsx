import { motion } from "framer-motion";
import { forwardRef } from "react";

export const Badge = forwardRef(
  (
    {
      children,
      variant = "default",
      size = "md",
      dot = false,
      className = "",
      ...props
    },
    ref,
  ) => {
    const variants = {
      default: "bg-slate-800 text-slate-300 border border-slate-700",
      primary: "bg-primary/20 text-primary border border-primary/30",
      secondary: "bg-slate-800 text-slate-300 border border-slate-700",
      success: "bg-green-500/20 text-green-400 border border-green-500/30",
      warning: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
      outline: "bg-transparent text-slate-300 border border-slate-600",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base",
    };

    return (
      <motion.span
        ref={ref}
        className={`inline-flex items-center gap-1.5 rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        {...props}
      >
        {dot && (
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-current"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        {children}
      </motion.span>
    );
  },
);

Badge.displayName = "Badge";

const statusConfig = {
  published: { variant: "success", label: "Published" },
  "in-progress": { variant: "warning", label: "In Progress" },
  draft: { variant: "secondary", label: "Draft" },
  accepted: { variant: "primary", label: "Accepted" },
  submitted: { variant: "warning", label: "Submitted" },
};

export const StatusBadge = ({ status, ...props }) => {
  const config = statusConfig[status.toLowerCase()] || {
    variant: "default",
    label: status,
  };

  return (
    <Badge
      variant={config.variant}
      dot={["in-progress", "submitted"].includes(status.toLowerCase())}
      {...props}
    >
      {config.label}
    </Badge>
  );
};

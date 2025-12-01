import React from "react";

import { motion } from "framer-motion";

interface Props {
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function NewProductModalStage({
  isActive,
  children,
  className,
}: Props) {
  if (!isActive) return null;
  return (
    <motion.div
      initial={{ opacity: 0, translateX: "100%", pointerEvents: "none" }}
      animate={{ opacity: 1, translateX: 0, pointerEvents: "all" }}
      exit={{ opacity: 0, translateX: "-100%", pointerEvents: "none" }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

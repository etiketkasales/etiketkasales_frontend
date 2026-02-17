import { AnimatePresence, motion } from "framer-motion";

interface Props {
  isActive: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function OrderStageWrapper({
  isActive,
  children,
  className,
}: Props) {
  return (
    <AnimatePresence initial={false}>
      <motion.div
        initial={{ opacity: 0, scaleY: 1, height: "auto" }}
        animate={{ opacity: 1, scaleY: 1, height: "auto" }}
        exit={{ scaleY: 0, opacity: 0, height: "0px" }}
        transition={{ duration: 0.6 }}
        style={{ transformOrigin: "top center" }}
        className={className}
      >
        {isActive && children}
      </motion.div>
    </AnimatePresence>
  );
}

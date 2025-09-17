import { motion } from "framer-motion";

const Firework = ({ x, y }: { x: number; y: number }) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: y, left: x }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: [1, 2, 0.5], opacity: [1, 0.8, 0] }}
      transition={{ duration: 3, ease: "easeOut" }}
    >
      <div className="relative w-8 h-8">
        {[...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: ["#F08022", "#5FA242", "#00539F"][i % 3],
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: Math.cos((i * Math.PI) / 4) * 50,
              y: Math.sin((i * Math.PI) / 4) * 50,
              opacity: 0.8,
            }}
            transition={{ duration: 1.5 }}
          />
        ))}
      </div>
    </motion.div>
  );
};
export default Firework;

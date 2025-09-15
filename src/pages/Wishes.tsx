import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WISHES = [
  { id: 1, text: "Chúc mừng thành công rực rỡ" },
  { id: 2, text: "Chúc mừng thành công" },
  { id: 3, text: "Chúc mừng thành công" },
  { id: 4, text: "Chúc mừng thành công" },
  { id: 5, text: "Chúc mừng thành công" },
  { id: 6, text: "Chúc mừng thành công" },
  { id: 7, text: "Chúc mừng thành công" },
  { id: 8, text: "Chúc mừng thành công" },
  { id: 9, text: "Chúc mừng thành công" },
  { id: 10, text: "Chúc mừng thành công" },
  { id: 11, text: "Chúc mừng thành công" },
  { id: 12, text: "Chúc mừng thành công" },
];

export default function WishesScreen() {
  const [wishes, setWishes] = useState<{ id: number; text: string }[]>(WISHES);
  const [input, setInput] = useState("");
  const [id, setId] = useState(0);

  const handleSend = () => {
    if (!input.trim()) return;
    const newWish = { id, text: input };
    setId((prev) => prev + 1);
    setWishes((prev) => [...prev, newWish]);

    setTimeout(() => {
      setWishes((prev) => prev.filter((w) => w.id !== newWish.id));
    }, 5000);

    setInput("");
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#002855] to-[#005f99] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <AnimatePresence>
          {wishes.map((wish) => (
            <motion.div
              key={wish.id}
              initial={{
                opacity: 1,
                y: Math.random() * window.innerHeight,
                x: Math.random() * window.innerWidth,
              }}
              animate={{
                opacity: 1,
                y: -100,
                x: Math.random() * window.innerWidth,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 10, ease: "easeOut" }}
              className="absolute bg-white text-black p-3 font-bold text-md rounded-4xl "
            >
              🎉{wish.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {/* <div className="bg-white p-4 b-0 rounded-lg shadow-lg z-10">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập lời chúc..."
          className="border px-2 py-1 rounded mr-2"
        />
        <button
          onClick={handleSend}
          className="bg-pink-500 text-white px-3 py-1 rounded"
        >
          Gửi
        </button>
      </div> */}
    </div>
  );
}

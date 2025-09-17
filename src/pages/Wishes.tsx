import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Wish } from "@/types/wishes";
import { SignalRContext } from "@/context/signalr-context";

export default function WishesScreen() {
  const [wishes, setWishes] = useState<Wish[]>([]);

  SignalRContext.useSignalREffect(
    "ReceiveWish",
    (wish: Wish) => {
      const id = Date.now().toString();
      const newWish = {
        ...wish,
        id,
        x: Math.random() * (window.innerWidth - 320),
        y: Math.random() * (window.innerHeight - 200),
      };
      setWishes((prev) => {
        const updated = [...prev, newWish];
        if (updated.length > 20) {
          updated.shift();
        }
        return updated;
      });

      setTimeout(() => {
        setWishes((prev) => prev.filter((w) => w.id !== id));
      }, 5000);
    },
    []
  );

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-gradient-to-br
     from-[#5FA242]/30 via-[#F08022]/30 to-[#00539F]/100 bg-amber-50"
      // style={{
      //   backgroundImage: "url('/public/bg3.png')",
      // }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br
     from-[#5FA242]/10 via-[#F08022]/30 to-[#00539F]/30 bg-black/30"
      />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <AnimatePresence>
          {wishes?.map((wish) => (
            <motion.div
              key={wish.user}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
              style={{
                top: wish.y,
                left: wish.x,
              }}
              className="absolute w-[320px] bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden bg-cover"
            >
              {/* <div className="absolute inset-0 bg-black/20" /> */}
              <div className="flex items-center gap-3 py-2 px-3 border-gray-100 bg-gradient-to-r from-[#5FA242]/10 to-[#00539F]/10">
                {/* <div className="flex items-center gap-3 my-auto justify-center"> */}
                <img
                  src={"/public/ava1.svg"}
                  alt={wish?.id}
                  className="w-10 h-10 rounded-full border border-gray-100"
                />
                <div className="flex gap-2 text-sm text-center ">
                  <span className="text-gray-500">Gửi từ</span>
                  <span className="font-semibold text-[#00539F]">
                    {wish?.user}
                  </span>
                </div>
              </div>
              <div className="py-2 px-4 text-center">
                <p className="text-gray-800 leading-relaxed whitespace-pre-line text-sm font-medium">
                  {wish.message}
                </p>
              </div>
              {/* <div className="p-3 text-xs text-[#5FA242] border-t border-gray-100 font-semibold text-right"> */}
              <div
                // className="p-3 text-xs text-[#5FA242] font-semibold text-right"
                className="flex m-auto justify-end p-3 border-t border-gray-100"
              >
                <img src="/public/bg3.png" className="w-5" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

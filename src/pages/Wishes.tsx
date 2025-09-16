import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Wish } from "@/types/wishes";
import { SignalRContext } from "@/context/signalr-context";

export default function WishesScreen() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  console.log("wishes", wishes);
  // SignalRContext.useSignalREffect(
  //   "ReceiveWish",
  //   (wish: Wish) => {
  //     setWishes((prev) => [...prev, wish]);
  //   },
  //   []
  // );
  SignalRContext.useSignalREffect(
    "ReceiveWish",
    (wish: Wish) => {
      setWishes((prev) => {
        const updated = [...prev, wish];
        return updated.slice(-20);
      });
      setTimeout(() => {
        setWishes((prev) => prev.filter((w) => w !== wish));
      }, 3000);
    },
    []
  );

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-gradient-to-br
     from-[#5FA242]/30 via-[#F08022]/30 to-[#00539F]/100 bg-amber-50 bg-cover"
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
              initial={{
                opacity: 1,
                y: 50,
                x: Math.random() * window.innerWidth,
              }}
              animate={{
                opacity: 1,
                y: Math.random() * window.innerHeight,
                x: Math.random() * window.innerWidth,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 10, ease: "easeOut" }}
              className="absolute w-[320px]  bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden bg-cover"
              style={{
                backgroundImage: "url('/public/bg.jpg')",
              }}
            >
              {/* <div className="absolute inset-0 bg-black/20" /> */}

              {/* 🎉{wish.text} */}
              {/* <div className="flex items-center gap-3 py-3 px-4 border-gray-100 bg-gradient-to-r from-[#5FA242]/10 to-[#00539F]/10"> */}
              <div className="flex items-center gap-3 my-auto justify-center">
                {/* <img
                  src={"/public/bg.jpg"}
                  alt={wish.name}
                  className="w-10 h-10 rounded-full border"
                /> */}
                {/* <div className="flex gap-2 text-sm "> */}
                <div className="flex gap-2 text-sm text-center mt-8 ">
                  <span className="text-gray-500">Gửi từ:</span>
                  <span className="font-semibold text-[#00539F]">
                    {wish?.user}
                  </span>
                  {/* </div> */}
                </div>
              </div>
              <div className="py-2 px-4 text-center">
                <p className="text-gray-800 leading-relaxed whitespace-pre-line text-sm font-medium">
                  {wish.message}
                </p>
              </div>
              {/* <div className="p-3 text-xs text-[#5FA242] border-t border-gray-100 font-semibold text-right"> */}
              <div className="p-3 text-xs text-[#5FA242] font-semibold text-right">
                🎉 IIG VN Wishes
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

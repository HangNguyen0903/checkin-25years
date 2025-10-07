import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Wish } from "@/types/wishes";
import { SignalRContext } from "@/context/signalr-context";
import Firework from "@/components/Firework";
import { TvMinimal, X } from "lucide-react";
import { mockWishes } from "@/mockData/wishes";

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

  const goFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };
  useEffect(() => {
    const users = ["Hằng", "Minh", "Lan", "Tuấn", "Linh", "Nam"];

    const interval = setInterval(() => {
      const id = Date.now().toString();
      const newWish = {
        id,
        user: users[Math.floor(Math.random() * users.length)],
        message: mockWishes[Math.floor(Math.random() * mockWishes.length)],
        x: Math.random() * (window.innerWidth - 320),
        y: Math.random() * (window.innerHeight - 200),
      };

      setWishes((prev) => {
        const updated = [...prev, newWish];
        if (updated.length > 20) updated.shift();
        return updated;
      });

      // Xóa sau 5 giây
      setTimeout(() => {
        setWishes((prev) => prev.filter((w) => w.id !== id));
      }, 5000);
    }, 2000); // mỗi 2 giây tạo 1 wish mới

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-white"
      style={{
        backgroundImage: "url('/public/bg3.png')",
        backgroundSize: "300px 200px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <AnimatePresence>
          {wishes?.map((wish) => (
            <motion.div
              key={wish.user}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
              // style={{
              //   top: wish.y,
              //   left: wish.x,
              // }}
              style={{
                top: wish.y,
                left: wish.x,
                backgroundImage: "url('/bg_1.jpg')", // ✅ ảnh nền cho card
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="absolute w-[320px] bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden bg-cover"
            >
              <div className="flex justify-center items-center gap-3 py-3 px-3 border-gray-100 ">
                {/* <img
                  src={"/public/ava1.svg"}
                  alt={wish?.id}
                  className="w-10 h-10 rounded-full border border-gray-100"
                /> */}
                <div className="flex gap-2 text-sm text-center">
                  <span className="text-gray-500">From: </span>
                  <span className="font-semibold text-[#00539F]">
                    {wish?.user}
                  </span>
                </div>
              </div>
              <div className=" px-4 text-center">
                <p className="text-gray-800 leading-relaxed whitespace-pre-line text-sm font-medium">
                  {wish.message}
                </p>
              </div>
              <div className="flex m-auto justify-end p-3 border-gray-100">
                <img src="/public/bg3.png" className="w-5" />
              </div>
              <div className="absolute top-0 z-10">
                <Firework x={100} y={50} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="absolute bottom-4 right-4 z-50 flex gap-2">
        <TvMinimal onClick={goFullScreen} />
        <X onClick={exitFullScreen} />
      </div>
    </div>
  );
}

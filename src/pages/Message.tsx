import ButtonField from "@/components/ui/Button/ButtonField";
import InputField from "@/components/ui/Input/InputField";
import { mockWishes } from "@/mockData/wishes";
import { createWish } from "@/services/wishesService";
import type { Wish } from "@/types/wishes";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Message = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Wish>({
    defaultValues: { user: "", message: "" },
  });
  const [success, setSucess] = useState("");

  const onSubmit = async (data: Wish) => {
    try {
      await createWish(data);
      setSucess("Gửi lời chúc thành công!");
      reset({ user: "", message: "" });
      setTimeout(() => {
        setSucess("");
      }, 5000);
    } catch {
      alert("Gửi lời chúc thất bại!");
    }
  };

  const handleSendMock = async () => {
    for (let i = 0; i < 100; i++) {
      const randomMessage =
        mockWishes[Math.floor(Math.random() * mockWishes.length)];
      const fakeWish: Wish = {
        user: `User_${i + 1}`,
        message: randomMessage,
      };
      setTimeout(() => {
        createWish(fakeWish).catch(console.error);
      }, i * 700);
      setSucess("Gửi lời chúc thành công!");
      setTimeout(() => {
        setSucess("");
      }, 5000);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br
        from-[#5FA242]/30 via-[#F08022]/30 to-[#00539F]/100"
    >
      <div className="bg-white/90 backdrop-blur-md md:p-8 p-6 rounded-2xl shadow-xl md:w-[400px] w-[300px] space-y-4 border border-gray-100">
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
          <div className="text-center">
            <div className="flex m-auto justify-center">
              <img src="/public/bg3.png" className="w-20 mb-3" />
            </div>
            <p className="text-gray-600 md:text-sm text-xs">
              🎉 Gửi một lời chúc đến IIG 🎉
            </p>
          </div>
          <InputField
            placeholder="Tên của bạn"
            registration={register("user", {
              required: "Nhập tên của bạn",
            })}
            required
          />
          <InputField
            type="textarea"
            placeholder="Nhập lời chúc..."
            registration={register("message", {
              required: "Nhập lời chúc ",
            })}
            required
          />
          <ButtonField
            type="submit"
            color="primary"
            text="💌 Gửi lời chúc"
            fullWidth
            className="rounded-xl py-3 font-semibold text-lg text-white bg-gradient-to-r from-[#5FA242] via-[#F08022] to-[#00539F] hover:opacity-90 transition"
          />
        </form>
        <ButtonField
          type="submit"
          color="primary"
          text="Gửi 100 lời chúc ngẫu nhiên"
          fullWidth
          onClick={handleSendMock}
          className="rounded-xl py-3 font-semibold text-lg text-white bg-gradient-to-r from-[#0a6bc7] via-[#085094] to-[#022f58] hover:opacity-90 transition"
        />
        <div
          className={`text-center ${
            success ? `text-green-600` : `text-red-500`
          } text-sm`}
        >
          {success
            ? success
            : errors?.user?.message ?? errors?.message?.message}
        </div>
      </div>
    </div>
  );
};
export default Message;

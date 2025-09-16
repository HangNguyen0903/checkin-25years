import ButtonField from "@/components/ui/Button/ButtonField";
import InputField from "@/components/ui/Input/InputField";
import { createWish } from "@/services/wishesService";
import type { Wish } from "@/types/wishes";
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

  const onSubmit = async (data: Wish) => {
    try {
      await createWish(data);
      alert("Gửi lời chúc thành công");
      reset({ user: "", message: "" });
    } catch {
      alert("Gửi lời chúc thất bại!");
    }
  };

  const simulateManyWishes = async () => {
    for (let i = 1; i <= 30; i++) {
      setTimeout(() => {
        const fakeWish: Wish = {
          user: `User ${i}`,
          message: `Lời chúc test số ${i}`,
        };
        console.log("fakeWish", fakeWish);
      });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br
        from-[#5FA242]/30 via-[#F08022]/30 to-[#00539F]/100"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/90 backdrop-blur-md md:p-8 p-6 rounded-2xl shadow-xl md:w-[400px] w-[300px] space-y-4 border border-gray-100"
      >
        <div className="text-center">
          <h1 className="md:text-3xl text-xl font-extrabold text-[#00539F] mb-2">
            🎉 Lời chúc 🎉
          </h1>
          <p className="text-gray-600 md:text-sm text-xs">
            Gửi một lời chúc đến IIG Việt Nam
          </p>
        </div>
        <InputField
          placeholder="Tên của bạn"
          registration={register("user", {
            required: "Nhập tên của bạn",
          })}
          required
          className=""
        />
        <InputField
          type="textarea"
          placeholder="Nhập lời chúc"
          registration={register("message", {
            required: "Nhập lời chúc",
          })}
          required
          error={errors.message}
        />
        <ButtonField
          type="submit"
          color="primary"
          text="💌 Gửi lời chúc"
          fullWidth
          className="rounded-xl py-3 font-semibold text-lg text-white bg-gradient-to-r from-[#5FA242] via-[#F08022] to-[#00539F] hover:opacity-90 transition"
        />
      </form>
    </div>
  );
};
export default Message;

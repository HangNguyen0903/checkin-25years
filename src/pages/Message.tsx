import ButtonField from "@/components/ui/Button/ButtonField";
import InputField from "@/components/ui/Input/InputField";
import type { Wishes } from "@/types/wishes";
import { useForm } from "react-hook-form";
const Message = () => {
  const {
    register,
    handleSubmit,
    // reset,
    // formState: { errors },
  } = useForm<Wishes>({
    defaultValues: {},
  });
  const onSubmit = async () => {
    try {
      alert("Gửi lời chúc thành công!");
    } catch {
      alert("Đăng nhập thất bại!");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-md w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          🎉 Lời chúc mừng 🎉
        </h1>
        <InputField
          type="textarea"
          placeholder="Nhập nội dung..."
          registration={register("message", {
            required: "Nhập lời chúc",
          })}
          required
        />
        <ButtonField
          type="submit"
          color="primary"
          text="Gửi lời chúc"
          fullWidth
        />
      </form>
    </div>
  );
};
export default Message;

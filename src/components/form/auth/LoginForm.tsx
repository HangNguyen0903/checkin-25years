import { useForm } from "react-hook-form";
import InputField from "../../ui/Input/InputField";
import { useNavigate } from "react-router-dom";
import ButtonField from "../../ui/Button/ButtonField";
import { Lock, User } from "lucide-react";
import type { LoginFormInputs } from "../../../types/auth";
import { login } from "@/api/auth";
import { defaultLogin } from "@/constants/defaultValue";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: defaultLogin,
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await login.post("/api/auth/login", data);
      if (res?.data?.token) {
        localStorage.setItem("token", res.data.token);
        alert("Đăng nhập thành công!");
        // toast.success("Đăng nhập thành công!");
        navigate("/events");
      } else {
        alert(res.data.detail);
      }
    } catch {
      alert("Đăng nhập thất bại!");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-xl shadow-md w-96 space-y-4"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h1>
      <InputField
        label="Tên đăng nhập"
        type="text"
        placeholder="Nhập tên đăng nhập"
        registration={register("userName", {
          required: "Tên đăng nhập là bắt buộc",
        })}
        error={errors.userName}
        leftIcon={<User size={16} />}
        required
      />
      <InputField
        label="Mật khẩu"
        type="password"
        placeholder="Nhập mật khẩu"
        registration={register("password", {
          required: "Mật khẩu là bắt buộc",
        })}
        error={errors.password}
        leftIcon={<Lock size={16} />}
        required
      />
      <ButtonField type="submit" color="primary" text="Đăng nhập" fullWidth />
    </form>
  );
};
export default LoginForm;

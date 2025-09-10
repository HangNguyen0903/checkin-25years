import { useForm } from "react-hook-form";
import InputField from "../../ui/Input/InputField";
import { useNavigate } from "react-router-dom";
import ButtonField from "../../ui/Button/ButtonField";
import { Lock, User } from "lucide-react";
import type { LoginFormInputs } from "../../../types/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async () =>
    // data: LoginFormInputs
    {
      try {
        //   const res = await axios.post("/api/auth/login", data);
        //   localStorage.setItem("token", res.data.token);
        navigate("/guests");
      } catch {
        alert("Đăng nhập thất bại!");
      } finally {
        navigate("/guests");
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
        registration={register("username", {
          required: "Tên đăng nhập là bắt buộc",
        })}
        error={errors.username}
        leftIcon={<User size={16} />}
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
      />
      <ButtonField type="submit" color="primary" text="Đăng nhập" fullWidth />
    </form>
  );
};
export default LoginForm;

import BaseModal from "../ui/Modal/ModalBase";
import type { ModalProps } from "@/types/modal";
import InputField from "../ui/Input/InputField";
import { useForm } from "react-hook-form";
import type { Event } from "@/types/events";
import ButtonField from "../ui/Button/ButtonField";
import { useEffect } from "react";
import { defaultValuesEvent } from "@/constants/defaultValue";

const ModalAddEvent = ({ open, setOpen, selectedData }: ModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Event>({
    defaultValues: defaultValuesEvent,
  });

  const onSubmit = async () =>
    // data
    {
      try {
        alert("Thêm sự kiện thành công");
      } catch {
        alert("Thêm thất bại");
      }
    };

  useEffect(() => {
    reset(selectedData ?? defaultValuesEvent);
  }, [selectedData, open, reset]);

  return (
    <BaseModal
      open={open}
      onClose={() => setOpen(false)}
      title={selectedData ? "Cập nhật" : "Thêm mới"}
      width={700}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Tên sự kiện"
          registration={register("name", {
            required: "Tên sự kiện là bắt buộc",
          })}
          error={errors.name}
          placeholder="Nhập tên sự kiện"
        />
        <InputField
          label="Mô tả"
          type="textarea"
          registration={register("description", {
            required: "Mô tả sự kiện là bắt buộc",
          })}
          error={errors.description}
          placeholder="Nhập mô tả"
        />
        <div className="flex justify-end gap-2">
          <ButtonField
            type="button"
            color="secondary"
            text="Hủy"
            onClick={() => setOpen(false)}
          />
          <ButtonField type="submit" color="primary" text="Lưu" />
        </div>
      </form>
    </BaseModal>
  );
};
export default ModalAddEvent;

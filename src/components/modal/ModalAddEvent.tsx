import BaseModal from "../ui/Modal/ModalBase";
import type { ModalProps } from "@/types/modal";
import InputField from "../ui/Input/InputField";
import { useForm } from "react-hook-form";
import type { Event } from "@/types/events";
import ButtonField from "../ui/Button/ButtonField";
import { useEffect } from "react";
import { defaultValuesEvent } from "@/constants/defaultValue";
import { createEvent, updateEvent } from "@/services/eventService";
import { toast } from "react-toastify";

const ModalAddEvent = ({
  open,
  setOpen,
  selectedData,
  onSuccess,
}: ModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Event>({
    defaultValues: defaultValuesEvent,
  });

  const onSubmit = async (data: Event) => {
    try {
      if (data?.id) {
        await updateEvent(data?.id, data);
        toast.success("Cập nhật sự kiện thành công!");
      } else {
        await createEvent(data);
        toast.success("Thêm sự kiện thành công!");
      }
      onSuccess?.();
      setOpen(false);
      reset(defaultValuesEvent);
    } catch {
      toast.error("Lưu sự kiện thất bại!");
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
          required
        />
        <InputField
          label="Mô tả"
          type="textarea"
          registration={register("description", {
            required: "Mô tả sự kiện là bắt buộc",
          })}
          error={errors.description}
          placeholder="Nhập mô tả"
          required
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

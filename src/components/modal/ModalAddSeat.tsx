import type { ModalProps } from "@/types/modal";
import BaseModal from "../ui/Modal/ModalBase";
import { useForm } from "react-hook-form";
import type { Seat } from "@/types/seats";
import InputField from "../ui/Input/InputField";
import ButtonField from "../ui/Button/ButtonField";
import Select from "../ui/Select/SelectField";

const ModalAddSeat = ({ open, setOpen, selectedData }: ModalProps) => {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<Seat>({
    defaultValues: {
      uuid: "",
      name: "",
      image: "",
      event: "",
    },
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

  return (
    <BaseModal
      open={open}
      onClose={() => setOpen(false)}
      title={selectedData ? "Cập nhật" : "Thêm mới"}
      width={700}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Mã vị trí"
          registration={register("uuid", {
            required: "Mã vị trí là bắt buộc",
          })}
          error={errors.uuid}
        />
        <InputField
          label="Tên vị trí"
          registration={register("name", {
            required: "Tên vị trí là bắt buộc",
          })}
          error={errors.name}
        />
        <Select
          options={[
            { label: "Tuỳ chọn 1", value: "1" },
            { label: "Tuỳ chọn 2", value: "2" },
            { label: "Tuỳ chọn 3", value: "3" },
          ]}
          title="Sự kiện"
          value={""}
          onChange={() => {}}
          placeholder="Chọn sự kiện"
          className="w-full h-12"
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
export default ModalAddSeat;

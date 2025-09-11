import type { ModalProps } from "@/types/modal";
import BaseModal from "../ui/Modal/ModalBase";
import { useForm } from "react-hook-form";
import type { Seat } from "@/types/seats";
import InputField from "../ui/Input/InputField";
import ButtonField from "../ui/Button/ButtonField";
import Select from "../ui/Select/SelectField";
import { events } from "@/mockData/guest";

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
          title="Sự kiện"
          options={events.map((ev) => ({
            label: ev.name,
            value: ev.id,
          }))}
          placeholder="Chọn sự kiện"
          registration={register("event", {
            required: "Sự kiện là bắt buộc",
          })}
          onChange={(val) => {
            console.log("Bạn vừa chọn sự kiện:", val);
          }}
          error={errors.event}
        />
        <div className="">
          <div>Ảnh vị trí *</div>
          <div className=''></div>
        </div>
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

import type { ModalProps } from "@/types/modal";
import BaseModal from "../ui/Modal/ModalBase";
import { useForm } from "react-hook-form";
import type { Seat } from "@/types/seats";
import InputField from "../ui/Input/InputField";
import ButtonField from "../ui/Button/ButtonField";
import Select from "../ui/Select/SelectField";
import { events } from "@/mockData/guest";
import { IdCard } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { defaultValuesSeat } from "@/constants/defaultValue";

const ModalAddSeat = ({ open, setOpen, selectedData }: ModalProps) => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Seat>({
    defaultValues: defaultValuesSeat,
  });

  const onSubmit = async (data: Seat) => console.log("data", data);
  {
    // try {
    //   alert("Thêm sự kiện thành công");
    // } catch {
    //   alert("Thêm thất bại");
    // }
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };
  useEffect(() => {
    reset(selectedData ?? defaultValuesSeat);
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
          label="Mã vị trí"
          registration={register("uuid", {
            required: "Mã vị trí là bắt buộc",
          })}
          error={errors.uuid}
          required
        />
        <InputField
          label="Tên vị trí"
          registration={register("name", {
            required: "Tên vị trí là bắt buộc",
          })}
          error={errors.name}
          required
        />
        <Select
          title="Sự kiện"
          options={events.map((ev) => ({
            label: ev.name,
            value: ev.name,
          }))}
          placeholder="Chọn sự kiện"
          registration={register("event.id", {
            required: "Sự kiện là bắt buộc",
          })}
          onChange={(val) => {
            console.log("Bạn vừa chọn sự kiện:", val);
          }}
          error={errors.event?.id}
          required
        />
        <div className="space-y-2">
          <div className="font-medium">Ảnh vị trí *</div>
          <div className="border border-gray-200 p-2 rounded-md w-60">
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="object-contain max-h-40 justify-center items-center m-auto flex mb-2 w-60"
              />
            ) : (
              <div className="bg-gray-100 justify-center items-center m-auto flex mb-2 h-30 overflow-hidden">
                <IdCard className="w-8 h-8 text-gray-300" />
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
            <div className=" flex m-auto justify-center">
              <ButtonField
                type="button"
                text="Tải lên"
                onClick={() => fileInputRef.current?.click()}
              />
            </div>
          </div>
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

import type { ModalProps } from "@/types/modal";
import BaseModal from "../ui/Modal/ModalBase";
import { useForm } from "react-hook-form";
import type { Seat } from "@/types/seats";
import InputField from "../ui/Input/InputField";
import ButtonField from "../ui/Button/ButtonField";
import Select from "../ui/Select/SelectField";
import { IdCard } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { defaultValuesSeat } from "@/constants/defaultValue";
import { createSeat } from "@/services/seatService";
import { toast } from "react-toastify";
import { getEvents } from "@/services/eventService";
import type { Event } from "@/types/events";

const ModalAddSeat = ({
  open,
  setOpen,
  selectedData,
  onSuccess,
}: ModalProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [listEvents, setListEvents] = useState<Event[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Seat>({
    defaultValues: defaultValuesSeat,
  });

  const onSubmit = async (data: Seat) => {
    try {
      //  if (data?.code) {
      //    await updateEvent(data?.id, data);
      //    toast.success("Cập nhật sự kiện thành công!");
      //  } else {
      await createSeat(data);
      toast.success("Thêm vị trí thành công!");
      //  }
      onSuccess?.();
      setOpen(false);
      reset(defaultValuesSeat);
    } catch {
      toast.error("Lưu vị trí thất bại!");
    }
  };

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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const listEvents = await getEvents();
        setListEvents(listEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

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
          registration={register("code", {
            required: "Mã vị trí là bắt buộc",
          })}
          // error={errors.code}
          required
        />
        <InputField
          label="Tên vị trí"
          registration={register("description", {
            required: "Tên vị trí là bắt buộc",
          })}
          // error={errors.description}
          required
        />
        <Select
          title="Sự kiện"
          options={listEvents.map((ev) => ({
            label: ev?.name,
            value: ev?.id,
          }))}
          placeholder="Chọn sự kiện"
          registration={register("anniversaryEventId", {
            required: "Sự kiện là bắt buộc",
          })}
          onChange={(val) => {
            console.log("Bạn vừa chọn sự kiện:", val);
          }}
          error={errors.anniversaryEventId}
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

import type { ModalProps } from "@/types/modal";
import BaseModal from "../ui/Modal/ModalBase";
import { useForm } from "react-hook-form";
import type { Seat } from "@/types/seats";
import ButtonField from "../ui/Button/ButtonField";
import { toast } from "react-toastify";
import { deleteEvent } from "@/services/eventService";

const ModaDelete = ({ open, setOpen, selectedData, onSuccess }: ModalProps) => {
  console.log("aaaaa", selectedData);
  const {
    // register,
    handleSubmit,
    // reset,
    // formState: { errors },
  } = useForm<Seat>({
    defaultValues: {},
  });

  const onSubmit = async () => {
    if (!selectedData?.id) return;
    try {
      await deleteEvent(selectedData.id);
      toast.success("Xóa sự kiện thành công!");
      onSuccess?.();
      setOpen(false);
    } catch {
      toast.error("Không thể xóa sự kiện!");
    }
  };

  return (
    <BaseModal
      open={open}
      onClose={() => setOpen(false)}
      title="Xác nhận checkin khách mời"
      width={400}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {`Bạn chắc chắn muốn xóa  " ${selectedData?.name} "`}
        <div className="flex justify-end gap-2 mb-3 mt-6">
          <ButtonField
            type="button"
            color="secondary"
            text="Hủy"
            onClick={() => setOpen(false)}
          />
          <ButtonField type="submit" color="primary" text="Xác nhận" />
        </div>
      </form>
    </BaseModal>
  );
};
export default ModaDelete;

import type { ModalProps } from "@/types/modal";
import BaseModal from "../ui/Modal/ModalBase";
import { useForm } from "react-hook-form";
import type { Seat } from "@/types/seats";
import ButtonField from "../ui/Button/ButtonField";

const ModaDelete = ({ open, setOpen, selectedData }: ModalProps) => {
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
    try {
      await fetch(`${import.meta.env.VITE_API}api/events/${selectedData.id}`, {
        method: "DELETE",
      });
      setOpen(false);
      alert("Xóa thành công");
    } catch {
      alert("Lỗi");
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

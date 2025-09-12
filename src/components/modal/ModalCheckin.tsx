import type { ModalProps } from "@/types/modal";
import BaseModal from "../ui/Modal/ModalBase";
import { useForm } from "react-hook-form";
import type { Seat } from "@/types/seats";
import ButtonField from "../ui/Button/ButtonField";

const ModalCheckin = ({ open, setOpen, selectedData }: ModalProps) => {
  const {
    // register,
    handleSubmit,
    // reset,
    // formState: { errors },
  } = useForm<Seat>({
    defaultValues: {
   
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

//   useEffect(() => {
//     if (selectedData) {
//       reset(selectedData);
//     } else {
//       reset({ name: "", description: "" });
//     }
//   }, [selectedData, open, reset]);

  return (
    <BaseModal
      open={open}
      onClose={() => setOpen(false)}
      title="Xác nhận checkin khách mời"
      width={400}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       {`Xác nhận checkin khách mời  ${selectedData?.fullName}`} 
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
export default ModalCheckin;

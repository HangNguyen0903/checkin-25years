/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ModalProps } from "@/types/modal";
import BaseModal from "../ui/Modal/ModalBase";
import { useForm } from "react-hook-form";
import type { Guest } from "@/types/guest";
import { useEffect, useState } from "react";
import InputField from "../ui/Input/InputField";
import ButtonField from "../ui/Button/ButtonField";
import Select from "../ui/Select/SelectField";
import {
  CHECKIN,
  DEPARTMENT,
  OBJECT,
  POSITION,
  STATUS,
} from "@/constants/guest";

const ModalAddGuest = ({ open, setOpen, selectedData }: ModalProps) => {
  const [currentStatus, setCurrentStatus] = useState<string | number>("TM");
  console.log("currentStatus", currentStatus);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Guest>({
    defaultValues: {
      id: "",
      object: "",
      region: "",
      title: "",
      fullName: "",
      position: "",
      organization: "",
      address: "",
      email: "",
      phone: "",
      department: "",
      tableCode: "",
      status: "",
      checkin: false,
      note: "",
    },
  });
  const onSubmit = async (data: Guest) =>
    // data
    {
      console.log("data_guest", data);
      try {
        alert("Thêm sự kiện thành công");
      } catch {
        alert("Thêm thất bại");
      }
    };

  useEffect(() => {
    if (selectedData) {
      reset(selectedData);
    } else {
      reset({
        id: "",
        object: "",
        region: "",
        title: "",
        fullName: "",
        position: "",
        organization: "",
        address: "",
        email: "",
        phone: "",
        department: "",
        tableCode: "",
        status: "",
        checkin: false,
        note: "",
      });
    }
  }, [selectedData, open, reset]);

  return (
    <BaseModal
      open={open}
      onClose={() => setOpen(false)}
      title={selectedData ? "Cập nhật" : "Thêm mới"}
      width={700}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <InputField
              label="Họ & tên"
              registration={register("fullName", {
                required: "Họ & tên là bắt buộc",
              })}
              error={errors.fullName}
            />
            <Select
              title="Đối tượng"
              options={OBJECT.map((ev: any) => ({
                label: ev.title,
                value: ev.value,
              }))}
              placeholder="Chọn đối tượng"
              registration={register("object", {
                required: "Đối tượng là bắt buộc",
              })}
              onChange={(val) => {
                console.log("Chọn đối tượng:", val);
              }}
              error={errors.object}
            />
            <InputField
              label="Tên cơ quan"
              registration={register("organization")}
            />
            <InputField label="Email" registration={register("email")} />
            <Select
              title="Phòng ban đề xuất"
              options={DEPARTMENT.map((ev: any) => ({
                label: ev.title,
                value: ev.value,
              }))}
              placeholder="Chọn phòng ban"
              onChange={(val) => {
                console.log("", val);
              }}
              registration={register("department")}
            />
            <Select
              title="Trạng thái"
              options={STATUS.map((ev: any) => ({
                label: ev.title,
                value: ev.value,
              }))}
              placeholder="Chọn trạng thái"
              onChange={(val) => {
                console.log("", val);
                setCurrentStatus(val);
              }}
              registration={register("status")}
            />
            {(currentStatus === "DC" || selectedData?.status === "DC") && (
              <InputField
                label="Họ & tên người thay thế"
                registration={register("fullName_change")}
              />
            )}
          </div>
          <div className="space-y-4">
            <InputField label="Danh xưng" registration={register("title")} />
            <Select
              title="Khu vực"
              options={POSITION.map((ev: any) => ({
                label: ev.title,
                value: ev.value,
              }))}
              placeholder="Chọn khu vực"
              registration={register("position", {
                required: "Đối tượng là bắt buộc",
              })}
              onChange={(val) => {
                console.log("Khu vực:", val);
              }}
              error={errors.position}
            />

            <InputField
              label="Địa chỉ nhận thư tay"
              registration={register("address")}
            />
            <InputField
              label="Số điện thoại"
              registration={register("phone")}
            />
            <InputField
              label="Mã bàn tiệc"
              registration={register("tableCode", {
                required: "Mã bàn tiệc là bắt buộc",
              })}
              error={errors.fullName}
            />
            <Select
              title="Checkin"
              options={CHECKIN.map((ev: any) => ({
                label: ev.title,
                value: ev.value,
              }))}
              placeholder="Chọn trạng thái"
              onChange={(val) => {
                console.log("", val);
              }}
              registration={register("checkin")}
            />
            {(currentStatus === "DC" || selectedData?.status === "DC") && (
              <InputField
                label="Số điện thoại người thay thế"
                registration={register("phone_change")}
              />
            )}
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
export default ModalAddGuest;

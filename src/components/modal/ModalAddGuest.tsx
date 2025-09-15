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
import { defaultValuesGuest } from "@/constants/defaultValue";

const ModalAddGuest = ({ open, setOpen, selectedData }: ModalProps) => {
  const [currentStatus, setCurrentStatus] = useState<string | number>("TM");
  console.log("currentStatus", currentStatus);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Guest>({
    defaultValues: defaultValuesGuest,
  });
  const onSubmit = async (data: Guest) => {
    try {
      console.log("data", data);
      alert("Thêm sự kiện thành công");
    } catch {
      alert("Thêm thất bại");
    }
  };

  useEffect(() => {
    reset(selectedData ?? defaultValuesGuest);
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
              placeholder="Nhập họ & tên"
              required
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
              required
            />
            <InputField
              label="Tên cơ quan"
              registration={register("organization")}
              placeholder="Nhập tên cơ quan"
            />
            <InputField
              label="Email"
              registration={register("email")}
              placeholder="Nhập email"
            />
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
                placeholder="Nhập họ & tên"
              />
            )}
          </div>
          <div className="space-y-4">
            <InputField
              label="Danh xưng"
              registration={register("title")}
              placeholder="Nhập danh xưng"
            />
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
              required
            />
            <InputField
              label="Địa chỉ nhận thư tay"
              registration={register("address")}
              placeholder="Nhập địa chỉ"
            />
            <InputField
              label="Số điện thoại"
              registration={register("phone")}
              placeholder="Nhập số điện thoại"
            />
            <InputField
              label="Mã bàn tiệc"
              registration={register("tableCode", {
                required: "Mã bàn tiệc là bắt buộc",
              })}
              error={errors.tableCode}
              placeholder="Nhập mã bàn tiệc"
              required
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
                placeholder="Nhập số điện thoại"
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

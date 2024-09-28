import { useLocation, useNavigate } from "react-router-dom";
import { useQuanLyNguoiDungSelector } from "../../store/quanLyNguoiDung";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddUserSchema, AddUserSchemaType } from "../../schemas";
import { quanLyNguoiDungServices } from "../../services";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Button, Input, Select } from "antd";

export const AddUserTemplate = () => {
  const { user } = useQuanLyNguoiDungSelector();
  const { state } = useLocation();
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddUserSchemaType>({
    mode: "onChange",
    resolver: zodResolver(AddUserSchema),
  });

  const onSubmit: SubmitHandler<AddUserSchemaType> = async (
    values: AddUserSchemaType
  ) => {
    if (user?.maLoaiNguoiDung === "QuanTri") {
        if(state){
            try {
                await quanLyNguoiDungServices.UpdateUserAdmin(values);
                toast.success("cập nhật thành công");
                navigate(-1)
              } catch (err: any) {
                toast.error(err?.response?.data?.content);
              }
        }else{
            try {
                await quanLyNguoiDungServices.AddUserAdmin(values);
                toast.success("Thêm người dùng thành công");
              } catch (err: any) {
                toast.error(err?.response?.data?.content);
              }
        }
    }
  };

  useEffect(() => {
    if(state){
        setValue("hoTen", state.hoTen);
      setValue("email", state.email);
        setValue("maNhom", state.maNhom);
        setValue("soDt", state.soDT);
        setValue("maNhom", state.maNhom);
        setValue("taiKhoan", state.taiKhoan);
        setValue("matKhau", state.matKhau);
      setValue("maLoaiNguoiDung", state.maLoaiNguoiDung);
    }
  }, [setValue, state]);

  return (
    <div className="ms-[30px]">
      <h2 className=" text-[30px] font-[700] !mb-[30px]">Thêm người dùng </h2>
      <form
        className="grid grid-cols-[30%,30%] gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-[16px] text-end me-5 ">
          Họ tên<span className="text-red-500">*</span>:
        </p>
        <div>
          <Controller
            name="hoTen"
            control={control}
            render={({ field }) => (
              <Input status={errors.hoTen && "error"} {...field} />
            )}
          />
          {errors.hoTen && (
            <p className="text-red-500">{errors.hoTen.message}</p>
          )}
        </div>

        <p className="text-[16px] text-end me-5 ">
          Email<span className="text-red-500">*</span>:
        </p>
        <div>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <p className="text-[16px] text-end me-5 ">
          SĐT<span className="text-red-500">*</span>:
        </p>
        <div>
          <Controller
            name="soDt"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.soDt && <p className="text-red-500">{errors.soDt.message}</p>}
        </div>

        <p className="text-[16px] text-end me-5 ">
          Mã nhóm<span className="text-red-500">*</span>:
        </p>
        <div>
          <Controller
            name="maNhom"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.maNhom && (
            <p className="text-red-500">{errors.maNhom.message}</p>
          )}
        </div>

        <p className="text-[16px] text-end me-5 ">
          Tài khoản<span className="text-red-500">*</span>:
        </p>
        <div>
          <Controller
            name="taiKhoan"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.taiKhoan && (
            <p className="text-red-500">{errors.taiKhoan.message}</p>
          )}
        </div>

        <p className="text-[16px] text-end me-5 ">
          Mật khẩu<span className="text-red-500">*</span>:
        </p>
        <div>
          <Controller
            name="matKhau"
            control={control}
            render={({ field }) => <Input.Password {...field} />}
          />
          {errors.matKhau && (
            <p className="text-red-500">{errors.matKhau.message}</p>
          )}
        </div>

        <p className="text-[16px] text-end me-5 ">
          Loại người dùng<span className="text-red-500">*</span>:
        </p>
        <div>
          <Controller
            name="maLoaiNguoiDung"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  style={{ width: "100%" }}
                  options={[
                    { value: "KhachHang", label: "Khách hàng" },
                    { value: "QuanTri", label: "Quản trị" },
                  ]}
                  {...field}
                />
              );
            }}
          />
          {errors.maLoaiNguoiDung && (
            <p className="text-red-500">{errors.maLoaiNguoiDung.message}</p>
          )}
        </div>
        <div className="col-span-2 text-end">
          {state ? (
            <Button
              htmlType="submit"
              type="primary"
              danger
              className=" mt-[30px] h-[50px]   "
            >
              Cập nhật
            </Button>
          ) : (
            <Button
              htmlType="submit"
              type="primary"
              danger
              className=" mt-[30px] h-[50px]   "
            >
              Đăng ký
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

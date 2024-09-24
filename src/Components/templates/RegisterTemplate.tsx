import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterSchema,
  RegisterSchemaType,
} from "../../schemas/RegisterSchema";
import { Input, Button } from "antd";
import { useRegisterMutation } from "../../Hooks/api";

export const RegisterTemplate = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
  });
  const registerMutation = useRegisterMutation();

  const onSubmit: SubmitHandler<RegisterSchemaType> = async (values) => {
    registerMutation.mutate(values);
  };

  return (
    <div>
      <h2 className="text-white text-[30px] font-[700] !mb-[30px]">Login</h2>
      <form
      onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-white text-[16px] my-[10px]">
          Họ tên<span className="text-red-500">*</span>
        </p>
        <Controller
          name="hoTen"
          control={control}
          render={({ field }) => (
            <Input status={errors.hoTen && "error"} {...field} />
          )}
        />
        {errors.hoTen && <p className="text-red-500">{errors.hoTen.message}</p>}

        <p className="text-white text-[16px] my-[10px]">
          Email<span className="text-red-500">*</span>
        </p>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input status="warning" {...field} />}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <p className="text-white text-[16px] my-[10px]">
          SĐT<span className="text-red-500">*</span>
        </p>
        <Controller
          name="soDt"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        {errors.soDt && <p className="text-red-500">{errors.soDt.message}</p>}

        <p className="text-white text-[16px] my-[10px]">
          Mã nhóm<span className="text-red-500">*</span>
        </p>
        <Controller
          name="maNhom"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        {errors.maNhom && (
          <p className="text-red-500">{errors.maNhom.message}</p>
        )}

        <p className="text-white text-[16px] my-[10px]">
          Tài khoản<span className="text-red-500">*</span>
        </p>
        <Controller
          name="taiKhoan"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        {errors.taiKhoan && (
          <p className="text-red-500">{errors.taiKhoan.message}</p>
        )}

        <p className="text-white text-[16px] my-[10px]">
          Mật khẩu<span className="text-red-500">*</span>
        </p>
        <Controller
          name="matKhau"
          control={control}
          render={({ field }) => <Input.Password {...field} />}
        />
        {errors.matKhau && (
          <p className="text-red-500">{errors.matKhau.message}</p>
        )}

        <Button
            loading={registerMutation.isPending}
          htmlType="submit"
          type="primary"
          danger
          className="!w-full mt-[30px] h-[50px]"
        >
          Đăng ký
        </Button>
      </form>
    </div>
  );
};

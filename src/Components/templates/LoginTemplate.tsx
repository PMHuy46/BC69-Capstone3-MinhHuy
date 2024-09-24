import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "../../schemas/LoginSchema";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants";
import { useLoginMutation } from "../../Hooks/api";

export const LoginTemplate = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const navigate = useNavigate();

  const loginMutation = useLoginMutation();
  console.log(loginMutation)

  return (
    <div>
      <form
        onSubmit={handleSubmit((values) => {
          loginMutation.mutate(values);
        })}
      >
        <h2 className="text-red-700 text-[30px] font-[700] !mb-[30px] ">
          Login
        </h2>
        <p className="text-white text-[18px] my-[10px] font-[600]">Tài khoản</p>
        <Controller
          control={control}
          name="taiKhoan"
          render={({ field }) => <Input {...field} />}
        />
        {errors.taiKhoan && (
          <p className="text-red-500">{errors.taiKhoan.message}</p>
        )}

        <p className="text-white text-[18px] my-[10px] font-[600]">Mật khẩu</p>
        <Controller
          control={control}
          name="matKhau"
          render={({ field }) => <Input.Password {...field} />}
        />
        {errors.matKhau && (
          <p className="text-red-500">{errors.matKhau.message}</p>
        )}
        <Button
          htmlType="submit"
          type="primary"
          danger
          className="!w-full mt-[30px] h-[50px] text-[20px] font-[600]"
        >
          Đăng nhập
        </Button>
        <div className="text-center">
          <button
            className=" mt-[10px] text-white/70 hover:text-red-500"
            onClick={() => navigate(PATH.register)}
          >
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
};

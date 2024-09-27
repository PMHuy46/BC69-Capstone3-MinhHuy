import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DatePicker, Input,  Select } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import {
  useGetCumRap,
  useGetListHeThong,
} from "../../Hooks/api/useDatVeMutation";
import {
  CreateShowTime,
  CreateShowTimeType,
} from "../../schemas/CreateShoeTimeSchema";
import { useState } from "react";
import { objectToQueryString } from "../../utils";
import moment from "moment";
import { quanLyDatVe } from "../../services";
import { toast } from "react-toastify";
import { useQuanLyNguoiDungSelector } from "../../store/quanLyNguoiDung";

export const ShowTimeTemplate = () => {
  const { user } = useQuanLyNguoiDungSelector();
  const { state } = useLocation();
  const [maHeThong, setMaHeThong] = useState<string>();
  const disabledDate = (current: object) => {
    return current && current < moment().endOf("day");
  };

  const { data: listHeThong } = useGetListHeThong();
  const { data: cumRap } = useGetCumRap(
    objectToQueryString({ maHeThongRap: maHeThong })
  );

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<CreateShowTimeType>({
    mode: "onChange",
    resolver: zodResolver(CreateShowTime),
  });

  const onSubmit: SubmitHandler<CreateShowTimeType> = async (
    values: CreateShowTimeType
  ) => {
    console.log(user?.maLoaiNguoiDung)
    if (user?.maLoaiNguoiDung == "QuanTri") {
      const newValues = {
        maPhim: state.maPhim,
        maRap: values.maRap,
        giaVe: values.giaVe,
        ngayChieuGioChieu: values.ngayChieuGioChieu,
      };
      console.log(newValues)
     try {
      const result = await quanLyDatVe.createLichChieu(newValues)
      toast.success(result.data.message)
      reset()
     } catch (e) {
      toast.error('Tạo Lịch chiếu không thành công')
    }
    }else{
    console.log('Tài khoản không đủ quyền')

    }
  };

  return (
    <div>
      <p className="text-[30px] font-[700] p-3">Tạo lịch chiếu</p>
      <div className="grid grid-cols-[30%,70%]">
        <div className="ms-[100px]">
          <p className="text-[20px] mb-3">Phim: {state.tenPhim}</p>
          <img src={state.hinhAnh} alt="..." className="w-[200px]" />
        </div>

        <div className="mt-10 ">
          <form
            className="ms-[40px] grid grid-cols-[30%,40%] gap-3 "
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* hệ thống rạp */}
            <p className=" text-[16px] text-end ">
              Hệ thống rạp<span className="text-red-500">*</span>:
            </p>
            <div>
              <Controller
                name="heThongRap"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      style={{ width: "100%" }}
                      options={listHeThong?.map((item) => {
                        return {
                          value: item.maHeThongRap,
                          label: item.tenHeThongRap,
                        };
                      })}
                      status={errors.heThongRap && "error"}
                      {...field}
                      onChange={(value) => {
                        field.onChange(value);
                        setMaHeThong(value);
                      }}
                    />
                  );
                }}
              />
              {errors.heThongRap && (
                <p className="text-red-500">{errors.heThongRap.message}</p>
              )}
            </div>

            {/* cụm rạp */}
            <p className=" text-[16px] text-end ">
              Cụm rạp<span className="text-red-500">*</span>:
            </p>
            <div>
              <Controller
                name="maRap"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      style={{ width: "100%" }}
                      options={cumRap?.map((item) => {
                        return {
                          value: item.maCumRap,
                          label: item.tenCumRap,
                        };
                      })}
                      status={errors.maRap && "error"}
                      {...field}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                    />
                  );
                }}
              />
              {errors.maRap && (
                <p className="text-red-500">{errors.maRap.message}</p>
              )}
            </div>

            {/* ngày giờ chiếu */}
            <p className=" text-[16px] text-end ">
              Ngày chiếu<span className="text-red-500">*</span>:
            </p>
            <div>
              <Controller
                control={control}
                name="ngayChieuGioChieu"
                render={({ field }) => (
                  <div>
                    <DatePicker
                      disabledDate={disabledDate}
                      style={{ width: "100%" }}
                      showTime
                      format={"DD-MM-YYYY HH:mm"}
                      status={errors.ngayChieuGioChieu && "error"}
                      {...field}
                     
                    />
                  </div>
                )}
              />
              {errors.ngayChieuGioChieu && (
                <p className="text-red-500">
                  {errors.ngayChieuGioChieu.message as string}
                </p>
              )}
            </div>

            {/* giá vé */}
            <p className=" text-[16px] text-end ">
              Giá vé<span className="text-red-500">*</span>:
            </p>
            <div>
              <Controller
                name="giaVe"
                control={control}
                render={({ field }) => {
                  return <Input status={errors.giaVe && "error"} {...field} />;
                }}
              />
              {errors.giaVe && (
                <p className="text-red-500">{errors.giaVe.message}</p>
              )}
            </div>

            <div className="col-span-2 text-end">
              <Button
                htmlType="submit"
                type="primary"
                danger
                className=" mt-[30px] h-[50px]   "
              >
                Đăng ký
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

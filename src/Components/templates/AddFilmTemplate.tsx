import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DatePicker, Image, Input, Switch, Upload } from "antd";
import { AddFilmSchema, AddFilmSchemaType } from "../../schemas";
import moment from "moment";
import { quanLyPhimServices } from "../../services";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import { sleep } from "../../utils";

export const AddFilmTemplate = () => {
  const formData = new FormData();
  const { state } = useLocation();
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<AddFilmSchemaType>({
    mode: "onChange",
    resolver: zodResolver(AddFilmSchema),
  });

  const disabledDate = (current: object) => {
    return current && current < moment().endOf("day");
  };

  const onSubmit: SubmitHandler<AddFilmSchemaType> = async (
    values: AddFilmSchemaType
  ) => {
    for (const [key, value] of Object.entries(values)) {
      if (key !== "File") {
        formData.append(key, value);
      } else {
        if (value) {
          formData.append("File", value as Blob, value.name);
        }
        else{
          formData.append("File",value)
        }
      }
    }
    if (state) {
      formData.append('maPhim',state.maPhim)
      formData.append('biDanh',state.biDanh)
      
      try {
        await quanLyPhimServices.updateFilm(formData);
        toast.success("Thêm phim thành công");
        sleep(2000)
        navigate(-1)
      } catch (error) {
        toast.error('không thành công')
      }
    } else {
      try {
        await quanLyPhimServices.addFilm(formData);
        toast.success("Thêm phim thành công");
        reset();
      } catch (error) {
        toast.error("Không thành công");
      }
    }
  };

  useEffect(() => {
    if (state) {
      setValue("maNhom", state.maNhom);
      setValue("tenPhim", state.tenPhim);
      setValue("trailer", state.trailer);
      setValue("moTa", state.moTa);
      setValue("ngayKhoiChieu", dayjs(state.ngayKhoiChieu)); //ở đây sửa giùm em với nha
      setValue("dangChieu", state.dangChieu);
      setValue("sapChieu", state.sapChieu);
      setValue("hot", state.hot);
      setValue("danhGia", state.danhGia);
      setValue("File", null);
    }
  }, [state, setValue]);

  return (
    <div className="ms-[30px]">
      <h2 className="text-white text-[20px] font-[700] !mb-[30px]">
        Thêm phim mới
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="ms-[40px] grid grid-cols-[30%,30%] gap-3"
      >
        <p className=" text-[16px] text-end ">
          Mã nhóm<span className="text-red-500">*</span>:
        </p>
        <div>
          <Controller
            name="maNhom"
            control={control}
            render={({ field }) => {
              return <Input status={errors.maNhom && "error"} {...field} />;
            }}
          />
          {errors.maNhom && (
            <p className="text-red-500">{errors.maNhom.message}</p>
          )}
        </div>
        {/* tên phim */}
        <p className=" text-[16px] text-end ">
          Tên phim<span className="text-red-500">*</span>:
        </p>
        <div>
          <Controller
            name="tenPhim"
            control={control}
            render={({ field }) => {
              return <Input status={errors.tenPhim && "error"} {...field} />;
            }}
          />
          {errors.tenPhim && (
            <p className="text-red-500">{errors.tenPhim.message}</p>
          )}
        </div>
        {/* trailer */}
        <p className=" text-[16px] text-end ">
          Trailer<span className="text-red-500">*</span>:
        </p>
        <div>
          <Controller
            name="trailer"
            control={control}
            render={({ field }) => {
              return <Input status={errors.trailer && "error"} {...field} />;
            }}
          />
          {errors.trailer && (
            <p className="text-red-500">{errors.trailer.message}</p>
          )}
        </div>
        {/* mô tả */}
        <p className=" text-[16px] text-end ">
          Mô tả<span className="text-red-500">*</span>:
        </p>
        <div>
          <Controller
            name="moTa"
            control={control}
            render={({ field }) => {
              return <Input status={errors.moTa && "error"} {...field} />;
            }}
          />
          {errors.moTa && <p className="text-red-500">{errors.moTa.message}</p>}
        </div>
        {/* ngày chiếu */}
        <p className=" text-[16px] text-end ">
          Ngày chiếu<span className="text-red-500">*</span>:
        </p>
        <div>
          <Controller
            control={control}
            name="ngayKhoiChieu"
            render={({ field }) => (
              <div>
                <DatePicker
                  disabledDate={disabledDate}
                  format={"DD-MM-YYYY"}
                  status={errors.ngayKhoiChieu && "error"}
                  {...field}
                />
              </div>
            )}
          />
          {errors.ngayKhoiChieu && (
            <p className="text-red-500">
              {errors.ngayKhoiChieu.message as string}
            </p>
          )}
        </div>
        {/* đang chiếu */}
        <p className=" text-[16px] text-end ">
          Đang chiếu<span className="text-red-500">*</span>:
        </p>
        <div>
          <Controller
            name="dangChieu"
            defaultValue={false}
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onChange={(checked) => {
                  field.onChange(checked);
                }}
              />
            )}
          />
        </div>
        {/* sắp chiếu */}
        <p className=" text-[16px] text-end ">
          Sắp chiếu<span className="text-red-500">*</span>:
        </p>
        <div>
          <Controller
            defaultValue={true}
            name="sapChieu"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onChange={(checked) => {
                  field.onChange(checked);
                }}
              />
            )}
          />
        </div>
        {/* hot */}
        <p className=" text-[16px] text-end ">
          Hot<span className="text-red-500">*</span>:
        </p>
        <div>
          <Controller
            name="hot"
            defaultValue={false}
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onChange={(checked) => {
                  field.onChange(checked);
                }}
              />
            )}
          />
        </div>
        {/* số sao  */}
        <p className=" text-[16px] text-end ">
          Số sao<span className="text-red-500">*</span>:
        </p>
        <div>
          <Controller
            name="danhGia"
            control={control}
            render={({ field }) => {
              return <Input status={errors.danhGia && "error"} {...field} />;
            }}
          />
          {errors.danhGia && (
            <p className="text-red-500">{errors.danhGia.message}</p>
          )}
        </div>
        {/* hình ảnh */}
        <p className=" text-[16px] text-end ">
          Hình ảnh<span className="text-red-500">*</span>:
        </p>
        <div>
          <div>
            <Controller
              name="File"
              control={control}
              render={({ field: { onChange } }) => (
                <Upload
                  beforeUpload={(file) => {
                    onChange(file);
                    return false;
                  }}
                  maxCount={1}
                >
                  <Button>Upload File</Button>
                </Upload>
              )}
            />
            {errors.File && (
              <p className="text-red-500">{errors?.File.message as string}</p>
            )}
          </div>
        </div>
        {state? (
          <div className="col-span-2 grid grid-cols-2 gap-3">
            <p className=" text-[16px] text-end ">Ảnh cũ:</p>
            <Image width={200} src={state.hinhAnh} />
          </div>
        ) : (
          <></>
        )}

        <div className="col-span-2 text-end">
          {state ? (
            <Button
              htmlType="submit"
              type="primary"
              danger
              className=" mt-[30px] h-[50px]   "
            >
              Update
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

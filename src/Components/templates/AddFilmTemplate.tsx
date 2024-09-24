import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DatePicker, Input, Switch } from "antd";
import { AddFilmSchema, AddFilmSchemaType } from "../../schemas";
import moment from "moment";
import { quanLyPhimServices } from "../../services";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";

export const AddFilmTemplate = () => {
  const formData = new FormData();

  const {
    control,
    handleSubmit,
    formState: { errors },
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
    console.log(values);
    for (const [key, value] of Object.entries(values)) {
      if (key !== "hinhAnh") {
        formData.append(key, value);
      } else {
        formData.append("hinhAnh", value,);
      }
    }
    try {
      const result = await quanLyPhimServices.addFilm(formData);
      console.log(result);
      toast.success("Xóa phim thành công");
    } catch (error) {
      toast.error("Không thành công");
    }
  };

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
          <Controller
            name="File"
            control={control}
            render={({ field :{onChange,value}}) => {
              const { getRootProps, getInputProps } = useDropzone({
                onDrop: (acceptedFiles) => {
                  onChange(acceptedFiles[0]); // Lấy tệp đầu tiên
                },
              });

              return (
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <Button type="primary">
                    Kéo, thả hoặc nhấp để thêm ảnh
                  </Button>
                  {value && <p>Tệp đã chọn: {value.name}</p>}
                </div>
              );
            }}
           
          />
          {errors.File && (
            <p className="text-red-500">{errors?.File.message as string}</p>
          )}
        </div>

        <Button
          htmlType="submit"
          type="primary"
          danger
          className="!w-full mt-[30px] h-[50px]   "
        >
          Đăng ký
        </Button>
      </form>
    </div>
  );
};

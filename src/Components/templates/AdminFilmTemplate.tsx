import { useDataDetail } from "../../Hooks/api";
import { Phim } from "../../@types";
import { useQueryClient } from "@tanstack/react-query";
import { objectToQueryString } from "../../utils";
import { quanLyPhimServices } from "../../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants";
import { Select } from "antd";
import { useState } from "react";

export const AdminFilmTemplate = () => {
  const navigate = useNavigate();
  const [maNhom, setMaNhom] = useState("GP01");

  const { data } = useDataDetail.getDanhSach("maNhom", maNhom);
  const phimArray = data as Phim[];

  console.log(phimArray);

  const queryClient = useQueryClient();

  return (
    <div>
      <p className="text-[30px] font-[700]">Quản lý phim</p>

      <div className="w-[30%] p-3">
        <p className="text-[16px] mb-2 font-[600]">Chọn nhóm người dùng</p>
        <Select
          defaultValue="GP01"
          style={{ width: "100%" }}
          onChange={(value) => {
            setMaNhom(value);
          }}
          options={Array.from({ length: 15 }, (_, i) => ({
            value: i + 1 < 10 ? `GP0${i + 1}` : `GP${i + 1}`,
            label: i + 1 < 10 ? `GP0${i + 1}` : `GP${i + 1}`,
          }))}
        />
      </div>
      <div className="grid grid-cols-[10%,20%,20%,40%,10%] text-center text-[16px] font-[700] sticky mb-5 pt-4">
        <p>Mã phim</p>
        <p>Hình ảnh</p>
        <p>Tên phim</p>
        <p>Mô tả</p>
        <p></p>
      </div>
      <div className="overflow-scroll h-[90vh] ">
        {phimArray?.map((item) => (
          <div
            className="grid grid-cols-[10%,20%,20%,40%,10%]  mb-3 items-center"
            key={item.maPhim}
          >
            <div className="text-center">{item?.maPhim}</div>
            <div>
              <img src={item?.hinhAnh} alt="" className="px-10 py-2" />
            </div>
            <div>{item?.tenPhim}</div>
            <div className="px-2">{item?.moTa}</div>
            <div className="px-2 text-center">
              <button
                className="text-red-700 font-[600] "
                onClick={async () => {
                  try {
                    await quanLyPhimServices.deleteFilm(
                      objectToQueryString({ maPhim: item.maPhim })
                    );
                    queryClient.invalidateQueries({
                      queryKey: ['yourQueryKey', { maNhom: item.maNhom }] 
                    })
                    toast.success("Xóa phim thành công");
                  } catch (error) {
                    toast.error("Không thành công");
                  }
                }}
              >
               <i className="fa-solid fa-trash"></i>
              </button>
              <button
                className="text-green-400 font-[600]"
                onClick={() => {
                  navigate(PATH.addFilm, { state: item });
                }}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button
                className="text-yellow-400 font-[600]"
                onClick={() => {
                  navigate(PATH.showtime, { state: {'maPhim':item.maPhim,'tenPhim':item.tenPhim,'hinhAnh':item.hinhAnh} });
                }}
              >
                <i className="fa-solid fa-calendar-days"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

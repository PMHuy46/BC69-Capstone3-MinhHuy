import { useDataDetail } from "../../Hooks/api";
import { Phim } from "../../@types";
import { useQueryClient } from "@tanstack/react-query";
import { objectToQueryString } from "../../utils";
import { quanLyPhimServices } from "../../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants";

export const AdminFilmTemplate = () => {
  const navigate = useNavigate();

  const { data} = useDataDetail.getDanhSach("maNhom", "GP03");
  const phimArray = data as Phim[];

  const queryClient = useQueryClient();

  return (
    <div>
      <div className="grid grid-cols-[10%,20%,20%,40%,10%] text-center text-[16px] font-[700] sticky mb-5 pt-4">
        <p>Mã phim</p>
        <p>Hình ảnh</p>
        <p>Tên phim</p>
        <p>Mô tả</p>
        <p></p>
      </div>
      <div className="overflow-scroll h-[90vh] ">
        {phimArray.map((item, index) => (
          <div
            className="grid grid-cols-[10%,20%,20%,40%,10%] align-middle mb-3"
            key={index}
          >
            <div className="text-center">{item?.maPhim}</div>
            <div>
              <img src={item?.hinhAnh} alt="" className="px-10 py-2" />
            </div>
            <div>{item?.tenPhim}</div>
            <div className="px-2">{item?.moTa}</div>
            <div className="px-2 text-center">
              <button
                className="text-red-700 font-[600] me-5"
                onClick={async () => {
                  try {
                    await quanLyPhimServices.deleteFilm(
                      objectToQueryString({ maPhim: item.maPhim })
                    );
                    queryClient.invalidateQueries(
                      objectToQueryString({ maNhom: item.maNhom })
                    );
                    toast.success("Xóa phim thành công");
                  } catch (error) {
                    toast.error("Không thành công");
                  }
                }}
              >
                Xóa
              </button>
              <button
                className="text-yellow-400 font-[600]"
                onClick={() => {
                  navigate(PATH.addFilm, { state: item });
                }}
              >
                Sửa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

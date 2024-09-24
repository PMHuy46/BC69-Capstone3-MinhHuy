import { useQuery } from "@tanstack/react-query";
import cn from "classnames";
import styled from "styled-components";
import { quanLyDatVe } from "../../services";
import {
  quanLyNguoiDungActions,
  useQuanLyNguoiDungSelector,
} from "../../store/quanLyNguoiDung";
import { objectToQueryString } from "../../utils";
import { LoaiGhe } from "../../@types";
import { useAppDispatch } from "../../store";
import { useDatVeMutation } from "../../Hooks/api/useDatVeMutation";

const Ghe = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 6px;
  background: #111;
  cursor: pointer;
  font-weight: 500;
  // viết scss được trong này
  &.gheVip {
    background-color: #ffff00;
    color: black;
  }
  &.daDat {
    background-color: green;
  }
`;

export const ModalDatVe = () => {
  const { maLichChieu, danhSachGheDangChon,danhSachGheDat } = useQuanLyNguoiDungSelector();
  const dispatch = useAppDispatch();
  const datVe= useDatVeMutation()

  const { data: danhSachPhongVe } = useQuery({
    queryKey: ["DanhSachPhongVe", maLichChieu],
    queryFn: () =>
      quanLyDatVe.getDanhSachPhongVe(objectToQueryString({ maLichChieu })),
    enabled: !!maLichChieu,
  });

  return (
    <div className="flex justify-between">
      <div className="w-[590px]">
        <div className="w-full h-[50px] bg-yellow-400 text-[30px] text-center font-bold">
          Màn hình
        </div>
        <div className="grid grid-cols-12 mt-[30px] gap-[10px] ">
          {danhSachPhongVe?.data.content.danhSachGhe.map((ghe) => (
            <div key={ghe.maGhe}>
              <Ghe
                onClick={() => {
                  dispatch(quanLyNguoiDungActions.chooseToCheck(ghe));
                }}
                className={cn({
                  gheThuong: ghe.loaiGhe === LoaiGhe.THUONG,
                  gheVip: ghe.loaiGhe === LoaiGhe.VIP,
                })}
              >
                {ghe.tenGhe}
              </Ghe>
              {/* check login của user
                navigate(-1) để trở về trang trước đó
              */}
            </div>
          ))}
        </div>
      </div>

      <div className="w-[30%]">
        <h2 className="mb-[20px] font-bold text-[20px]  text-center">
          DANH SÁCH GHẾ BẠN CHỌN
        </h2>
        <div className="flex  items-center mb-3">
          <p className="p-30px bg-black w-[30px] h-[30px] mr-3 rounded-md"></p>
          <p className="font-bold text-[20px] ">Ghế thường</p>
        </div>
        <div className="flex  items-center mb-3">
          <p className="p-30px bg-yellow-400 w-[30px] h-[30px] mr-3  rounded-md"></p>
          <p className="font-bold text-[20px] ">Ghế Vip</p>
        </div>
        <div className="flex  items-center mb-3">
          <p className="p-30px bg-green-500 w-[30px] h-[30px] mr-3 rounded-md"></p>
          <p className="font-bold text-[20px] ">Ghế đã đặt</p>
        </div>

        <table className=" w-full ">
          <thead>
            <tr className=" text-[20px] font-bold ">
              <th className="border-2  border-black ">Số ghế</th>
              <th className="border-2  border-black ">Giá tiền</th>
              <th className="border-2  border-black ">Hủy</th>
            </tr>
          </thead>
          <tbody>
            {danhSachGheDangChon.length > 0 ? (
              danhSachGheDangChon.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className=" text-center text-[20px] font-medium"
                  >
                    <td className="border-2  border-black ">{item.tenGhe}</td>
                    <td className="border-2  border-black ">{item.giaVe}</td>
                    <td
                      className="border-2  border-black text-red px-3 text-red-700 "
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        dispatch(quanLyNguoiDungActions.deleteChoose(item.maGhe))
                        console.log("aaa")
                      }}
                    >
                      X
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="text-center ">
                <td className="border-2  border-black h-[30px] text-yellow-400 "></td>
                <td className="border-2  border-black "></td>
                <td className="border-2  border-black "></td>
              </tr>
            )}
          </tbody>
        </table>
        <button
          className="bg-red-700 text-yellow-500 px-[15px] mt-3 text-[20px] font-bold rounded-md border-2 border-black"
          onClick={() => {
            datVe.mutate({"maLichChieu":maLichChieu,"danhSachVe":danhSachGheDat})
          }}
        >
          Đặt vé
        </button>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useDataDetail } from "../../Hooks/api";
import { Phim } from "../../@types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { objectToQueryString, sleep } from "../../utils";
import { quanLyPhimServices } from "../../services";
import { object } from "zod";
import { toast } from "react-toastify";

export const AdminFilmTemplate = () => {


  const phim: Phim[] = Array.from({ length: 15 }, (_, index) => {
    const { data } = useDataDetail.getDanhSach(
      "maNhom",
      index + 1 < 10 ? `GP0${index + 1}` : `GP${index + 1}`
    );
    return data as Phim;
  }).flat();

  const queryClient = useQueryClient();

  return (
    <div className=" overflow-auto h-[750px] ">
      <table className="table-fixed w-full ">
        <thead>
          <tr>
            <th className="w-[10%]">Mã phim</th>
            <th className="w-[20%]">Hình ảnh</th>
            <th className="w-[20%]">Tên phim</th>
            <th>Mô tả</th>
            <th>Tương tác</th>
          </tr>
        </thead>
        <tbody className="text-start ">
          {phim?.map((item, index) => (
            <tr key={index}>
              <td>{item?.maPhim}</td>
              <td>
                <img src={item?.hinhAnh} alt="" className="px-10 py-2" />
              </td>
              <td>{item?.tenPhim}</td>
              <td className="px-2">{item?.moTa}</td>
              <td className="px-2 text-center">
                <button
                  className="text-red-700 font-[600] me-5"
                  onClick={async () => {
                    try {
                      await quanLyPhimServices.deleteFilm(
                        objectToQueryString({ maPhim: item.maPhim })
                      );
                      queryClient.invalidateQueries(objectToQueryString({'maNhom':item.maNhom}))
                      toast.success("Xóa phim thành công");
                    } catch (error) {
                      toast.error("Không thành công");
                    }
                  }}
                >
                  Xóa
                </button>
                <button className="text-yellow-400 font-[600]">Sửa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

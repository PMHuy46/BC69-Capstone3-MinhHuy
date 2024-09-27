import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserList } from "../../Hooks/api";
import { objectToQueryString } from "../../utils";
import { useQueryClient } from "@tanstack/react-query";
import { Input, Select } from "antd";
import { quanLyNguoiDungServices } from "../../services";
import { toast } from "react-toastify";
import { PATH } from "../../constants";
import { useQuanLyNguoiDungSelector } from "../../store/quanLyNguoiDung";

export const AdminUserTemplate = () => {
  const [maNhom, setMaNhom] = useState("GP01");
  const [tuKhoa, setTuKhoa] = useState<string | undefined>(undefined);
  const { user } = useQuanLyNguoiDungSelector();
  const navigate = useNavigate();

  const { data: listUser } = useGetUserList(
    objectToQueryString({ maNhom: maNhom, tuKhoa: tuKhoa })
  );

  const queryClient = useQueryClient();

  return (
    <div>
      <p className="text-[30px] font-[700]">Quản lý người dùng</p>
      <div className="flex gap-3">
        <div className="w-[30%]">
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
        <div className="w-full">
          <p className="text-[16px] mb-2 font-[600]">Tìm kiếm</p>
          <Input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTuKhoa(e.target.value ? e.target.value : undefined);
            }}
          />
        </div>
      </div>
      <hr className="mt-3" />
      <div className="grid grid-cols-[5%,15%,15%,10%,15%,15%,15%,10%] gap-1 text-center font-[600] text-[16px] my-3">
        <p className=" text-center">Stt</p>
        <p>Họ tên</p>
        <p>Email</p>
        <p>SĐT</p>
        <p>Loại người dùng</p>
        <p>Tài khoản</p>
        <p>Mật khẩu</p>
        <p className="w-[6%]"></p>
      </div>
      {listUser?.map((item, index) => (
        <div className="grid grid-cols-[5%,15%,15%,10%,15%,15%,15%,10%] gap-1 ">
          <p className=" text-center">{index + 1}</p>
          <p className="truncate ">{item?.hoTen}</p>
          <p className="truncate  text-start">{item?.email}</p>
          <p className="truncate  text-center">{item?.soDT}</p>
          <p className="truncate  text-center">{item?.maLoaiNguoiDung}</p>
          <p className="truncate ">{item?.taiKhoan}</p>
          <p className="truncate ">{item?.matKhau}</p>

          <p className="flex flex-wrap">
            <button
              className="text-red-700 font-[600] me-5"
              onClick={async () => {
                if (user?.maLoaiNguoiDung === "QuanTri") {
                  try {
                    await quanLyNguoiDungServices.deleteUser(
                      objectToQueryString({ TaiKhoan: item.taiKhoan })
                    );
                    queryClient.invalidateQueries({
                      queryKey: ['yourQueryKey', { maNhom: maNhom }] 

                    });
                  } catch (error: any) {
                    toast.error(error?.response?.data.content);
                  }
                } else {
                  toast.error(
                    "Tài khoản không đủ quyền hạn. Hãy kiểm tra lại!!!"
                  );
                }
              }}
            >
              Xóa
            </button>
            <button
              className="text-yellow-400 font-[600]"
              onClick={() => {
                navigate(PATH.addUser, { state: { ...item, maNhom: maNhom } });
              }}
            >
              Sửa
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};

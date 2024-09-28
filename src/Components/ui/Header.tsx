import { Avatar, Button, Collapse, Modal, Popover } from "antd";
import { PATH } from "../../constants";
import { useAppDispatch } from "../../store";
import {
  quanLyNguoiDungActions,
  useQuanLyNguoiDungSelector,
} from "../../store/quanLyNguoiDung";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { quanLyNguoiDungServices } from "../../services";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { user } = useQuanLyNguoiDungSelector();
  const { data: info } = useQuery({
    queryKey: ["ThongTinTaiKhoan"],
    queryFn: () => {
      return quanLyNguoiDungServices.getInfo();
    },
    enabled: true,
  });
  const infoUser = info?.data.content;

  useEffect(()=>{},[navigate])

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 cursor-pointer">
        <a
          onClick={() => navigate("/")}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/images/lC22izJ.png" className="h-8 " alt="" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Movie Booking
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user ? (
            <div className="flex items-center gap-4">
              <p>Hi, {user?.hoTen}</p>
              <Popover
                content={
                  <div className="flex flex-col p-[12px]">
                    <div>
                      <p
                        className="cursor-pointer hover:text-red-700 text-[20px] mb-5"
                        onClick={()=>{setIsOpenModal(true)}}
                      >
                        Thông tin cá nhân
                      </p>
                    </div>
                    <div>
                      <Button
                        className="w-full"
                        onClick={() => {
                          dispatch(quanLyNguoiDungActions.logOut());
                        }}
                      >
                        Đăng xuất
                      </Button>
                    </div>
                  </div>
                }
              >
                <Avatar
                  size={"large"}
                  className="bg-[#87d068] text-center"
                  icon={<i className="fa-regular fa-user p-0"></i>}
                />
              </Popover>
            </div>
          ) : (
            <div>
              <Button
                onClick={() => {
                  navigate(PATH.login);
                }}
              >
                Đăng Nhập
              </Button>
              <Button
                onClick={() => {
                  navigate(PATH.register);
                }}
              >
                Đăng ký
              </Button>
            </div>
          )}

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                onClick={() => navigate("/")}
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={()=>{
                  navigate(PATH.admin)
                }}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Admin
              </a>
            </li>
           
          </ul>
        </div>
      </div>
      <Modal
        open={isOpenModal}
        onCancel={() => {
          setIsOpenModal(false);
        }}
        width={800}
      >
        <div className="grid grid-cols-2">
          <div className="text-start ml-[20px] ">
            <p className="text-[20px] font-[700]">Thông tin cá nhân</p>
            <div className="grid grid-cols-2 gap-2 text-[16px]">
              <p className="font-[700]">Tài Khoản:</p>
              <p>{infoUser?.taiKhoan}</p>
              <p className="font-[700]">Họ tên</p>
              <p>{infoUser?.hoTen}</p>
              <p className="font-[700]">Email:</p>
              <p>{infoUser?.email}</p>
              <p className="font-[700]">Số điện thoại</p>
              <p>{infoUser?.soDT}</p>
              <p className="font-[700]">Mã nhóm</p>
              <p>{infoUser?.maNhom}</p>
              <p className="font-[700]">Phân loại</p>
              <p>{infoUser?.loaiNguoiDung.tenLoai}</p>
            </div>
          </div>
          <div>
            <h2 className="text-[20px] font-[700]">Lịch sử hoạt động</h2>
            <div className="overflow-auto h-[200px]">
              <Collapse
                items={infoUser?.thongTinDatVe.map((item) => ({
                  key: item.maVe,
                  label: (
                    <div>
                      <p>Mã vé: {item.maVe}</p>
                    </div>
                  ),
                  children: (
                    <div>
                      <p>Thông tin chi tiết</p>
                      <p>Tên phim: {item.tenPhim}</p>
                      <p>Ngày đặt: {dayjs(item.ngayDat).format('DD-MM-YYYY HH:mm')}</p>
                      <p>Tổng: {item.giaVe}</p>
                      <p>
                        Danh sách ghế:{" "}
                        {item.danhSachGhe.map((ghe) => (
                          <span key={ghe.maGhe}>{ghe.tenGhe}, </span>
                        ))}
                      </p>
                    </div>
                  ),
                }))}
              />
            </div>
          </div>
        </div>
      </Modal>
    </nav>
  );
};

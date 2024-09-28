import { useParams } from "react-router-dom";
import { useDataDetail, useGetShowTimeById } from "../../Hooks/api";
import { Button, Collapse, Modal, Tabs } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { Phim } from "../../@types";
import { ModalDatVe } from "../ui";
import { quanLyNguoiDungActions } from "../../store/quanLyNguoiDung";
import { useAppDispatch } from "../../store";
import ReactPlayer from "react-player";

export const PhimDetailTemplate = () => {
  const { id = "" } = useParams();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { data } = useDataDetail.getDetailPhim("maPhim", id);
  let phimDetail = data as Phim;
  const { data: showTime } = useGetShowTimeById({ id });
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="grid grid-cols-[40%,60%] gap-10">
        <div>
          <ReactPlayer
            url={phimDetail?.trailer}
            controls={true}
            width="100%"
            light={phimDetail?.hinhAnh}
          />
        </div>
        <div className="">
          <p className="text-[30px] font-[700]">{phimDetail?.tenPhim}</p>
          <p>{phimDetail?.moTa}</p>
        </div>
      </div>
      <div >
        <Tabs
          items={showTime?.heThongRapChieu.map((item) => ({
            key: item.maHeThongRap,
            label: (
              <div className="uppercase font-[700]">{item.tenHeThongRap}</div>
            ),
            children: (
              <div>
                <Collapse
                  items={item?.cumRapChieu.map((cumRap) => ({
                    key: cumRap.maCumRap,
                    label: (
                      <div>
                        <p className="font-[600] text-[16px]">
                          {cumRap.tenCumRap}
                        </p>
                        <p className="text-[14px] italic">{cumRap.diaChi}</p>
                      </div>
                    ),
                    children: (
                      <div className="flex gap-10 flex-wrap">
                        {cumRap.lichChieuPhim.map((lichChieu) => (
                          <Button
                            key={lichChieu.maLichChieu}
                            type="primary"
                            onClick={() => {
                              setIsOpenModal(true);
                              dispatch(
                                quanLyNguoiDungActions.setMaLichChieu(
                                  lichChieu.maLichChieu
                                )
                              );
                            }}
                          >
                            {dayjs(lichChieu.ngayChieuGioChieu).format(
                              "DD-MM-YY , HH:mm"
                            )}
                            -
                            {dayjs(lichChieu.ngayChieuGioChieu)
                              .add(lichChieu.thoiLuong, "minute")
                              .format("HH:mm")}
                          </Button>
                        ))}
                      </div>
                    ),
                  }))}
                />
              </div>
            ),
          }))}
        />
      </div>
      <Modal
        open={isOpenModal}
        onCancel={() => {
          setIsOpenModal(false);
          dispatch(quanLyNguoiDungActions.setMaLichChieu(""));
        }}
        width={1000}
      >
        <div>
          <div>
            <p className="text-[30px] font-bold text-center mb-[30px] text-yellow-500">
              Đặt vé
            </p>
            <div>
              <ModalDatVe />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

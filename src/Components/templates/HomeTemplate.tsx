import { generatePath, useNavigate } from "react-router-dom";
import { Button, Card, Select, Skeleton, Tabs } from "antd";
import { localStorageKey, PATH } from "../../constants";
import { useState } from "react";
import { Phim } from "../../@types";
import { useDataDetail } from "../../Hooks/api";


export const HomeTemplate = () => {
  const navigate = useNavigate();
  const idList = JSON.parse(`${localStorage.getItem(localStorageKey.IDLIST)}`);
  const [maNhom, setMaNhom] = useState(idList || "GP01");
  localStorage.setItem(localStorageKey.IDLIST, JSON.stringify(maNhom));



  const { data, isFetching } = useDataDetail.getDanhSach("maNhom", maNhom);
  const phimData = data as Phim[]; // nó cứ báo là không nhận được kiểu dữ liệu của data là sao nhỉ giải giúp em với
  if (isFetching) {
    // sao chỗ này trên máy em nó trắng trơn vậy anh ơi không có hiện gì hết???
    return (
      <div>
        <Skeleton.Input className="h-[350px] !w-full bg-white text-white " />
        <Skeleton.Input className="mt-2 !w-full" />
        <Skeleton.Input className="!w-[80px] mt-2" />
      </div>
    );
  }

  const renderPhim = (data: Phim[] = []) => {
    return (
      <div
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10"
        style={{ height: 1000, overflow: "auto" }}
      >
        {data.map((phim) => {
          return (
            <div key={phim.maPhim} className="flex justify-center h-[350px]">
              <Card
                hoverable
                style={{ width: 200 }}
                cover={
                  <img alt="..." src={phim.hinhAnh} className="!h-[250px]" />
                }
              >
                <Card.Meta title={phim.tenPhim} />
                <Button
                  className="mt-3"
                  onClick={() => {
                    const path = generatePath(PATH.phimDetail, {
                      id: phim.maPhim,
                    });
                    navigate(path);
                  }}
                >
                  Đặt vé
                </Button>
              </Card>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div className="w-full flex-col justify-end text-center h-[100px] flex-wrap">
        <p className="font-[700] text-[30px]">Chọn danh sách phim</p>
        <Select
          defaultValue={maNhom}
          style={{
            width: "50%",
          }}
          onChange={(value) => {
            setMaNhom(value);
          }}
          options={Array.from({ length: 15 }, (_, i) => ({
            value: i + 1 < 10 ? `GP0${i + 1}` : `GP${i + 1}`,
            label: i + 1 < 10 ? `GP0${i + 1}` : `GP${i + 1}`,
          }))}
        />
      </div>
      <div>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: <p className="text-[16px] font-medium">Danh Sách Phim</p>,
              key: "1",
              children: renderPhim(phimData),
            },
            {
              label: <p className="text-[16px] font-medium">Phim đang chiếu</p>,
              key: "2",
              children: renderPhim(phimData?.filter((item) => item.dangChieu)),
            },
            {
              label: <p className="text-[16px] font-medium">Phim Sắp Chiếu</p>,
              key: "3",
              children: renderPhim(phimData?.filter((item) => item.sapChieu)),
            },
          ]}
        />
      </div>
    </div>
  );
};

import { useQuery } from "@tanstack/react-query";
import { quanLyPhimServices } from "../../services";
import { Carousel, Skeleton } from "antd";

export const Banner = () => {
  const { data: bannerList, isFetching } = useQuery({
    queryKey: ["DanhSachBanner"],
    queryFn: () => {
      return quanLyPhimServices.getBanner();
    },
    enabled: true,
  });
  if (isFetching) {
    return (
      <div>
        <Skeleton.Input className="h-[40px] !w-full" /> 
        <Skeleton.Input className="h-[40px] !w-full" />
        <Skeleton.Input className="h-[1500px] !w-full" />
      </div>
    );
  }
  return (
    <div>
      <div className="2xl:w-[1500px] mx-auto lg:w-[90%] ">
        <Carousel arrows={true} autoplay={true}>
          {/* mũi tên 2 bên không chỉnh kích thước được á anh chỉ chỗ này giùm em với */}
          {bannerList?.data.content.map((item) => {
            return (
              <div className="h-[350px] w-full" key={item.maBanner}>
                <img
                  src={item.hinhAnh}
                  alt=""
                  className="h-full lg:w-full mx-auto"
                />
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

import { useQuery } from "@tanstack/react-query";
import { objectToQueryString, sleep } from "../../utils";
import { quanLyPhimServices } from "../../services/quanLyPhim";

type QuanLyPhimServiceKeys = keyof typeof quanLyPhimServices;
const func = (valueType: string, value: string, funcName: QuanLyPhimServiceKeys) => {
    const query = useQuery({
        queryKey: [valueType, value],
        queryFn: async () => {
            await sleep(1000);
            return quanLyPhimServices[funcName](
                objectToQueryString({ [valueType]: value })
            );
        },
    });
    return {
        ...query,
        data: query?.data?.data.content ,
    }
}

export const useDataDetail = {
    getDanhSach: (vt: string, v: string) => func(vt, v, 'getDanhSachPhim'),
    getDetailPhim: (vt: string, v: string) => func(vt, v, "getDetailPhim"),
    deleteFilm: (vt: string, v: string) => func(vt, v, "deleteFilm"),
};

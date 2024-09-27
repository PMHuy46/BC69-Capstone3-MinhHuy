import { DanhSachPhongVe, DanhSachVeDat, TaoLichChieu } from "../@types";
import { apiInstance, apiInstanceBearer } from "../constants";

const api = apiInstance.create({
    baseURL: 'https://movienew.cybersoft.edu.vn/api/QuanLyDatVe'
})
const apiBearer = apiInstanceBearer.create({
    baseURL: 'https://movienew.cybersoft.edu.vn/api/QuanLyDatVe'
})

export const quanLyDatVe = {
    getDanhSachPhongVe: (query = '') => api.get<HttpResponse<DanhSachPhongVe>>(`/LayDanhSachPhongVe${query}`),
    postDanhSachVeDat: (payload:DanhSachVeDat) => apiBearer.post<HttpResponse<DanhSachVeDat>>("/DatVe",payload),
    createLichChieu:(payload:TaoLichChieu) =>apiBearer.post<HttpResponse<any>>('/TaoLichChieu',payload)

}
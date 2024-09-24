import { DanhSachPhongVe, DanhSachVeDat } from "../@types";
import { apiInstance, apiInstanceBearer } from "../constants";

const api = apiInstance.create({
    baseURL: 'https://movienew.cybersoft.edu.vn/api/QuanLyDatVe'
})
const apiDatVe = apiInstanceBearer.create({
    baseURL: 'https://movienew.cybersoft.edu.vn/api/QuanLyDatVe'
})

export const quanLyDatVe = {
    getDanhSachPhongVe: (query = '') => api.get<HttpResponse<DanhSachPhongVe>>(`/LayDanhSachPhongVe${query}`),
    postDanhSachVeDat: (payload:DanhSachVeDat) => apiDatVe.post<HttpResponse<DanhSachVeDat>>("/DatVe",payload),

}
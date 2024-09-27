import { ListCumRap, ListHeThongRap,  ThongTinLichChieu } from "../@types";
import { apiInstance } from "../constants";

const api = apiInstance.create({
    baseURL: 'https://movienew.cybersoft.edu.vn/api/QuanLyRap'
})

export const quanLyRap = {
    getShowTimeById: (query = '') => api.get<HttpResponse<ThongTinLichChieu>>(`/LayThongTinLichChieuPhim${query}`),
    getHeThongRap: () => api.get<HttpResponse<ListHeThongRap[]>>('/LayThongTinHeThongRap'),
    getCumRap: (query = '') => api.get<HttpResponse<ListCumRap[]>>(`/LayThongTinCumRapTheoHeThong${query}`),
}
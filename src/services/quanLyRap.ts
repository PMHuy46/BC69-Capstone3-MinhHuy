import { ListCumRap, ListHeThongRap,  ThongTinLichChieu } from "../@types";
import { apiInstance, apiInstanceBearer } from "../constants";

const api = apiInstance.create({
    baseURL: 'https://movienew.cybersoft.edu.vn/api/QuanLyRap'
})
const apiBearer = apiInstanceBearer.create({
    baseURL: 'https://movienew.cybersoft.edu.vn/api/QuanLyRap'
})


export const quanLyRap = {
    getShowTimeById: (query = '') => api.get<HttpResponse<ThongTinLichChieu>>(`/LayThongTinLichChieuPhim${query}`),
    getHeThongRap: () => api.get<HttpResponse<ListHeThongRap[]>>('/LayThongTinHeThongRap'),
    getCumRap: (query = '') => api.get<HttpResponse<ListCumRap[]>>(`/LayThongTinCumRapTheoHeThong${query}`),
}
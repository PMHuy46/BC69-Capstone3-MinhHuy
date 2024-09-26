import { Banner, Phim } from "../@types";
import { apiInstance, apiInstanceBearer } from "../constants";
import { AddFilmSchemaType } from "../schemas";

const api = apiInstance.create({
    baseURL: 'https://movienew.cybersoft.edu.vn/api/QuanLyPhim'
})

const apiBearer = apiInstanceBearer.create({
    baseURL: 'https://movienew.cybersoft.edu.vn/api/QuanLyPhim'
})

export const quanLyPhimServices = {
    getDanhSachPhim: (query = '') => api.get<HttpResponse<Phim[]>>(`/LayDanhSachPhim${query}`),
    getDetailPhim: (query = '') => api.get<HttpResponse<Phim>>(`/LayThongTinPhim${query}`),
    getBanner: (query = '') => api.get<HttpResponse<Banner[]>>(`/LayDanhSachBanner${query}`),
    deleteFilm: (query = '') => apiBearer.delete<HttpResponse<string>>(`/XoaPhim${query}`),
    addFilm: (payload:any) => api.post<HttpResponse<string>>('/ThemPhimUploadHinh', payload),
    updateFilm: (payload:any) => apiBearer.post<HttpResponse<string>>('/CapNhatPhimUpload', payload),
   
}

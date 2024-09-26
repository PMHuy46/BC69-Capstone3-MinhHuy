import { ListUser, LoginAPIResponse, RegisterAPIResponse, ThongTinTaiKhoan } from "../@types";
import { apiInstance, apiInstanceBearer } from "../constants";
import { AddUserSchemaType } from "../schemas";
import { LoginSchemaType } from "../schemas/LoginSchema";
import { RegisterSchemaType } from "../schemas/RegisterSchema";

const api = apiInstance.create({
    baseURL: 'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung'
})

const apiBearer= apiInstanceBearer.create({
    baseURL: 'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung'
})

export const quanLyNguoiDungServices = {
    dangKy: (payload: RegisterSchemaType) => api.post<HttpResponse<RegisterAPIResponse>>("/DangKy", payload),
    dangNhap: (payload: LoginSchemaType) => api.post<HttpResponse<LoginAPIResponse>>("/DangNhap", payload),
    getInfo:()=>apiBearer.post<HttpResponse<ThongTinTaiKhoan>>("/ThongTinTaiKhoan"),
    getListUser:(query:'')=>api.get<HttpResponse<ListUser[]>>(`/TimKiemNguoiDung${query}`),
    deleteUser: (query = '') => apiBearer.delete<HttpResponse<any>>(`/XoaNguoiDung${query}`),
    AddUserAdmin: (payload: AddUserSchemaType) => apiBearer.post<HttpResponse<any>>("/ThemNguoiDung", payload),
    UpdateUserAdmin: (payload: AddUserSchemaType) => apiBearer.post<HttpResponse<any>>("/CapNhatThongTinNguoiDung", payload),
}
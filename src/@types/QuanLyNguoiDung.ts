export type LoginAPIResponse = {
    taiKhoan: string;
    hoTen: string;
    email: string;
    soDT: string;
    maNhom: string;
    maLoaiNguoiDung: string;
    accessToken: string;
}

export type RegisterAPIResponse = {
    taiKhoan: string
    matKhau: string
    email: string
    soDt: string
    maNhom: string
    hoTen: string
}

export interface ThongTinTaiKhoan {
    taiKhoan: string
    matKhau: string
    hoTen: string
    email: string
    soDT: string
    maNhom: string
    maLoaiNguoiDung: string
    loaiNguoiDung: LoaiNguoiDung
    thongTinDatVe: ThongTinDatVe[]
  }
  
  export interface LoaiNguoiDung {
    maLoaiNguoiDung: string
    tenLoai: string
  }
  
  export interface ThongTinDatVe {
    danhSachGhe: DanhSachGhe[]
    maVe: number
    ngayDat: string
    tenPhim: string
    hinhAnh: string
    giaVe: number
    thoiLuongPhim: number
  }
  
  export interface DanhSachGhe {
    maHeThongRap: string
    tenHeThongRap: string
    maCumRap: string
    tenCumRap: string
    maRap: number
    tenRap: string
    maGhe: number
    tenGhe: string
    giaVe:number
  }
  
  export interface ListUser {
    taiKhoan: string
    hoTen: string
    email: string
    soDT: string
    matKhau: string
    maLoaiNguoiDung: string
  }
  
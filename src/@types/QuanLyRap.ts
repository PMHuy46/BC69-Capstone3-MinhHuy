export interface ThongTinLichChieu {
    heThongRapChieu: HeThongRapChieu[]
    maPhim: number
    tenPhim: string
    biDanh: string
    trailer: string
    hinhAnh: string
    moTa: string
    maNhom: string
    hot: boolean
    dangChieu: boolean
    sapChieu: boolean
    ngayKhoiChieu: string
    danhGia: number
  }
  
  export interface HeThongRapChieu {
    cumRapChieu: CumRapChieu[]
    maHeThongRap: string
    tenHeThongRap: string
    logo: string
  }
  
  export interface CumRapChieu {
    lichChieuPhim: LichChieuPhim[]
    maCumRap: string
    tenCumRap: string
    hinhAnh: string
    diaChi: string
  }
  
  export interface LichChieuPhim {
    maLichChieu: string
    maRap: string
    tenRap: string
    ngayChieuGioChieu: string
    giaVe: number
    thoiLuong: number
  }
  
  export interface ListHeThongRap {
    maHeThongRap: string
    tenHeThongRap: string
    biDanh: string
    logo: string
  }
  
  export interface ListCumRap {
    maCumRap: string
    tenCumRap: string
    diaChi: string
    danhSachRap: DanhSachRap[]
  }
  
  export interface DanhSachRap {
    maRap: number
    tenRap: string
  }

  export interface TaoLichChieu {
    maPhim: number
    ngayChieuGioChieu: string
    maRap: string
    giaVe: string
 }
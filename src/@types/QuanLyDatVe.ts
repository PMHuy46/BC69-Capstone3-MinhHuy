export interface DanhSachPhongVe {
  thongTinPhim: ThongTinPhim
  danhSachGhe: DanhSachGhe[]
}

export interface ThongTinPhim {
  maLichChieu: number
  tenCumRap: string
  tenRap: string
  diaChi: string
  tenPhim: string
  hinhAnh: string
  ngayChieu: string
  gioChieu: string
}

export enum LoaiGhe {
  THUONG= 'Thuong',
  VIP= 'Vip'
}

export interface DanhSachGhe {
  maGhe: number
  tenGhe: string
  maRap: number
  loaiGhe: LoaiGhe
  stt: string
  giaVe: number
  daDat: boolean
  taiKhoanNguoiDat: any
}


// danh sách vé đặt
export interface DanhSachVeDat {
  maLichChieu: string
  danhSachVe: DanhSachVe[]
}

export interface DanhSachVe {
  maGhe: string
  giaVe: string
}
